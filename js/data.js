/**
 * Data Lokasi Wisata Kampung Wisata Purbayan, Kotagede, Yogyakarta
 * Sistem Informasi Geografis (SIG) Pemetaan
 * Firebase Realtime Database Integration
 */

const FIREBASE_DB_URL = 'https://maps-purbayan-default-rtdb.asia-southeast1.firebasedatabase.app';

const PURBAYAN_CENTER = { lat: -7.8280, lng: 110.4000 };
const DEFAULT_ZOOM = 16;

// Data Kategori (default)
const DEFAULT_CATEGORIES = {
  wisata: {
    id: 'wisata',
    name: 'Wisata Purbayan',
    icon: '🏛️',
    color: '#d97706',
    markerColor: '#d97706',
    description: 'Situs sejarah, pasar, dan bangunan cagar budaya'
  },
  umkm: {
    id: 'umkm',
    name: 'UMKM Kampung Wisata',
    icon: '🛍️',
    color: '#0284c7',
    markerColor: '#0284c7',
    description: 'Pusat oleh-oleh, kerajinan perak, batik, dan kuliner'
  }
};

// Data Lokasi Default
const DEFAULT_LOCATIONS = [
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
    tags: ['heritage', 'wisata', 'masjid'],
    order: 0
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
    tags: ['heritage', 'wisata', 'makam', 'religi'],
    order: 1
  },
  {
    id: 3,
    name: 'Pasar Kotagede Yogyakarta',
    category: 'wisata',
    lat: -7.827725,
    lng: 110.400512,
    description: 'Pasar tradisional tertua di Yogyakarta yang sudah ada sejak jaman Kerajaan Mataram Islam (Sargede).',
    address: 'Jl. Mentaok Raya, Purbayan, Kotagede',
    image: 'https://upload.wikimedia.org/wikipedia/commons/a/a2/Pasar_Kotagede.jpg',
    phone: '-',
    openHours: '05.00 - 17.00 WIB',
    tags: ['pasar', 'wisata', 'sejarah'],
    order: 2
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
    tags: ['heritage', 'wisata', 'situs'],
    order: 3
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
    tags: ['heritage', 'wisata', 'kampung'],
    order: 4
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
    tags: ['heritage', 'wisata', 'museum'],
    order: 5
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
    tags: ['heritage', 'wisata', 'benteng'],
    order: 6
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
    tags: ['heritage', 'wisata', 'regol'],
    order: 7
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
    tags: ['pasar', 'wisata', 'seni', 'kuliner'],
    order: 8
  },
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
    tags: ['kuliner', 'roti', 'kembang waru', 'umkm'],
    order: 9
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
    tags: ['kuliner', 'camilan', 'oleh-oleh', 'umkm'],
    order: 10
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
    tags: ['kerajinan', 'perak', 'silver', 'umkm'],
    order: 11
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
    tags: ['kerajinan', 'perak', 'umkm'],
    order: 12
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
    tags: ['kerajinan', 'blangkon', 'busana', 'umkm'],
    order: 13
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
    tags: ['kerajinan', 'batik', 'umkm'],
    order: 14
  }
];

// === ACTIVE DATA (will be populated from Firebase or defaults) ===
let CATEGORIES = JSON.parse(JSON.stringify(DEFAULT_CATEGORIES));
let LOCATIONS = JSON.parse(JSON.stringify(DEFAULT_LOCATIONS));

// === FIREBASE HELPER FUNCTIONS ===

