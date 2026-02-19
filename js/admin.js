/**
 * Admin Logic for SIG Kampung Wisata Purbayan
 * Handles CRUD operations, Map Picker, Search, Filter, and Notifications
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

    // Initial Render
    renderTable();
    populateCategories();

    // Event Listeners for Search & Filter
    document.getElementById('searchInput').addEventListener('input', filterData);
    document.getElementById('filterCategory').addEventListener('change', filterData);

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
        showToast('Info: Login Berhasil', 'success');
    } else {
        document.getElementById('errorMsg').style.display = 'block';
        document.getElementById('pinInput').value = '';
    }
}

function showAdminContent() {
    document.getElementById('loginOverlay').style.display = 'none';
    document.getElementById('adminContent').style.display = 'block';
}

// === TOAST NOTIFICATION SYSTEM ===
function showToast(message, type = 'success') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');

    // Toast Styling
    toast.style.background = type === 'success' ? '#059669' : '#dc2626';
    toast.style.color = 'white';
    toast.style.padding = '12px 20px';
    toast.style.borderRadius = '8px';
    toast.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
    toast.style.display = 'flex';
    toast.style.alignItems = 'center';
    toast.style.gap = '10px';
    toast.style.minWidth = '250px';
    toast.style.fontSize = '0.9rem';
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(-20px)';
    toast.style.transition = 'all 0.3s ease';

    // Icon based on type
    const icon = type === 'success' ? '✅' : '⚠️';
    toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;

    container.appendChild(toast);

    // Animate In
    setTimeout(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateY(0)';
    }, 10);

    // Remove after 3 seconds
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(-20px)';
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}

// === FILTER & SEARCH LOGIC ===
function filterData() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const categoryFilter = document.getElementById('filterCategory').value;

    const filtered = LOCATIONS.filter(loc => {
        const matchesSearch = loc.name.toLowerCase().includes(searchTerm) ||
            (loc.description && loc.description.toLowerCase().includes(searchTerm));
        const matchesCategory = categoryFilter === 'all' || loc.category === categoryFilter;

        return matchesSearch && matchesCategory;
    });

    renderTable(filtered);
}

// Toggle New Category Inputs
function toggleNewCategory() {
    const select = document.getElementById('category');
    const group = document.getElementById('newCategoryGroup');
    if (select.value === 'new') {
        group.style.display = 'block';
        document.getElementById('newCatName').required = true;
        document.getElementById('newCatColor').required = true;
    } else {
        group.style.display = 'none';
        document.getElementById('newCatName').required = false;
        document.getElementById('newCatColor').required = false;
    }
}

function renderTable(data = LOCATIONS) {
    const tbody = document.getElementById('locationTableBody');
    tbody.innerHTML = '';

    if (data.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" style="text-align:center; padding: 20px; color: #888;">Tidak ada data yang cocok.</td></tr>';
        return;
    }

    // Sort locations by order ascending (admin-defined order)
    const sortedLocations = [...data].sort((a, b) => (a.order || 0) - (b.order || 0));

    sortedLocations.forEach((loc, index) => {
        // Fallback if category was deleted or missing
        const catData = CATEGORIES[loc.category] || { name: loc.category, color: '#ccc' };

        const row = document.createElement('tr');
        row.dataset.id = loc.id;
        row.innerHTML = `
      <td style="text-align:center; min-width: 60px;">
        <span class="drag-handle" title="Seret untuk mengubah urutan">⠿ <span class="order-number">${index + 1}</span></span>
      </td>
      <td><strong>${loc.name}</strong></td>
      <td><span class="category-badge" style="background:${catData.color}; color:white; padding: 4px 10px; border-radius: 20px; font-size: 0.75em; font-weight: 500;">${catData.name}</span></td>
      <td>${loc.lat.toFixed(5)}, ${loc.lng.toFixed(5)}</td>
      <td>
        <button class="action-btn btn-edit" onclick="editLocation(${loc.id})">Edit</button>
        <button class="action-btn btn-delete" onclick="removeLocation(${loc.id})">Hapus</button>
      </td>
    `;
        tbody.appendChild(row);
    });

    // Initialize drag & drop
    initSortable();
}

function populateCategories() {
    const select = document.getElementById('category');
    const filterSelect = document.getElementById('filterCategory');

    // Clear existing (except first option for filter)
    select.innerHTML = '';
    filterSelect.innerHTML = '<option value="all">Semua Kategori</option>';

    for (const key in CATEGORIES) {
        // Populate Form Select
        const option = document.createElement('option');
        option.value = key;
        option.textContent = CATEGORIES[key].name;
        select.appendChild(option);

        // Populate Filter Select
        const filterOption = document.createElement('option');
        filterOption.value = key;
        filterOption.textContent = CATEGORIES[key].name;
        filterSelect.appendChild(filterOption);
    }

    // Add "New Category" option to Form Select
    const newOption = document.createElement('option');
    newOption.value = 'new';
    newOption.textContent = '+ Buat Kategori Baru...';
    newOption.style.fontWeight = 'bold';
    newOption.style.color = 'var(--primary)';
    select.appendChild(newOption);
}

function initMap() {
    if (map) return;

    // Define Base Layers
    const osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> | foosaan',
        maxZoom: 19
    });

    const satelliteLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri',
        maxZoom: 19
    });

    const voyagerLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; CARTO',
        subdomains: 'abcd',
        maxZoom: 19
    });

    // 2. Initialize map centered on Purbayan
    map = L.map('mapPicker', {
        center: [PURBAYAN_CENTER.lat, PURBAYAN_CENTER.lng],
        zoom: 16,
        layers: [osmLayer] // Default
    });

    // 3. Add Layer Control
    const baseMaps = {
        "Peta Jalan (OSM)": osmLayer,
        "Satelit (Esri)": satelliteLayer,
        "Minimalis (Carto)": voyagerLayer
    };

    L.control.layers(baseMaps, null, { position: 'topright' }).addTo(map);

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
    document.getElementById('newCategoryGroup').style.display = 'none';
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

    // Check if category exists, if not default to first
    if (CATEGORIES[loc.category]) {
        document.getElementById('category').value = loc.category;
    } else {
        // Handle cases where category id might be old
        document.getElementById('category').value = Object.keys(CATEGORIES)[0];
    }

    toggleNewCategory(); // Ensure new category inputs are hidden

    document.getElementById('lat').value = loc.lat;
    document.getElementById('lng').value = loc.lng;
    document.getElementById('description').value = loc.description || '';
    document.getElementById('address').value = loc.address || '';
    document.getElementById('openHours').value = loc.openHours || '';
    document.getElementById('image').value = loc.image || '';
    if (document.getElementById('phone')) {
        document.getElementById('phone').value = loc.phone || '-';
    }

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
        filterData(); // Re-render with current filters
        showToast('Lokasi berhasil dihapus', 'success');
    }
}

function handleFormSubmit(e) {
    e.preventDefault();

    let categoryId = document.getElementById('category').value;

    // Handle New Category Creation
    if (categoryId === 'new') {
        const name = document.getElementById('newCatName').value.trim();
        const color = document.getElementById('newCatColor').value;
        const icon = document.getElementById('newCatIcon').value.trim() || '📍';

        if (!name) {
            showToast('Nama Kategori tidak boleh kosong!', 'error');
            return;
        }

        // Generate simple ID
        const id = name.toLowerCase().replace(/[^a-z0-9]/g, '');

        if (CATEGORIES[id]) {
            showToast('ID Kategori sudah ada!', 'error');
            return;
        }

        // Add to data
        addCategory(id, name, color, icon);
        categoryId = id;

        // Refresh dropdowns
        populateCategories();
    }

    const formData = {
        id: currentId ? parseInt(currentId) : Date.now(),
        name: document.getElementById('name').value,
        category: categoryId,
        lat: parseFloat(document.getElementById('lat').value),
        lng: parseFloat(document.getElementById('lng').value),
        description: document.getElementById('description').value,
        address: document.getElementById('address').value,
        openHours: document.getElementById('openHours').value,
        phone: document.getElementById('phone') ? document.getElementById('phone').value : '-',
        image: document.getElementById('image').value,
        tags: [] // Simplified for now
    };

    if (currentId) {
        updateLocation(formData);
    } else {
        addLocation(formData);
    }

    closeModal();
    filterData(); // Re-render with current filters
    showToast('Data berhasil disimpan!', 'success');
}

// === DRAG & DROP REORDER ===
let sortableInstance = null;

function initSortable() {
    const tbody = document.getElementById('locationTableBody');
    if (!tbody || tbody.children.length === 0) return;

    // Destroy previous instance
    if (sortableInstance) {
        sortableInstance.destroy();
    }

    sortableInstance = new Sortable(tbody, {
        handle: '.drag-handle',
        animation: 200,
        ghostClass: 'sortable-ghost',
        chosenClass: 'sortable-chosen',
        onEnd: function () {
            // Read new order from DOM
            const rows = tbody.querySelectorAll('tr[data-id]');
            rows.forEach((row, index) => {
                const id = parseInt(row.dataset.id);
                const loc = LOCATIONS.find(l => l.id === id);
                if (loc) {
                    loc.order = index;
                }
                // Update the order number badge
                const badge = row.querySelector('.order-number');
                if (badge) badge.textContent = index + 1;
            });
            saveLocations(LOCATIONS);
            showToast('Urutan berhasil diperbarui!', 'success');
        }
    });
}
