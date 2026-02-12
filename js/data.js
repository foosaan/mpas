/**
 * Data Lokasi Wisata Kampung Wisata Purbayan, Kotagede, Yogyakarta
 * Sistem Informasi Geografis (SIG) Pemetaan
 * Updated: Real Data from Google My Maps + User Corrections
 */

const PURBAYAN_CENTER = { lat: -7.8280, lng: 110.4000 };
const DEFAULT_ZOOM = 16;

// Data Kategori
let CATEGORIES = {
  wisata: {
    id: 'wisata',
    name: 'Wisata Purbayan',
    icon: '🏛️', // Castle/Heritage icon
    color: '#d97706', // Amber-600
    markerColor: '#d97706',
    description: 'Situs sejarah, pasar, dan bangunan cagar budaya'
  },
  umkm: {
    id: 'umkm',
    name: 'UMKM Kampung Wisata',
    icon: '🛍️',
    color: '#0284c7', // Sky-600
    markerColor: '#0284c7',
    description: 'Pusat oleh-oleh, kerajinan perak, batik, dan kuliner'
  }
};

// Data Lokasi Real
let LOCATIONS = [
  // --- WISATA PURBAYAN ---
  {
    id: 1,
    name: 'Masjid Gedhe Mataram Kotagede',
    category: 'wisata',
    lat: -7.829462,
    lng: 110.397276,
    description: 'Masjid tertua di Yogyakarta yang dibangun pada masa Kerajaan Mataram Islam. Memiliki arsitektur unik perpaduan Hindu dan Islam.',
    address: 'Sayangan, Jagalan, Banguntapan, Bantul',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Mosque_of_Kotagede.jpg/800px-Mosque_of_Kotagede.jpg',
    phone: '-',
    openHours: '04.00 - 22.00 WIB',
    tags: ['heritage', 'wisata', 'masjid']
  },
  {
    id: 2,
    name: 'Makam Raja-Raja Mataram',
    category: 'wisata',
    lat: -7.829983,
    lng: 110.397457,
    description: 'Kompleks pemakaman pendiri dan raja-raja awal Kerajaan Mataram Islam, termasuk Panembahan Senopati.',
    address: 'Jl. Masjid Besar Mataram, Jagalan',
    image: 'https://upload.wikimedia.org/wikipedia/commons/9/95/Makam_Raja_Mataram_Kotagede.jpg',
    phone: '-',
    openHours: 'Senin, Kamis, Jumat, Minggu (Jadwal Khusus)',
    tags: ['heritage', 'wisata', 'makam', 'religi']
  },
  {
    id: 3,
    name: 'Pasar Kotagede Yogyakarta',
    category: 'wisata',
    lat: -7.827725,
    lng: 110.400512,
    description: 'Pasar tradisional tertua di Yogyakarta yang sduah ada sejak jaman Kerajaan Mataram Islam (Sargede).',
    address: 'Jl. Mentaok Raya, Purbayan, Kotagede',
    image: 'https://upload.wikimedia.org/wikipedia/commons/a/a2/Pasar_Kotagede.jpg',
    phone: '-',
    openHours: '05.00 - 17.00 WIB',
    tags: ['pasar', 'wisata', 'sejarah']
  },
  {
    id: 4,
    name: 'Situs Watu Gilang & Watu Gatheng',
    category: 'wisata',
    lat: -7.826700,
    lng: 110.398500,
    description: 'Batu andesit persegi yang dipercaya sebagai singgasana Panembahan Senopati. Watu Gatheng adalah bola batu yang digunakan untuk latihan fisik prajurit.',
    address: 'Kampung Dalem, Purbayan, Kotagede',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Watu_Gilang.jpg/640px-Watu_Gilang.jpg',
    phone: '-',
    openHours: '08.00 - 16.00 WIB',
    tags: ['heritage', 'wisata', 'situs']
  },
  {
    id: 5,
    name: 'Between Two Gates (Lawang Kembar)',
    category: 'wisata',
    lat: -7.830500,
    lng: 110.398800,
    description: 'Kawasan permukiman tradisional dengan ciri khas gang sempit yang diapit oleh dua gerbang arsitektur kuno.',
    address: 'Alun-Alun Selatan, Purbayan',
    image: 'https://visitingjogja.jogjaprov.go.id/wp-content/uploads/2020/05/between-two-gates.jpg',
    phone: '-',
    openHours: '24 Jam',
    tags: ['heritage', 'wisata', 'kampung']
  },
  {
    id: 6,
    name: 'Museum KH. Muzakir',
    category: 'wisata',
    lat: -7.826350,
    lng: 110.392000,
    description: 'Museum yang didedikasikan untuk Prof. KH. Abdul Kahar Muzakkir, tokoh pejuang kemerdekaan dan anggota BPUPKI asal Kotagede.',
    address: 'Jl. Mondorakan, Kotagede',
    image: 'https://placehold.co/600x400?text=Museum+Muzakir',
    phone: '-',
    openHours: '09.00 - 15.00 WIB',
    tags: ['heritage', 'wisata', 'museum']
  },
  {
    id: 7,
    name: 'Situs Jebolan Raden Ronggo',
    category: 'wisata',
    lat: -7.831000,
    lng: 110.398000,
    description: 'Situs bersejarah berupa reruntuhan tembok benteng cepuri yang dijebol oleh Raden Ronggo.',
    address: 'Area Benteng Cepuri, Purbayan',
    image: 'https://placehold.co/600x400?text=Situs+Jebolan',
    phone: '-',
    openHours: '24 Jam',
    tags: ['heritage', 'wisata', 'benteng']
  },
  {
    id: 8,
    name: 'Regol Hasta Renggo',
    category: 'wisata',
    lat: -7.817000,
    lng: 110.395000,
    description: 'Bangunan pintu gerbang (regol) bersejarah dengan arsitektur khas Jawa-Eropa.',
    address: 'Kotagede',
    image: 'https://placehold.co/600x400?text=Regol+Hasta+Renggo',
    phone: '-',
    openHours: '24 Jam',
    tags: ['heritage', 'wisata', 'regol']
  },
  {
    id: 11,
    name: 'Peken Klangenan Kota Gede',
    category: 'wisata',
    lat: -7.828000,
    lng: 110.400800,
    description: 'Pasar kuliner tradisional yang menyajikan jajanan lawas dan suasana tempo dulu.',
    address: 'Area Pasar Kotagede',
    image: 'https://placehold.co/600x400?text=Peken+Klangenan',
    phone: '-',
    openHours: 'Sabtu/Minggu Malam',
    tags: ['pasar', 'wisata', 'seni', 'kuliner']
  },

  // --- UMKM KAMPUNG WISATA ---
  {
    id: 9,
    name: 'Roti Kembang Waru Eko 521',
    category: 'umkm',
    lat: -7.828500,
    lng: 110.402000,
    description: 'Roti tradisional khas Kotagede berbentuk bunga Waru. Warisan kuliner sejak zaman Mataram Islam.',
    address: 'Sokowaten, RT.18/RW.05, Purbayan',
    image: 'https://asset.kompas.com/crops/_z2L9C3X67yv7Z6n6g6h6l6x6w=/0x0:1000x667/750x500/data/photo/2020/10/22/5f91443423a6a.jpg',
    phone: '0812-xxxx-xxxx',
    openHours: '08.00 - 20.00 WIB',
    tags: ['kuliner', 'roti', 'kembang waru', 'umkm']
  },
  {
    id: 10,
    name: 'Lenis Camilan Jogja',
    category: 'umkm',
    lat: -7.830200,
    lng: 110.398000,
    description: 'Pusat oleh-oleh camilan khas Jogja dan Kotagede.',
    address: 'Jl. Nyi Adisoro No. 19 Prenggan',
    image: 'https://placehold.co/600x400?text=Lenis+Camilan',
    phone: '-',
    openHours: '09.00 - 21.00 WIB',
    tags: ['kuliner', 'camilan', 'oleh-oleh', 'umkm']
  },
  {
    id: 12,
    name: 'Umi Silver',
    category: 'umkm',
    lat: -7.824000,
    lng: 110.399500,
    description: 'Pengrajin dan toko perhiasan perak asli Kotagede dengan desain klasik dan modern.',
    address: 'Jl. Kemasan, Kotagede',
    image: 'https://placehold.co/600x400?text=Umi+Silver',
    phone: '-',
    openHours: '09.00 - 17.00 WIB',
    tags: ['kerajinan', 'perak', 'silver', 'umkm']
  },
  {
    id: 13,
    name: 'Pengrajin Perak Mas Ribut',
    category: 'umkm',
    lat: -7.822500,
    lng: 110.400500,
    description: 'Workshop pengrajin perak yang melayani pembuatan perhiasan custom.',
    address: 'Kampung Basen, Kotagede',
    image: 'https://placehold.co/600x400?text=Mas+Ribut+Silver',
    phone: '-',
    openHours: '08.00 - 16.00 WIB',
    tags: ['kerajinan', 'perak', 'umkm']
  },
  {
    id: 14,
    name: 'Blangkon WGO Sinjang Jawi',
    category: 'umkm',
    lat: -7.831500,
    lng: 110.401000,
    description: 'Produksi blangkon dan busana adat Jawa Mataraman berkualitas.',
    address: 'Kotagede',
    image: 'https://placehold.co/600x400?text=Blangkon+WGO',
    phone: '-',
    openHours: '09.00 - 17.00 WIB',
    tags: ['kerajinan', 'blangkon', 'busana', 'umkm']
  },
  {
    id: 15,
    name: 'Creative Batik Kotagede',
    category: 'umkm',
    lat: -7.827500,
    lng: 110.401500,
    description: 'Galeri dan workshop batik tulis dengan motif abstrak dan kontemporer.',
    address: 'Purbayan, Kotagede',
    image: 'https://placehold.co/600x400?text=Creative+Batik',
    phone: '-',
    openHours: '09.00 - 17.00 WIB',
    tags: ['kerajinan', 'batik', 'umkm']
  }
];