async function firebaseGet(path) {
  try {
    const res = await fetch(`${FIREBASE_DB_URL}/${path}.json`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (e) {
    console.error(`Firebase GET error (${path}):`, e);
    return null;
  }
}

async function firebasePut(path, data) {
  try {
    const res = await fetch(`${FIREBASE_DB_URL}/${path}.json`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return true;
  } catch (e) {
    console.error(`Firebase PUT error (${path}):`, e);
    return false;
  }
}

// === INITIALIZATION ===
let dataReady = false;
let onDataReadyCallbacks = [];

function onDataReady(callback) {
  if (dataReady) {
    callback();
  } else {
    onDataReadyCallbacks.push(callback);
  }
}

async function initData() {
  try {
    // 1. Load Categories from Firebase
    const fbCategories = await firebaseGet('categories');
    if (fbCategories && Object.keys(fbCategories).length > 0) {
      CATEGORIES = fbCategories;
    } else {
      // First time: seed Firebase with default data
      await firebasePut('categories', DEFAULT_CATEGORIES);
      CATEGORIES = JSON.parse(JSON.stringify(DEFAULT_CATEGORIES));
    }

    // 2. Load Locations from Firebase
    const fbLocations = await firebaseGet('locations');
    if (fbLocations && fbLocations.length > 0) {
      LOCATIONS = fbLocations;
      // Auto-assign order for locations that don't have it
      let needsSave = false;
      LOCATIONS.forEach((loc, i) => {
        if (loc.order === undefined || loc.order === null) {
          loc.order = i;
          needsSave = true;
        }
      });
      if (needsSave) {
        await firebasePut('locations', LOCATIONS);
      }
    } else {
      // First time: seed Firebase with default data
      await firebasePut('locations', DEFAULT_LOCATIONS);
      LOCATIONS = JSON.parse(JSON.stringify(DEFAULT_LOCATIONS));
    }

    console.log(`✅ Data loaded from Firebase: ${LOCATIONS.length} locations, ${Object.keys(CATEGORIES).length} categories`);
  } catch (e) {
    console.error('Error loading Firebase data, using defaults:', e);
    CATEGORIES = JSON.parse(JSON.stringify(DEFAULT_CATEGORIES));
    LOCATIONS = JSON.parse(JSON.stringify(DEFAULT_LOCATIONS));
  }

  // Signal that data is ready
  dataReady = true;
  onDataReadyCallbacks.forEach(cb => cb());
  onDataReadyCallbacks = [];
}

// Start loading data immediately
initData();

// === POLLING FOR REALTIME UPDATES (for user-facing page) ===
let pollingInterval = null;

function startRealtimePolling(onUpdate) {
  // Poll every 5 seconds for changes
  pollingInterval = setInterval(async () => {
    try {
      const fbLocations = await firebaseGet('locations');
      const fbCategories = await firebaseGet('categories');

      let changed = false;

      if (fbLocations && JSON.stringify(fbLocations) !== JSON.stringify(LOCATIONS)) {
        LOCATIONS = fbLocations;
        changed = true;
      }

      if (fbCategories && JSON.stringify(fbCategories) !== JSON.stringify(CATEGORIES)) {
        CATEGORIES = fbCategories;
        changed = true;
      }

      if (changed && onUpdate) {
        onUpdate();
      }
    } catch (e) {
      console.error('Polling error:', e);
    }
  }, 5000);
}

function stopRealtimePolling() {
  if (pollingInterval) {
    clearInterval(pollingInterval);
    pollingInterval = null;
  }
}

// === DATA MANAGEMENT FUNCTIONS (FOR ADMIN) ===

async function saveLocations(data) {
  LOCATIONS = data;
  await firebasePut('locations', LOCATIONS);
}

async function saveCategories(data) {
  CATEGORIES = data;
  await firebasePut('categories', CATEGORIES);
}

async function addCategory(id, name, color, icon = '📍') {
  if (CATEGORIES[id]) return false;

  CATEGORIES[id] = {
    id: id,
    name: name,
    icon: icon,
    color: color,
    markerColor: color,
    description: ''
  };
  await saveCategories(CATEGORIES);
  return true;
}

async function addLocation(newLocation) {
  if (!newLocation.id) {
    newLocation.id = Date.now();
  }
  if (newLocation.order === undefined || newLocation.order === null) {
    const maxOrder = LOCATIONS.reduce((max, l) => Math.max(max, l.order || 0), -1);
    newLocation.order = maxOrder + 1;
  }
  LOCATIONS.push(newLocation);
  await saveLocations(LOCATIONS);
  return newLocation;
}

async function updateLocation(updatedLocation) {
  const index = LOCATIONS.findIndex(l => l.id == updatedLocation.id);
  if (index !== -1) {
    if (updatedLocation.order === undefined || updatedLocation.order === null) {
      updatedLocation.order = LOCATIONS[index].order;
    }
    LOCATIONS[index] = updatedLocation;
    await saveLocations(LOCATIONS);
    return true;
  }
  return false;
}

async function deleteLocation(id) {
  LOCATIONS = LOCATIONS.filter(l => l.id != id);
  normalizeOrder();
  await saveLocations(LOCATIONS);
}

// === ORDER MANAGEMENT FUNCTIONS ===

function normalizeOrder() {
  LOCATIONS.sort((a, b) => (a.order || 0) - (b.order || 0));
  LOCATIONS.forEach((loc, i) => {
    loc.order = i;
  });
}

async function moveLocationToTop(id) {
  const loc = LOCATIONS.find(l => l.id == id);
  if (!loc) return;
  loc.order = -1;
  normalizeOrder();
  await saveLocations(LOCATIONS);
}

async function moveLocationUp(id) {
  const sorted = [...LOCATIONS].sort((a, b) => (a.order || 0) - (b.order || 0));
  const idx = sorted.findIndex(l => l.id == id);
  if (idx <= 0) return;

  const temp = sorted[idx].order;
  sorted[idx].order = sorted[idx - 1].order;
  sorted[idx - 1].order = temp;

  await saveLocations(LOCATIONS);
}

async function moveLocationDown(id) {
  const sorted = [...LOCATIONS].sort((a, b) => (a.order || 0) - (b.order || 0));
  const idx = sorted.findIndex(l => l.id == id);
  if (idx === -1 || idx >= sorted.length - 1) return;

  const temp = sorted[idx].order;
  sorted[idx].order = sorted[idx + 1].order;
  sorted[idx + 1].order = temp;

  await saveLocations(LOCATIONS);
}

// Reset data to defaults (also resets Firebase)
async function resetData() {
  if (confirm('Reset data akan mengembalikan Kategori dan Lokasi ke kondisi awal. Data di Firebase juga akan di-reset. Lanjutkan?')) {
    await firebasePut('categories', DEFAULT_CATEGORIES);
    await firebasePut('locations', DEFAULT_LOCATIONS);
    location.reload();
  }
}
