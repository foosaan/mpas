/**
 * Data Lokasi Wisata Kampung Wisata Purbayan, Kotagede, Yogyakarta
 * Sistem Informasi Geografis (SIG) Pemetaan
 */

const PURBAYAN_CENTER = { lat: -7.8280, lng: 110.4000 };
const DEFAULT_ZOOM = 16;

// Default Categories (User requested 2 main categories)
const DEFAULT_CATEGORIES = {
  umkm: {
    id: 'umkm',
    name: 'UMKM Kampung Wisata Purbayan',
    icon: '🛍️',
    color: '#D2691E',
    markerColor: '#E07C24',
    description: 'Pusat oleh-oleh, kerajinan perak, batik, dan kuliner khas'
  },
  wisata: {
    id: 'wisata',
    name: 'Wisata Purbayan, Kotagede',
    icon: '🏰',
    color: '#8B4513',
    markerColor: '#8B4513',
    description: 'Situs sejarah, bangunan heritage, dan spot wisata menarik'
  }
};

const DEFAULT_LOCATIONS = [
  // === UMKM KAMPUNG WISATA PURBAYAN ===
  {
    id: 1,
    name: 'Roti Kembang Waru Pak Bas',
    category: 'umkm',
    lat: -7.8282,
    lng: 110.4025,
    description: 'Roti tradisional khas Kotagede berbentuk bunga waru. Jajanan wajib saat berkunjung ke Kotagede.',
    address: 'Bumen RT.23/06 KGIII/452, Purbayan, Kotagede',
    phone: '',
    openHours: '08.00 - 16.00 WIB',
    image: '',
    tags: ['kuliner', 'roti', 'kembang waru', 'umkm']
  },
  {
    id: 2,
    name: 'Lenis Camilan Jogja',
    category: 'umkm',
    lat: -7.8280,
    lng: 110.4000,
    description: 'Pusat oleh-oleh dan camilan khas Jogja.',
    address: 'Purbayan, Kotagede, Yogyakarta',
    phone: '',
    openHours: '08.00 - 20.00 WIB',
    image: '',
    tags: ['kuliner', 'camilan', 'oleh-oleh', 'umkm']
  },
  {
    id: 3,
    name: 'Umi Silver',
    category: 'umkm',
    lat: -7.8250,
    lng: 110.3980,
    description: 'Pengrajin perak berkualitas tinggi dengan desain elegan.',
    address: 'Kotagede, Yogyakarta',
    phone: '',
    openHours: '09.00 - 17.00 WIB',
    image: '',
    tags: ['kerajinan', 'perak', 'silver', 'umkm']
  },
  {
    id: 4,
    name: 'Blangkon Pakaian Adat Jawa',
    category: 'umkm',
    lat: -7.8175,
    lng: 110.3950,
    description: 'WGO Sinjang Jawi. Produsen blangkon dan busana adat Jawa.',
    address: 'Jl. Ki Pemanahan, Purbayan, Kotagede',
    phone: '',
    openHours: '09.00 - 17.00 WIB',
    image: '',
    tags: ['kerajinan', 'blangkon', 'busana', 'umkm']
  },
  {
    id: 5,
    name: 'Creative Batik',
    category: 'umkm',
    lat: -7.8180,
    lng: 110.3955,
    description: 'Batik Tulis Abstrak Kontemporer. Galeri batik unik.',
    address: 'Kotagede, Yogyakarta',
    phone: '',
    openHours: '09.00 - 17.00 WIB',
    image: '',
    tags: ['kerajinan', 'batik', 'umkm']
  },
  {
    id: 6,
    name: 'Pengrajin Perak Mas Ribut',
    category: 'umkm',
    lat: -7.8235,
    lng: 110.4005,
    description: 'Pengrajin perak lokal dengan berbagai karya tangan.',
    address: 'Jl. Kemasan, Kotagede, Yogyakarta',
    phone: '',
    openHours: '09.00 - 16.00 WIB',
    image: '',
    tags: ['kerajinan', 'perak', 'umkm']
  },

  // === WISATA PURBAYAN, KOTAGEDE ===
  {
    id: 7,
    name: 'Pasar Kotagede Yogyakarta',
    category: 'wisata',
    lat: -7.8280,
    lng: 110.4000,
    description: 'Pasar tradisional tertua di Yogyakarta. Ramai saat pasaran Legi.',
    address: 'Jl. Mondorakan, Purbayan, Kotagede',
    phone: '',
    openHours: '05.00 - 13.00 WIB',
    image: '',
    tags: ['pasar', 'wisata', 'sejarah']
  },
  {
    id: 8,
    name: 'Peken Klangenan Kota Gede',
    category: 'wisata',
    lat: -7.8285,
    lng: 110.4005,
    description: 'Pasar seni dan kuliner tempo dulu.',
    address: 'Kampung Pusaka Beteng Cepuri',
    phone: '',
    openHours: 'Sesuai jadwal event',
    image: '',
    tags: ['pasar', 'wisata', 'seni']
  },
  {
    id: 9,
    name: 'Between Two Gates (Lawang Pethuk)',
    category: 'wisata',
    lat: -7.8300,
    lng: 110.3990,
    description: 'Kawasan kampung tradisional diapit dua gerbang kuno.',
    address: 'Alun-alun, Purbayan, Kotagede',
    phone: '',
    openHours: '24 Jam',
    image: '',
    tags: ['heritage', 'wisata', 'kampung']
  },
  {
    id: 10,
    name: 'Makam Raja-Raja Mataram Kotagede',
    category: 'wisata',
    lat: -7.8296,
    lng: 110.3978,
    description: 'Kompleks pemakaman pendiri Kerajaan Mataram Islam.',
    address: 'Jagalan, Kotagede',
    phone: '',
    openHours: 'Jam tertentu (Senin, Kamis, Jumat, Minggu)',
    image: '',
    tags: ['heritage', 'wisata', 'makam', 'raligi']
  },
  {
    id: 11,
    name: 'Masjid Gedhe Mataram Kotagede',
    category: 'wisata',
    lat: -7.8290,
    lng: 110.3980,
    description: 'Masjid tertua di Yogyakarta dengan arsitektur Hindu-Islam.',
    address: 'Jagalan, Kotagede',
    phone: '',
    openHours: '24 Jam',
    image: '',
    tags: ['heritage', 'wisata', 'masjid']
  },
  {
    id: 12,
    name: 'Situs Watu Gilang & Watu Gatheng',
    category: 'wisata',
    lat: -7.8305,
    lng: 110.3980,
    description: 'Situs batu singgasana Panembahan Senopati dan bola batu.',
    address: 'Kampung Kedaton, Purbayan',
    phone: '',
    openHours: '08.00 - 16.00 WIB',
    image: '',
    tags: ['heritage', 'wisata', 'situs']
  },
  {
    id: 13,
    name: 'Museum KH. Muzakir',
    category: 'wisata',
    lat: -7.8263,
    lng: 110.3920,
    description: 'Intro Living Museum Kotagede (Rumah Kalang).',
    address: 'Jl. Tegalgendu No. 20, Kotagede',
    phone: '',
    openHours: 'Selasa - Minggu: 08.00 - 15.00 WIB',
    image: '',
    tags: ['heritage', 'wisata', 'museum']
  },
  {
    id: 14,
    name: 'Situs Jebolan Raden Ronggo',
    category: 'wisata',
    lat: -7.8302,
    lng: 110.3985,
    description: 'Tembok Benteng Cepuri yang dijebol Raden Ronggo.',
    address: 'Purbayan, Kotagede',
    phone: '',
    openHours: '24 Jam',
    image: '',
    tags: ['heritage', 'wisata', 'benteng']
  },
  {
    id: 15,
    name: 'Regol Hasta Renggo',
    category: 'wisata',
    lat: -7.8298,
    lng: 110.3975,
    description: 'Gerbang makam kerabat keraton dengan arsitektur Mataram.',
    address: 'Kotagede, Yogyakarta',
    phone: '',
    openHours: '24 Jam',
    image: '',
    tags: ['heritage', 'wisata', 'regol']
  }
];