// === INITIALIZATION ===
// Load Data and Categories from LocalStorage or use Defaults
function initData() {
  try {
    // 1. Load Categories
    const savedCategories = localStorage.getItem('purbayan_categories_v3'); // NEW KEY v3
    if (savedCategories) {
      CATEGORIES = JSON.parse(savedCategories);
    } else {
      localStorage.setItem('purbayan_categories_v3', JSON.stringify(CATEGORIES));
    }

    // 2. Load Locations
    const savedLocations = localStorage.getItem('purbayan_locations_v6'); // NEW KEY v6 (Force Update)
    if (savedLocations) {
      LOCATIONS = JSON.parse(savedLocations);
    } else {
      localStorage.setItem('purbayan_locations_v6', JSON.stringify(LOCATIONS));
    }
  } catch (e) {
    console.error('Error initialization data:', e);
  }
}

// Call init immediately
initData();


// === DATA MANAGEMENT FUNCTIONS (FOR ADMIN) ===

// Save Locations
function saveLocations(data) {
  LOCATIONS = data;
  localStorage.setItem('purbayan_locations_v6', JSON.stringify(LOCATIONS));
}

// Save Categories
function saveCategories(data) {
  CATEGORIES = data;
  localStorage.setItem('purbayan_categories_v3', JSON.stringify(CATEGORIES));
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
    localStorage.removeItem('purbayan_categories_v3');
    localStorage.removeItem('purbayan_locations_v6');
    location.reload();
  }
}
