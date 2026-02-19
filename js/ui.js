/**
 * SIG Pemetaan Kampung Wisata Purbayan
 * UI Controller - Sidebar, Filters, Search, Detail Panel
 */

let activeFilter = 'all';
let searchQuery = '';

// Initialize UI — wait for Firebase data
document.addEventListener('DOMContentLoaded', () => {
    onDataReady(() => {
        renderFilterButtons();
        renderLocationList();
        updateStats();
        setupSearch();
        setupSidebarToggle();
        setupLegend();

        // Auto-collapse sidebar on mobile
        if (window.innerWidth <= 768) {
            document.getElementById('sidebar').classList.add('collapsed');
        }
    });
});

// === STATISTICS ===
function updateStats() {
    const statEl = document.getElementById('totalLocations');
    if (statEl) statEl.textContent = LOCATIONS.length;
}

// === FILTER BUTTONS ===
function renderFilterButtons() {
    const container = document.getElementById('filterButtons');
    if (!container) return;

    // "All" button
    let html = `
    <button class="filter-btn filter-btn-all active" data-filter="all" onclick="setFilter('all')">
      <span class="emoji">📍</span>
      <span>Semua</span>
    </button>
  `;

    // Category buttons
    Object.values(CATEGORIES).forEach(cat => {
        html += `
      <button class="filter-btn" 
        data-filter="${cat.id}" 
        onclick="setFilter('${cat.id}')"
        style="--color: ${cat.color}; --bg: ${cat.color}12;">
        <span class="emoji">${cat.icon}</span>
        <span>${cat.name.split(' ')[0]}</span>
      </button>
    `;
    });

    container.innerHTML = html;
}

function setFilter(filter) {
    activeFilter = filter;

    // Update button states
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.filter === filter);
    });

    // Filter markers on map
    filterMarkers(filter);

    // Re-render location list
    renderLocationList();

    // Close any open popup and detail panel
    if (typeof map !== 'undefined' && map) map.closePopup();
    closeDetailPanel();
}

// === SEARCH ===
function setupSearch() {
    const input = document.getElementById('searchInput');
    const clearBtn = document.getElementById('clearSearch');

    if (!input) return;

    input.addEventListener('input', (e) => {
        searchQuery = e.target.value.trim().toLowerCase();
        clearBtn.classList.toggle('visible', searchQuery.length > 0);
        renderLocationList();
        filterMapBySearch();
    });

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            clearSearch();
        }
    });

    if (clearBtn) {
        clearBtn.addEventListener('click', clearSearch);
    }
}

function clearSearch() {
    const input = document.getElementById('searchInput');
    const clearBtn = document.getElementById('clearSearch');
    if (input) input.value = '';
    if (clearBtn) clearBtn.classList.remove('visible');
    searchQuery = '';
    renderLocationList();
    filterMarkers(activeFilter);
}

function filterMapBySearch() {
    if (!searchQuery) {
        filterMarkers(activeFilter);
        return;
    }

    markers.forEach(marker => {
        const loc = marker.locationData;
        const matchesSearch =
            loc.name.toLowerCase().includes(searchQuery) ||
            loc.description.toLowerCase().includes(searchQuery) ||
            loc.tags.some(t => t.toLowerCase().includes(searchQuery));
        const matchesFilter = activeFilter === 'all' || loc.category === activeFilter;

        if (matchesSearch && matchesFilter) {
            if (!markersLayer.hasLayer(marker)) {
                markersLayer.addLayer(marker);
            }
        } else {
            markersLayer.removeLayer(marker);
        }
    });
}

// === LOCATION LIST ===
function renderLocationList() {
    const container = document.getElementById('locationList');
    if (!container) return;

    let filteredLocations = LOCATIONS;

    // Apply category filter
    if (activeFilter !== 'all') {
        filteredLocations = filteredLocations.filter(l => l.category === activeFilter);
    }

    // Apply search
    if (searchQuery) {
        filteredLocations = filteredLocations.filter(l =>
            l.name.toLowerCase().includes(searchQuery) ||
            l.description.toLowerCase().includes(searchQuery) ||
            l.tags.some(t => t.toLowerCase().includes(searchQuery))
        );
    }

    // Sort by admin-defined order
    filteredLocations.sort((a, b) => (a.order || 0) - (b.order || 0));

    // Update count
    const countEl = document.getElementById('locationCount');
    if (countEl) {
        countEl.textContent = `${filteredLocations.length} lokasi ditemukan`;
    }

    // No results
    if (filteredLocations.length === 0) {
        container.innerHTML = `
      <div class="no-results">
        <div class="no-results-icon">🔍</div>
        <h3>Tidak ada lokasi ditemukan</h3>
        <p>Coba ubah filter atau kata kunci pencarian</p>
      </div>
    `;
        return;
    }

    // Render cards
    let html = '';
    filteredLocations.forEach((loc, index) => {
        const cat = CATEGORIES[loc.category];
        html += `
      <div class="location-card animate-fade-in" 
        id="card-${loc.id}"
        onclick="focusLocation(${loc.id})"
        style="animation-delay: ${index * 0.05}s">
        <div class="location-card-icon" style="color: ${cat.color};">
          ${cat.icon}
        </div>
        <div class="location-card-content">
          <div class="location-card-name">${loc.name}</div>
          <div class="location-card-category" style="color: ${cat.color};">${cat.name}</div>
          <div class="location-card-desc">${loc.description}</div>
        </div>
      </div>
    `;
    });

    container.innerHTML = html;
}

