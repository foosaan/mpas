/**
 * Data Lokasi Wisata Kampung Wisata Purbayan, Kotagede, Yogyakarta
 * Sistem Informasi Geografis (SIG) Pemetaan
 */

const PURBAYAN_CENTER = { lat: -7.8280, lng: 110.4000 }; // Adjusted to center of Purbayan
const DEFAULT_ZOOM = 16;

const CATEGORIES = {
  heritage: {
    id: 'heritage',
    name: 'Wisata Purbayan (Heritage)',
    icon: '🏰', // Castle icon (Approximating the heritage icon)
    color: '#8B4513',
    markerColor: '#8B4513',
    description: 'Situs bersejarah dan bangunan heritage peninggalan Mataram'
  },
  kuliner: {
    id: 'kuliner',
    name: 'Kuliner & Jajanan',
    icon: '🍽️',
    color: '#D2691E',
    markerColor: '#E07C24',
    description: 'Wisata kuliner tradisional khas Kotagede'
  },
  kerajinan: {
    id: 'kerajinan',
    name: 'UMKM & Kerajinan',
    icon: '🎨', // Palette icon
    color: '#A8A9AD',
    markerColor: '#708090',
    description: 'Kerajinan perak, batik, dan busana adat'
  },
  belanja: {
    id: 'belanja',
    name: 'Pasar & Belanja',
    icon: '🛍️', // Shopping bag icon
    color: '#E91E63',
    markerColor: '#C2185B',
    description: 'Pasar tradisional dan pusat perbelanjaan'
  },
  penginapan: {
    id: 'penginapan',
    name: 'Homestay',
    icon: '🏠',
    color: '#2E8B57',
    markerColor: '#2E8B57',
    description: 'Penginapan dan homestay'
  },
  senibudaya: {
    id: 'senibudaya',
    name: 'Seni & Budaya',
    icon: '🎭',
    color: '#8B008B',
    markerColor: '#9B30FF',
    description: 'Seni dan budaya lokal'
  },
  fasilitas: {
    id: 'fasilitas',
    name: 'Fasilitas Umum',
    icon: '📍',
    color: '#4169E1',
    markerColor: '#4169E1',
    description: 'Fasilitas umum'
  }
};

