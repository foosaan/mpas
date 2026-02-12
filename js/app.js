/**
 * SIG Pemetaan Kampung Wisata Purbayan
 * Main Application - Leaflet.js + OpenStreetMap Integration
 */

let map;
let markers = [];
let markersLayer;
let activeMarker = null;

// Category icons using Leaflet divIcon with colored markers
function createMarkerIcon(color, icon, isActive = false) {
    const size = isActive ? 48 : 38;
    const fontSize = isActive ? 18 : 15;
    return L.divIcon({
        className: 'custom-marker',
        html: `
      <div style="
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        border-radius: 50% 50% 50% 4px;
        transform: rotate(-45deg);
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 3px 12px rgba(0,0,0,0.35);
        border: 3px solid white;
        transition: all 0.2s ease;
        ${isActive ? 'filter: brightness(1.15); box-shadow: 0 4px 20px rgba(0,0,0,0.45);' : ''}
      ">
        <span style="
          transform: rotate(45deg);
          font-size: ${fontSize}px;
          line-height: 1;
        ">${icon}</span>
      </div>
    `,
        iconSize: [size, size],
        iconAnchor: [size / 2, size],
        popupAnchor: [0, -size + 8]
    });
}

// Initialize the map
function initMap() {
    // Create Leaflet map
    // 1. Define Base Layers
    const osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> | foosaan',
        maxZoom: 19
    });

    const googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
        maxZoom: 20,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    });

    // Google Maps without POI (Points of Interest) - Cleaner Look
    const googleClean = L.tileLayer('https://mt1.google.com/vt/lyrs=r&x={x}&y={y}&z={z}&apistyle=s.t%3Apoi%7Cp.v%3Aoff%2Cs.t%3Atransit%7Cp.v%3Aoff', {
        maxZoom: 20,
        attribution: '&copy; Google Maps (Clean)'
    });

    const googleHybrid = L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}', {
        maxZoom: 20,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
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

    // 2. Initialize Map with Default Layer
    map = L.map('map', {
        center: [PURBAYAN_CENTER.lat, PURBAYAN_CENTER.lng],
        zoom: DEFAULT_ZOOM,
        layers: [googleStreets], // Default: Google
        zoomControl: false,
        attributionControl: true,
        tap: false // Fix for iOS click issues
    });

    // 3. Add Layer Control
    const baseMaps = {
        "Google Maps (Default)": googleStreets,
        "Google Bersih (No POI)": googleClean,
        "Google Satelit": googleHybrid,
        "Peta Jalan (OSM)": osmLayer,
        "Satelit (Esri)": satelliteLayer,
        "Minimalis (Carto)": voyagerLayer
    };

    L.control.layers(baseMaps, null, { position: 'topright' }).addTo(map);

    // Add zoom control to the right
    L.control.zoom({ position: 'topright' }).addTo(map);

    // Create markers layer group
    markersLayer = L.layerGroup().addTo(map);

    // Add markers
    addMarkers();

    // Map click - close panels
    map.on('click', () => {
        closeDetailPanel();
        clearActiveCard();
        resetActiveMarker();
    });

    // Hide loading overlay
    setTimeout(() => {
        const loading = document.getElementById('loadingOverlay');
        if (loading) loading.classList.add('hidden');
    }, 800);
}