// Initialize global variables
let LOCATIONS = [];
let CATEGORIES = {};

// === INITIALIZATION ===
// Load Data and Categories from LocalStorage or use Defaults
function initData() {
  try {
    // 1. Load Categories
    const savedCategories = localStorage.getItem('purbayan_categories_v1');
    if (savedCategories) {
      CATEGORIES = JSON.parse(savedCategories);
    } else {
      CATEGORIES = { ...DEFAULT_CATEGORIES };
      localStorage.setItem('purbayan_categories_v1', JSON.stringify(CATEGORIES));
    }

    // 2. Load Locations
    const savedLocations = localStorage.getItem('purbayan_locations_v3'); // Increment version to force reset
    if (savedLocations) {
      LOCATIONS = JSON.parse(savedLocations);
    } else {
      LOCATIONS = [...DEFAULT_LOCATIONS];
      localStorage.setItem('purbayan_locations_v3', JSON.stringify(LOCATIONS));
    }
  } catch (e) {
    console.error('Error initialization data:', e);
    // Fallback
    CATEGORIES = { ...DEFAULT_CATEGORIES };
    LOCATIONS = [...DEFAULT_LOCATIONS];
  }
}

// Call init immediately
initData();


// === DATA MANAGEMENT FUNCTIONS (FOR ADMIN) ===

// Save Locations
function saveLocations(data) {
  LOCATIONS = data;
  localStorage.setItem('purbayan_locations_v3', JSON.stringify(LOCATIONS));
}

// Save Categories
function saveCategories(data) {
  CATEGORIES = data;
  localStorage.setItem('purbayan_categories_v1', JSON.stringify(CATEGORIES));
}

// Add New Category
function addCategory(id, name, color, icon = '📍') {
  if (CATEGORIES[id]) return false; // Exists

  CATEGORIES[id] = {
    id: id,
    name: name,
    icon: icon,
    color: color,
    markerColor: color,
    description: ''
  };
  saveCategories(CATEGORIES);
  return true;
}

// Add new location
function addLocation(newLocation) {
  if (!newLocation.id) {
    newLocation.id = Date.now();
  }
  LOCATIONS.push(newLocation);
  saveLocations(LOCATIONS);
  return newLocation;
}

// Update existing location
function updateLocation(updatedLocation) {
  const index = LOCATIONS.findIndex(l => l.id == updatedLocation.id);
  if (index !== -1) {
    LOCATIONS[index] = updatedLocation;
    saveLocations(LOCATIONS);
    return true;
  }
  return false;
}

// Delete location
function deleteLocation(id) {
  LOCATIONS = LOCATIONS.filter(l => l.id != id);
  saveLocations(LOCATIONS);
}

// Reset data to defaults
function resetData() {
  if (confirm('Reset data akan mengembalikan Kategori dan Lokasi ke kondisi awal (2 Kategori utama). Lanjutkan?')) {
    localStorage.removeItem('purbayan_categories_v1');
    localStorage.removeItem('purbayan_locations_v3');
    location.reload();
  }
}