// Set active card
function setActiveCard(locationId) {
    clearActiveCard();
    const card = document.getElementById(`card-${locationId}`);
    if (card) {
        card.classList.add('active');
        // Scroll card into view
        card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

function clearActiveCard() {
    document.querySelectorAll('.location-card.active').forEach(c => c.classList.remove('active'));
}

// === DETAIL PANEL ===
function openDetailPanel(location) {
    const panel = document.getElementById('detailPanel');
    if (!panel) return;

    const cat = CATEGORIES[location.category];

    // Header background
    const headerBg = panel.querySelector('.detail-panel-header-bg');
    if (location.image) {
        headerBg.style.backgroundImage = `url(${location.image})`;
    } else {
        headerBg.style.backgroundImage = 'none';
    }

    // Category badge
    const badge = panel.querySelector('.detail-category-badge');
    badge.innerHTML = `<span>${cat.icon}</span> ${cat.name}`;
    badge.style.background = `${cat.color}44`;

    // Title
    panel.querySelector('.detail-panel-name').textContent = location.name;

    // Description
    panel.querySelector('.detail-description').textContent = location.description;

    // Info grid
    const infoGrid = panel.querySelector('.detail-info-grid');
    infoGrid.innerHTML = `
    <div class="detail-info-item">
      <div class="detail-info-icon">📍</div>
      <div class="detail-info-content">
        <div class="detail-info-label">Alamat</div>
        <div class="detail-info-value">${location.address}</div>
      </div>
    </div>
    <div class="detail-info-item">
      <div class="detail-info-icon">🕐</div>
      <div class="detail-info-content">
        <div class="detail-info-label">Jam Operasional</div>
        <div class="detail-info-value">${location.openHours}</div>
      </div>
    </div>
    <div class="detail-info-item">
      <div class="detail-info-icon">📞</div>
      <div class="detail-info-content">
        <div class="detail-info-label">Telepon</div>
        <div class="detail-info-value">${location.phone}</div>
      </div>
    </div>
    <div class="detail-info-item">
      <div class="detail-info-icon">🏷️</div>
      <div class="detail-info-content">
        <div class="detail-info-label">Kategori</div>
        <div class="detail-info-value">${cat.icon} ${cat.name}</div>
      </div>
    </div>
  `;

    // Tags
    const tagsContainer = panel.querySelector('.detail-tags');
    tagsContainer.innerHTML = location.tags.map(t =>
        `<span class="detail-tag">#${t}</span>`
    ).join('');

    // Directions button
    const directionsBtn = panel.querySelector('.btn-directions');
    directionsBtn.href = `https://www.google.com/maps/dir/?api=1&destination=${location.lat},${location.lng}`;

    // Open panel
    panel.classList.add('open');

    // Set active card
    setActiveCard(location.id);
}

function closeDetailPanel() {
    const panel = document.getElementById('detailPanel');
    if (panel) panel.classList.remove('open');
}

// === SIDEBAR TOGGLE ===
function setupSidebarToggle() {
    const toggleBtn = document.getElementById('toggleSidebar');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            const sidebar = document.getElementById('sidebar');
            sidebar.classList.toggle('collapsed');

            // Toggle arrow icon
            const isCollapsed = sidebar.classList.contains('collapsed');
            toggleBtn.textContent = isCollapsed ? '▶' : '◀';

            // Trigger map resize after transition
            setTimeout(() => {
                if (typeof map !== 'undefined' && map) {
                    map.invalidateSize();
                }
            }, 350); // wait for 0.3s transition
        });
    }
}

// === LEGEND ===
function setupLegend() {
    const legendHeader = document.querySelector('.legend-header');
    if (legendHeader) {
        legendHeader.addEventListener('click', () => {
            const legend = document.querySelector('.map-legend');
            if (legend) legend.classList.toggle('collapsed');
        });
    }

    // Dynamically render legend items from CATEGORIES
    const legendBody = document.getElementById('legendBody');
    if (legendBody) {
        let html = '';
        Object.values(CATEGORIES).forEach(cat => {
            html += `
            <div class="legend-item">
              <span class="legend-dot" style="background: ${cat.color};"></span>
              <span>${cat.icon} ${cat.name}</span>
            </div>`;
        });
        legendBody.innerHTML = html;
    }
}

// === SHARE ===
function shareLocation() {
    const url = window.location.href;
    if (navigator.share) {
        navigator.share({
            title: 'Kampung Wisata Purbayan - Kotagede, Yogyakarta',
            text: 'Jelajahi lokasi wisata menarik di Kampung Wisata Purbayan, Kotagede!',
            url: url
        });
    } else if (navigator.clipboard) {
        navigator.clipboard.writeText(url).then(() => {
            alert('Link berhasil disalin!');
        });
    }
}