// Add markers to map
function addMarkers() {
    markers = [];
    markersLayer.clearLayers();

    LOCATIONS.forEach((location, index) => {
        const category = CATEGORIES[location.category];
        const icon = createMarkerIcon(category.markerColor, category.icon);

        const marker = L.marker([location.lat, location.lng], {
            icon: icon,
            title: location.name,
            riseOnHover: true
        });

        // Store additional data on marker
        marker.locationData = location;
        marker.categoryData = category;

        // Create popup content
        const popupContent = createPopupContent(location, category);
        marker.bindPopup(popupContent, {
            maxWidth: 300,
            className: 'custom-popup',
            closeButton: true,
            autoPan: true
        });

        // Marker click handler
        // Marker click handler
        let lastClickTime = 0;
        const onMarkerClick = (e) => {
            const now = Date.now();
            if (now - lastClickTime < 500) return; // Debounce to prevent double-fire
            lastClickTime = now;

            L.DomEvent.stopPropagation(e);
            marker.openPopup(); // Explicitly open popup
            setActiveMarker(marker);
            setActiveCard(location.id);
        };

        // Standard click
        marker.on('click', onMarkerClick);

        // Manual Tap Detection for iOS
        let touchStartTime;
        let touchStartPos;

        marker.on('touchstart', (e) => {
            touchStartTime = Date.now();
            touchStartPos = e.originalEvent.touches[0];
        });

        marker.on('touchend', (e) => {
            if (!touchStartTime || !touchStartPos) return;

            const touchEndTime = Date.now();
            const touchEndPos = e.originalEvent.changedTouches[0];

            const timeDiff = touchEndTime - touchStartTime;
            const distX = Math.abs(touchEndPos.screenX - touchStartPos.screenX);
            const distY = Math.abs(touchEndPos.screenY - touchStartPos.screenY);

            // If tap is short (<300ms) and movement is small (<10px) -> IT'S A TAP!
            if (timeDiff < 300 && distX < 10 && distY < 10) {
                onMarkerClick(e);
            }

            // Reset
            touchStartTime = null;
            touchStartPos = null;
        });

        // Marker hover (Desktop only)
        if (!L.Browser.mobile) {
            marker.on('mouseover', () => {
                if (marker !== activeMarker) {
                    marker.setIcon(createMarkerIcon(category.markerColor, category.icon, true));
                }
            });

            marker.on('mouseout', () => {
                if (marker !== activeMarker) {
                    marker.setIcon(createMarkerIcon(category.markerColor, category.icon, false));
                }
            });
        }

        // Staggered animation
        setTimeout(() => {
            markersLayer.addLayer(marker);
        }, index * 60);

        markers.push(marker);
    });
}

// Create popup content
function createPopupContent(location, category) {
    return `
    <div class="info-window">
      <div class="info-window-category" style="background-color: ${category.markerColor}">
        <span>${category.icon}</span>
        <span>${category.name}</span>
      </div>
      <h3>${location.name}</h3>
      <p>${location.description}</p>
      <button class="info-window-btn" onclick="openDetailFromInfo(${location.id})">
        📋 Lihat Detail Lengkap
      </button>
    </div>
  `;
}

// Set active marker
function setActiveMarker(marker) {
    resetActiveMarker();
    const category = marker.categoryData;
    marker.setIcon(createMarkerIcon(category.markerColor, category.icon, true));
    activeMarker = marker;
}

// Reset active marker
function resetActiveMarker() {
    if (activeMarker) {
        const cat = activeMarker.categoryData;
        activeMarker.setIcon(createMarkerIcon(cat.markerColor, cat.icon, false));
        activeMarker = null;
    }
}

// Open detail from popup button
function openDetailFromInfo(locationId) {
    const location = LOCATIONS.find(l => l.id === locationId);
    if (location) {
        map.closePopup();
        openDetailPanel(location);
    }
}

// Show/hide markers by category
function filterMarkers(categoryFilter) {
    markersLayer.clearLayers();

    markers.forEach(marker => {
        if (categoryFilter === 'all' || marker.locationData.category === categoryFilter) {
            markersLayer.addLayer(marker);
        }
    });
}

// Focus on a specific location
function focusLocation(locationId) {
    const marker = markers.find(m => m.locationData.id === locationId);
    if (marker) {
        // Show marker if hidden
        if (!markersLayer.hasLayer(marker)) {
            markersLayer.addLayer(marker);
        }

        // Zoom and pan
        map.setView(marker.getLatLng(), 18, { animate: true });

        // Open popup
        setTimeout(() => {
            marker.openPopup();
            setActiveMarker(marker);
        }, 300);

        // Close sidebar on mobile
        if (window.innerWidth <= 768) {
            document.getElementById('sidebar').classList.add('collapsed');
        }
    }
}

// Fit map to show all visible markers
function fitToMarkers() {
    const layers = [];
    markersLayer.eachLayer(layer => layers.push(layer));

    if (layers.length > 0) {
        const group = L.featureGroup(layers);
        map.fitBounds(group.getBounds().pad(0.1), { animate: true });
    }
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    initMap();

    // Safety fallback: Ensure loading overlay is hidden even if map init has issues
    setTimeout(() => {
        const loading = document.getElementById('loadingOverlay');
        if (loading) {
            loading.style.opacity = '0';
            setTimeout(() => {
                loading.style.display = 'none';
            }, 500);
        }
    }, 2000); // 2 second max loading time
});
