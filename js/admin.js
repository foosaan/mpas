/**
 * Admin Logic for SIG Kampung Wisata Purbayan
 * Handles CRUD operations and Map Picker
 */

let map;
let marker;
let currentId = null;

// Simple PIN for demo purposes
const ADMIN_PIN = "1234";

document.addEventListener('DOMContentLoaded', () => {
    // Check if already authenticated
    if (sessionStorage.getItem('purbayan_admin_auth') === 'true') {
        showAdminContent();
    }

    // Handle PIN input enter key
    const pinInput = document.getElementById('pinInput');
    if (pinInput) {
        pinInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                checkPin();
            }
        });
    }

    renderTable();
    populateCategories();

    // Handle form submit
    document.getElementById('locationForm').addEventListener('submit', handleFormSubmit);

    // Close modal when clicking outside
    window.onclick = function (event) {
        const modal = document.getElementById('locationModal');
        if (event.target == modal) {
            closeModal();
        }
    }
});

function checkPin() {
    const input = document.getElementById('pinInput').value;
    if (input === ADMIN_PIN) {
        sessionStorage.setItem('purbayan_admin_auth', 'true');
        showAdminContent();
    } else {
        document.getElementById('errorMsg').style.display = 'block';
        document.getElementById('pinInput').value = '';
    }
}

function showAdminContent() {
    document.getElementById('loginOverlay').style.display = 'none';
    document.getElementById('adminContent').style.display = 'block';
}

function renderTable() {
    const tbody = document.getElementById('locationTableBody');
    tbody.innerHTML = '';

    // Sort locations by ID descending (newest first)
    const sortedLocations = [...LOCATIONS].sort((a, b) => b.id - a.id);

    sortedLocations.forEach(loc => {
        const categoryName = CATEGORIES[loc.category] ? CATEGORIES[loc.category].name : loc.category;

        const row = document.createElement('tr');
        row.innerHTML = `
      <td><strong>${loc.name}</strong></td>
      <td><span class="category-badge" style="background:${CATEGORIES[loc.category]?.color || '#ccc'}; color:white; padding: 2px 8px; border-radius: 4px; font-size: 0.8em;">${categoryName}</span></td>
      <td>${loc.lat.toFixed(5)}, ${loc.lng.toFixed(5)}</td>
      <td>
        <button class="action-btn btn-edit" onclick="editLocation(${loc.id})">Edit</button>
        <button class="action-btn btn-delete" onclick="removeLocation(${loc.id})">Hapus</button>
      </td>
    `;
        tbody.appendChild(row);
    });
}

function populateCategories() {
    const select = document.getElementById('category');
    select.innerHTML = '';

    for (const key in CATEGORIES) {
        const option = document.createElement('option');
        option.value = key;
        option.textContent = CATEGORIES[key].name;
        select.appendChild(option);
    }
}

function initMap() {
    if (map) return;

    // Initialize map centered on Purbayan
    map = L.map('mapPicker').setView([PURBAYAN_CENTER.lat, PURBAYAN_CENTER.lng], 16);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'
    }).addTo(map);

    // Click on map to set coordinates
    map.on('click', function (e) {
        setMarker(e.latlng.lat, e.latlng.lng);
    });
}

function setMarker(lat, lng) {
    if (marker) {
        marker.setLatLng([lat, lng]);
    } else {
        marker = L.marker([lat, lng]).addTo(map);
    }

    document.getElementById('lat').value = lat.toFixed(6);
    document.getElementById('lng').value = lng.toFixed(6);
}

// === MODAL FUNCTIONS ===

function openModal(isEdit = false) {
    document.getElementById('locationModal').classList.add('active');
    document.getElementById('modalTitle').textContent = isEdit ? 'Edit Lokasi' : 'Tambah Lokasi Baru';

    // Initialize map after modal is visible
    setTimeout(() => {
        initMap();
        map.invalidateSize();

        // If adding new, reset view to center if no marker
        if (!isEdit && !marker) {
            map.setView([PURBAYAN_CENTER.lat, PURBAYAN_CENTER.lng], 15);
        }
    }, 100);
}

function closeModal() {
    document.getElementById('locationModal').classList.remove('active');
    document.getElementById('locationForm').reset();
    currentId = null;
    if (marker) {
        map.removeLayer(marker);
        marker = null;
    }
}

// === CRUD ACTIONS ===

function editLocation(id) {
    const loc = LOCATIONS.find(l => l.id === id);
    if (!loc) return;

    currentId = id;

    // Fill form
    document.getElementById('locationId').value = loc.id;
    document.getElementById('name').value = loc.name;
    document.getElementById('category').value = loc.category;
    document.getElementById('lat').value = loc.lat;
    document.getElementById('lng').value = loc.lng;
    document.getElementById('description').value = loc.description || '';
    document.getElementById('address').value = loc.address || '';
    document.getElementById('openHours').value = loc.openHours || '';
    document.getElementById('image').value = loc.image || '';

    openModal(true);

    // Set marker on map
    setTimeout(() => {
        setMarker(loc.lat, loc.lng);
        map.setView([loc.lat, loc.lng], 17);
    }, 200);
}

function removeLocation(id) {
    if (confirm('Apakah Anda yakin ingin menghapus lokasi ini?')) {
        deleteLocation(id);
        renderTable();
    }
}

function handleFormSubmit(e) {
    e.preventDefault();

    const formData = {
        id: currentId ? parseInt(currentId) : Date.now(),
        name: document.getElementById('name').value,
        category: document.getElementById('category').value,
        lat: parseFloat(document.getElementById('lat').value),
        lng: parseFloat(document.getElementById('lng').value),
        description: document.getElementById('description').value,
        address: document.getElementById('address').value,
        openHours: document.getElementById('openHours').value,
        image: document.getElementById('image').value,
        tags: [] // Simplified for now
    };

    if (currentId) {
        updateLocation(formData);
    } else {
        addLocation(formData);
    }

    closeModal();
    renderTable();
    alert('Data berhasil disimpan!');
}