const DEFAULT_LOCATIONS = [
  // === UMKM KAMPUNG WISATA PURBAYAN (Initial Group 1) ===
  {
    id: 1,
    name: 'Roti Kembang Waru Pak Bas',
    category: 'kuliner',
    lat: -7.8282,
    lng: 110.4025,
    description: 'Roti tradisional khas Kotagede berbentuk bunga waru. Roti ini sudah ada sejak zaman Mataram Islam dan menjadi jajanan wajib saat berkunjung ke Kotagede.',
    address: 'Bumen RT.23/06 KGIII/452, Purbayan, Kotagede',
    phone: '',
    openHours: '08.00 - 16.00 WIB',
    image: '',
    tags: ['kuliner', 'roti', 'kembang waru', 'khas', 'oleh-oleh']
  },
  {
    id: 2,
    name: 'Lenis Camilan Jogja',
    category: 'kuliner',
    lat: -7.8280,
    lng: 110.4000,
    description: 'Pusat oleh-oleh dan camilan khas Jogja yang menyediakan berbagai macam snack tradisional.',
    address: 'Purbayan, Kotagede, Yogyakarta',
    phone: '',
    openHours: '08.00 - 20.00 WIB',
    image: '',
    tags: ['kuliner', 'camilan', 'oleh-oleh', 'snack']
  },
  {
    id: 3,
    name: 'Umi Silver',
    category: 'kerajinan',
    lat: -7.8250,
    lng: 110.3980,
    description: 'Pengrajin perak yang menawarkan berbagai perhiasan dan kerajinan perak berkualitas tinggi dengan desain yang elegan.',
    address: 'Kotagede, Yogyakarta',
    phone: '',
    openHours: '09.00 - 17.00 WIB',
    image: '',
    tags: ['kerajinan', 'perak', 'silver', 'perhiasan', 'umkm']
  },
  {
    id: 4,
    name: 'Blangkon Pakaian Adat Jawa',
    category: 'kerajinan',
    lat: -7.8175,
    lng: 110.3950,
    description: 'WGO Sinjang Jawi. Produsen blangkon dan busana adat Jawa dengan kualitas halus dan motif yang beragam.',
    address: 'Jl. Ki Pemanahan, Purbayan, Kotagede',
    phone: '',
    openHours: '09.00 - 17.00 WIB',
    image: '',
    tags: ['kerajinan', 'blangkon', 'pakaian adat', 'jawa', 'busana']
  },
  {
    id: 5,
    name: 'Creative Batik',
    category: 'kerajinan',
    lat: -7.8180,
    lng: 110.3955,
    description: 'Batik Tulis Abstrak Kontemporer. Galeri batik yang menampilkan karya batik tulis dengan motif abstrak dan kontemporer yang unik.',
    address: 'Kotagede, Yogyakarta',
    phone: '',
    openHours: '09.00 - 17.00 WIB',
    image: '',
    tags: ['kerajinan', 'batik', 'tulis', 'abstrak', 'kontemporer']
  },
  {
    id: 6,
    name: 'Pengrajin Perak Mas Ribut',
    category: 'kerajinan',
    lat: -7.8235,
    lng: 110.4005,
    description: 'Salah satu pengrajin perak lokal di kawasan Kotagede yang memproduksi berbagai kerajinan tangan dari perak.',
    address: 'Jl. Kemasan, Kotagede, Yogyakarta',
    phone: '',
    openHours: '09.00 - 16.00 WIB',
    image: '',
    tags: ['kerajinan', 'perak', 'silver', 'pengrajin']
  },

  // === WISATA PURBAYAN, KOTAGEDE (Initial Group 2) ===
  {
    id: 7,
    name: 'Pasar Kotagede Yogyakarta',
    category: 'belanja',
    lat: -7.8280,
    lng: 110.4000,
    description: 'Pasar Legi Kotagede. Pasar tradisional tertua di Yogyakarta yang selalu ramai, terutama saat hari pasaran Legi dalam kalender Jawa.',
    address: 'Jl. Mondorakan, Purbayan, Kotagede',
    phone: '',
    openHours: '05.00 - 13.00 WIB (Ramai saat Legi)',
    image: '',
    tags: ['belanja', 'pasar', 'tradisional', 'legi']
  },
  {
    id: 8,
    name: 'Peken Klangenan Kota Gede',
    category: 'belanja',
    lat: -7.8285,
    lng: 110.4005,
    description: 'Pasar seni dan kuliner yang menawarkan suasana tempo dulu dengan berbagai jajanan dan barang antik.',
    address: 'Kampung Pusaka Beteng Cepuri, Singosaren',
    phone: '',
    openHours: 'Sesuai jadwal event',
    image: '',
    tags: ['belanja', 'pasar', 'seni', 'kuliner', 'antik']
  },
  {
    id: 9,
    name: 'Between Two Gates',
    category: 'heritage',
    lat: -7.8300,
    lng: 110.3990,
    description: 'Lawang Pethuk. Kawasan perkampungan tradisional yang diapit oleh dua gerbang (gapura). Area ini masih sangat kental dengan nuansa Jawa kuno.',
    address: 'Alun-alun, Purbayan, Kotagede',
    phone: '',
    openHours: '24 Jam',
    image: '',
    tags: ['heritage', 'gapura', 'kampung', 'tradisional']
  },
  {
    id: 10,
    name: 'Makam Raja-Raja Mataram Kotagede',
    category: 'heritage',
    lat: -7.8296,
    lng: 110.3978,
    description: 'Kompleks pemakaman pendiri Kerajaan Mataram Islam, Panembahan Senopati, dan kerabatnya. Tempat ini sakral dan memiliki aturan khusus bagi pengunjung.',
    address: 'Jagalan, Kotagede',
    phone: '',
    openHours: 'Senin, Kamis, Jumat, Minggu (Jam tertentu)',
    image: '',
    tags: ['heritage', 'makam', 'raja', 'mataram', 'sakral']
  },
  {
    id: 11,
    name: 'Masjid Gedhe Mataram Kotagede',
    category: 'heritage',
    lat: -7.8290,
    lng: 110.3980,
    description: 'Masjid tertua di Yogyakarta yang dibangun pada masa Kerajaan Mataram Islam. Arsitekturnya unik dengan perpaduan Hindu dan Islam.',
    address: 'Jagalan, Kotagede',
    phone: '',
    openHours: '24 Jam (Waktu Sholat)',
    image: '',
    tags: ['heritage', 'masjid', 'religi', 'mataram']
  },
  {
    id: 12,
    name: 'Situs Watu Gilang & Watu Gatheng',
    category: 'heritage',
    lat: -7.8305,
    lng: 110.3980,
    description: 'Situs batu andesit datar (Watu Gilang) yang dipercaya sebagai singgasana Panembahan Senopati. Di dekatnya terdapat Watu Gatheng, bola-bola batu misterius.',
    address: 'Kampung Kedaton, Purbayan',
    phone: '',
    openHours: '08.00 - 16.00 WIB',
    image: '',
    tags: ['heritage', 'situs', 'watu gilang', 'sejarah']
  },
  {
    id: 13,
    name: 'Museum KH. Muzakir',
    category: 'heritage',
    lat: -7.8263,
    lng: 110.3920,
    description: 'Rumah Kalang yang difungsikan sebagai museum (Intro Living Museum) yang menyimpan sejarah dan budaya Kotagede.',
    address: 'Jl. Tegalgendu No. 20, Kotagede',
    phone: '',
    openHours: 'Selasa - Minggu: 08.00 - 15.00 WIB',
    image: '',
    tags: ['heritage', 'museum', 'sejarah', 'budaya']
  },
  {
    id: 14,
    name: 'Situs Jebolan Raden Ronggo',
    category: 'heritage',
    lat: -7.8302,
    lng: 110.3985,
    description: 'Bagian tembok Benteng Cepuri yang konon dijebol oleh Raden Ronggo dengan kekuatannya sendiri. Situs ini menjadi bukti kekuatan legenda lokal.',
    address: 'Purbayan, Kotagede',
    phone: '',
    openHours: '24 Jam',
    image: '',
    tags: ['heritage', 'benteng', 'situs', 'legenda']
  },
  {
    id: 15,
    name: 'Regol Hasta Renggo',
    category: 'heritage',
    lat: -7.8298,
    lng: 110.3975,
    description: 'Pintu gerbang menuju kompleks pemakaman kerabat keraton Yogyakarta. Arsitekturnya khas gaya Mataram.',
    address: 'Kotagede, Yogyakarta',
    phone: '',
    openHours: '24 Jam',
    image: '',
    tags: ['heritage', 'regol', 'gerbang', 'makam']
  }
];

// Initialize LOCATIONS
let LOCATIONS = DEFAULT_LOCATIONS;

// Try to load from LocalStorage
try {
  const savedData = localStorage.getItem('purbayan_locations_v2');
  if (savedData) {
    LOCATIONS = JSON.parse(savedData);
  } else {
    localStorage.setItem('purbayan_locations_v2', JSON.stringify(DEFAULT_LOCATIONS));
  }
} catch (e) {
  console.error('Error loading data from LocalStorage:', e);
}

// === DATA MANAGEMENT FUNCTIONS (FOR ADMIN) ===

// Save current locations to LocalStorage
function saveLocations(data) {
  LOCATIONS = data;
  localStorage.setItem('purbayan_locations_v2', JSON.stringify(LOCATIONS));
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
  if (confirm('Apakah Anda yakin ingin mereset semua data ke kondisi awal? Data yang ditambahkan akan hilang.')) {
    LOCATIONS = [...DEFAULT_LOCATIONS];
    saveLocations(LOCATIONS);
    location.reload();
  }
}
