/**
 * Data Lokasi Wisata Kampung Wisata Purbayan, Kotagede, Yogyakarta
 * Sistem Informasi Geografis (SIG) Pemetaan
 */

const PURBAYAN_CENTER = { lat: -7.8226, lng: 110.4026 };
const DEFAULT_ZOOM = 16;

const CATEGORIES = {
  heritage: {
    id: 'heritage',
    name: 'Cagar Budaya & Heritage',
    icon: '🏛️',
    color: '#8B4513',
    markerColor: '#8B4513',
    description: 'Situs bersejarah dan bangunan heritage peninggalan Kerajaan Mataram Islam'
  },
  perak: {
    id: 'perak',
    name: 'Kerajinan Perak',
    icon: '🪙',
    color: '#A8A9AD',
    markerColor: '#708090',
    description: 'Pusat kerajinan perak khas Kotagede yang terkenal sejak era Mataram'
  },
  kuliner: {
    id: 'kuliner',
    name: 'Kuliner & Jajanan',
    icon: '🍽️',
    color: '#D2691E',
    markerColor: '#E07C24',
    description: 'Wisata kuliner tradisional dan jajanan khas Kotagede'
  },
  penginapan: {
    id: 'penginapan',
    name: 'Homestay & Penginapan',
    icon: '🏠',
    color: '#2E8B57',
    markerColor: '#2E8B57',
    description: 'Penginapan dan homestay bernuansa tradisional Jawa'
  },
  senibudaya: {
    id: 'senibudaya',
    name: 'Seni & Budaya',
    icon: '🎭',
    color: '#8B008B',
    markerColor: '#9B30FF',
    description: 'Pusat kegiatan seni dan budaya lokal'
  },
  fasilitas: {
    id: 'fasilitas',
    name: 'Fasilitas Umum',
    icon: '📍',
    color: '#4169E1',
    markerColor: '#4169E1',
    description: 'Fasilitas umum dan titik penting bagi pengunjung'
  }
};

const DEFAULT_LOCATIONS = [
  // === HERITAGE / CAGAR BUDAYA ===
  {
    id: 1,
    name: 'Masjid Agung Mataram Kotagede',
    category: 'heritage',
    lat: -7.8232,
    lng: 110.4010,
    description: 'Masjid tertua peninggalan Kerajaan Mataram Islam yang didirikan oleh Panembahan Senopati pada abad ke-16. Memiliki arsitektur Jawa klasik dengan mihrab dari kayu jati berusia ratusan tahun. Masjid ini merupakan salah satu cagar budaya nasional.',
    address: 'Jl. Kemasan, Purbayan, Kotagede, Yogyakarta',
    phone: '-',
    openHours: 'Setiap hari, 24 jam (untuk ibadah)',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Masjid_Agung_Kotagede.jpg/1280px-Masjid_Agung_Kotagede.jpg',
    tags: ['sejarah', 'mataram', 'masjid', 'cagar budaya']
  },
  {
    id: 2,
    name: 'Makam Raja-Raja Mataram (Hastana Ngayogyakarta)',
    category: 'heritage',
    lat: -7.8237,
    lng: 110.4005,
    description: 'Kompleks pemakaman para raja Kerajaan Mataram Islam, termasuk pendiri kerajaan Panembahan Senopati dan Ki Ageng Pemanahan. Pengunjung harus mengenakan pakaian adat Jawa (tersedia di lokasi) untuk memasuki area makam.',
    address: 'Jl. Kemasan, Purbayan, Kotagede, Yogyakarta',
    phone: '-',
    openHours: 'Senin & Kamis: 10.00 - 12.00 WIB, Jumat: 13.30 - 15.30 WIB',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Kotagede_Kings_Graveyard.jpg/1280px-Kotagede_Kings_Graveyard.jpg',
    tags: ['sejarah', 'mataram', 'makam', 'cagar budaya', 'raja']
  },
  {
    id: 3,
    name: 'Gapura & Tembok Beteng Kotagede',
    category: 'heritage',
    lat: -7.8220,
    lng: 110.4015,
    description: 'Gerbang utama dan sisa tembok benteng Kerajaan Mataram Islam yang masih berdiri kokoh. Gapura ini menjadi ikon Kotagede dan simbol kejayaan Mataram. Batu bata kuno yang digunakan merupakan bukti keahlian arsitektur masa lalu.',
    address: 'Jl. Mondorakan, Purbayan, Kotagede, Yogyakarta',
    phone: '-',
    openHours: 'Bisa dilihat kapan saja (area terbuka)',
    image: '',
    tags: ['sejarah', 'mataram', 'gapura', 'benteng', 'cagar budaya']
  },
  {
    id: 4,
    name: 'Rumah Joglo Tua Kampung Purbayan',
    category: 'heritage',
    lat: -7.8222,
    lng: 110.4032,
    description: 'Beberapa rumah Joglo tua peninggalan saudagar perak era kolonial yang masih terawat. Arsitektur Jawa klasik dengan ukiran kayu jati yang indah. Beberapa rumah telah dialihfungsikan sebagai homestay dan gallery.',
    address: 'Kampung Purbayan, Kotagede, Yogyakarta',
    phone: '-',
    openHours: 'Dengan perjanjian',
    image: '',
    tags: ['sejarah', 'joglo', 'arsitektur', 'jawa']
  },
  {
    id: 5,
    name: 'Sendang Seliran',
    category: 'heritage',
    lat: -7.8240,
    lng: 110.4020,
    description: 'Sumber mata air kuno yang dipercaya sebagai tempat bersuci para raja Mataram. Sendang ini memiliki nilai sejarah dan spiritual yang tinggi bagi masyarakat Kotagede.',
    address: 'Purbayan, Kotagede, Yogyakarta',
    phone: '-',
    openHours: 'Setiap hari',
    image: '',
    tags: ['sejarah', 'mataram', 'sendang', 'mata air']
  },

  // === KERAJINAN PERAK ===
  {
    id: 6,
    name: 'HS Silver',
    category: 'perak',
    lat: -7.8215,
    lng: 110.4045,
    description: 'Salah satu produsen perak terbesar dan tertua di Kotagede. Menawarkan showroom lengkap dengan berbagai produk perak mulai dari perhiasan, aksesoris, hingga cinderamata. Pengunjung juga bisa melihat proses pembuatan perak langsung.',
    address: 'Jl. Mondorakan No. 1, Purbayan, Kotagede, Yogyakarta',
    phone: '(0274) 376123',
    openHours: 'Senin - Sabtu: 08.00 - 17.00 WIB',
    image: '',
    tags: ['perak', 'kerajinan', 'silver', 'oleh-oleh', 'showroom']
  },
  {
    id: 7,
    name: "Tom's Silver",
    category: 'perak',
    lat: -7.8210,
    lng: 110.4050,
    description: "Tom's Silver merupakan salah satu sentra kerajinan perak terkenal di Kotagede. Menyediakan showroom dan workshop di mana pengunjung bisa belajar membuat kerajinan perak sendiri (silver class).",
    address: 'Jl. Ngeksigondo No. 60, Kotagede, Yogyakarta',
    phone: '(0274) 376490',
    openHours: 'Senin - Sabtu: 08.00 - 18.00 WIB',
    image: '',
    tags: ['perak', 'kerajinan', 'silver', 'workshop', 'kelas']
  },
  {
    id: 8,
    name: 'Workshop Perak Warga Purbayan',
    category: 'perak',
    lat: -7.8228,
    lng: 110.4035,
    description: 'Workshop perak rumahan milik warga Kampung Purbayan. Pengunjung bisa melihat langsung proses pembuatan kerajinan perak secara tradisional oleh pengrajin lokal, mulai dari peleburan hingga finishing.',
    address: 'Kampung Purbayan, Kotagede, Yogyakarta',
    phone: '-',
    openHours: 'Senin - Sabtu: 09.00 - 16.00 WIB',
    image: '',
    tags: ['perak', 'kerajinan', 'workshop', 'tradisional', 'UMKM']
  },
  {
    id: 9,
    name: 'Narti Silver',
    category: 'perak',
    lat: -7.8218,
    lng: 110.4028,
    description: 'Toko perak milik keluarga yang telah beroperasi turun-temurun. Menawarkan desain perhiasan perak kontemporer dan tradisional dengan harga terjangkau langsung dari pengrajin.',
    address: 'Purbayan, Kotagede, Yogyakarta',
    phone: '-',
    openHours: 'Senin - Sabtu: 08.30 - 17.00 WIB',
    image: '',
    tags: ['perak', 'kerajinan', 'silver', 'perhiasan']
  },

  // === KULINER ===
  {
    id: 10,
    name: 'Kopi Joss Kotagede',
    category: 'kuliner',
    lat: -7.8230,
    lng: 110.4040,
    description: 'Warung kopi legendaris yang menyajikan kopi joss — kopi yang diseduh dengan arang kayu bara melenting. Sensasi unik meminum kopi dengan arang panas menjadi daya tarik tersendiri bagi wisatawan.',
    address: 'Purbayan, Kotagede, Yogyakarta',
    phone: '-',
    openHours: 'Setiap hari: 16.00 - 23.00 WIB',
    image: '',
    tags: ['kopi', 'kuliner', 'tradisional', 'joss']
  },
  {
    id: 11,
    name: 'Warung Krecek Bu Tin',
    category: 'kuliner',
    lat: -7.8225,
    lng: 110.4018,
    description: 'Warung makan legendaris yang terkenal dengan menu krecek (kerupuk kulit sapi yang dimasak dengan bumbu pedas gurih). Hidangan khas Kotagede ini sangat populer di kalangan wisatawan.',
    address: 'Jl. Kemasan, Purbayan, Kotagede, Yogyakarta',
    phone: '-',
    openHours: 'Setiap hari: 08.00 - 15.00 WIB',
    image: '',
    tags: ['kuliner', 'krecek', 'tradisional', 'warung']
  },
  {
    id: 12,
    name: 'Sate Klatak Pak Bari',
    category: 'kuliner',
    lat: -7.8235,
    lng: 110.4042,
    description: 'Sate klatak khas Kotagede yang menggunakan jeruji besi sepeda sebagai tusukan. Daging kambing dipanggang di atas arang dengan bumbu garam saja, menghasilkan cita rasa yang otentik dan juicy.',
    address: 'Purbayan, Kotagede, Yogyakarta',
    phone: '-',
    openHours: 'Setiap hari: 17.00 - 22.00 WIB',
    image: '',
    tags: ['kuliner', 'sate', 'klatak', 'kambing']
  },
  {
    id: 13,
    name: 'Angkringan Kotagede',
    category: 'kuliner',
    lat: -7.8219,
    lng: 110.4022,
    description: 'Angkringan tradisional khas Yogyakarta dengan suasana malam Kotagede yang romantis. Menyajikan nasi kucing, gorengan, sate telur puyuh, dan wedang jahe.',
    address: 'Purbayan, Kotagede, Yogyakarta',
    phone: '-',
    openHours: 'Setiap hari: 17.00 - 24.00 WIB',
    image: '',
    tags: ['kuliner', 'angkringan', 'nasi kucing', 'tradisional']
  },
  {
    id: 14,
    name: 'Warung Bakpia Kotagede',
    category: 'kuliner',
    lat: -7.8212,
    lng: 110.4038,
    description: 'Produsen bakpia tradisional dengan isian kacang hijau, coklat, keju, dan kumbu hitam. Bakpia dibuat fresh setiap hari dan bisa dilihat proses pembuatannya.',
    address: 'Purbayan, Kotagede, Yogyakarta',
    phone: '-',
    openHours: 'Setiap hari: 07.00 - 20.00 WIB',
    image: '',
    tags: ['kuliner', 'bakpia', 'oleh-oleh', 'jajanan']
  },

  // === PENGINAPAN ===
  {
    id: 15,
    name: 'Omah Joglo Purbayan Homestay',
    category: 'penginapan',
    lat: -7.8224,
    lng: 110.4030,
    description: 'Homestay bernuansa tradisional Jawa yang terletak di rumah Joglo berusia ratusan tahun. Pengunjung bisa merasakan suasana tinggal di rumah tradisional Kotagede lengkap dengan sarapan masakan Jawa.',
    address: 'Kampung Purbayan, Kotagede, Yogyakarta',
    phone: '0812-XXXX-XXXX',
    openHours: 'Check-in: 14.00 | Check-out: 12.00',
    image: '',
    tags: ['penginapan', 'homestay', 'joglo', 'tradisional']
  },
  {
    id: 16,
    name: 'Guest House Kotagede Heritage',
    category: 'penginapan',
    lat: -7.8216,
    lng: 110.4020,
    description: 'Guest house modern dengan sentuhan heritage Kotagede. Menyediakan kamar nyaman dengan dekorasi gabungan Jawa kontemporer. Lokasi strategis dekat sentra perak dan kuliner.',
    address: 'Purbayan, Kotagede, Yogyakarta',
    phone: '0858-XXXX-XXXX',
    openHours: 'Check-in: 14.00 | Check-out: 12.00',
    image: '',
    tags: ['penginapan', 'guest house', 'modern', 'heritage']
  },

  // === SENI & BUDAYA ===
  {
    id: 17,
    name: 'Sanggar Tari & Karawitan Purbayan',
    category: 'senibudaya',
    lat: -7.8228,
    lng: 110.4012,
    description: 'Sanggar seni tradisional yang melestarikan tari-tarian klasik Jawa dan musik gamelan (karawitan). Pengunjung bisa melihat latihan atau pertunjukan tari dan belajar menari atau memainkan gamelan.',
    address: 'Purbayan, Kotagede, Yogyakarta',
    phone: '-',
    openHours: 'Latihan: Selasa & Sabtu 16.00 - 18.00 WIB',
    image: '',
    tags: ['seni', 'tari', 'karawitan', 'gamelan', 'budaya']
  },
  {
    id: 18,
    name: 'Gallery Batik Kotagede',
    category: 'senibudaya',
    lat: -7.8221,
    lng: 110.4048,
    description: 'Gallery yang menampilkan dan menjual batik tulis khas Kotagede dengan motif-motif unik heritage. Pengunjung juga bisa mengikuti workshop membatik langsung dari pembatik lokal.',
    address: 'Purbayan, Kotagede, Yogyakarta',
    phone: '-',
    openHours: 'Senin - Sabtu: 09.00 - 17.00 WIB',
    image: '',
    tags: ['seni', 'batik', 'gallery', 'workshop', 'kerajinan']
  },
  {
    id: 19,
    name: 'Perpustakaan Komunitas Purbayan',
    category: 'senibudaya',
    lat: -7.8233,
    lng: 110.4025,
    description: 'Perpustakaan komunitas yang dikelola warga dengan koleksi buku sejarah Kotagede, budaya Jawa, dan literatur umum. Ruang baca terbuka untuk umum.',
    address: 'Purbayan, Kotagede, Yogyakarta',
    phone: '-',
    openHours: 'Senin - Jumat: 09.00 - 16.00 WIB',
    image: '',
    tags: ['perpustakaan', 'budaya', 'komunitas', 'buku']
  },

  // === FASILITAS UMUM ===
  {
    id: 20,
    name: 'Balai Kampung Wisata Purbayan',
    category: 'fasilitas',
    lat: -7.8226,
    lng: 110.4026,
    description: 'Pusat informasi dan pengelolaan Kampung Wisata Purbayan. Pengunjung bisa mendapatkan peta wisata, informasi paket tur, dan panduan dari warga lokal.',
    address: 'Purbayan, Kotagede, Yogyakarta',
    phone: '-',
    openHours: 'Senin - Sabtu: 08.00 - 17.00 WIB',
    image: '',
    tags: ['informasi', 'balai', 'pusat', 'wisata']
  },
  {
    id: 21,
    name: 'Area Parkir Wisata Kotagede',
    category: 'fasilitas',
    lat: -7.8208,
    lng: 110.4015,
    description: 'Area parkir luas untuk kendaraan roda dua dan roda empat. Dijaga petugas parkir dan aman untuk menitipkan kendaraan selama berwisata di Kotagede.',
    address: 'Jl. Kemasan, Kotagede, Yogyakarta',
    phone: '-',
    openHours: 'Setiap hari: 06.00 - 22.00 WIB',
    image: '',
    tags: ['parkir', 'kendaraan', 'fasilitas']
  },
  {
    id: 22,
    name: 'Toilet Umum & Mushola',
    category: 'fasilitas',
    lat: -7.8229,
    lng: 110.4008,
    description: 'Fasilitas toilet umum dan mushola yang tersedia untuk pengunjung wisata. Lokasi bersih dan terawat.',
    address: 'Purbayan, Kotagede, Yogyakarta',
    phone: '-',
    openHours: 'Setiap hari',
    image: '',
    tags: ['toilet', 'mushola', 'fasilitas']
  }
];

// Initialize LOCATIONS
let LOCATIONS = DEFAULT_LOCATIONS;

// Try to load from LocalStorage
try {
  const savedData = localStorage.getItem('purbayan_locations');
  if (savedData) {
    LOCATIONS = JSON.parse(savedData);
  } else {
    // If no data, save default data to storage
    localStorage.setItem('purbayan_locations', JSON.stringify(DEFAULT_LOCATIONS));
  }
} catch (e) {
  console.error('Error loading data from LocalStorage:', e);
}

// === DATA MANAGEMENT FUNCTIONS (FOR ADMIN) ===

// Save current locations to LocalStorage
function saveLocations(data) {
  LOCATIONS = data;
  localStorage.setItem('purbayan_locations', JSON.stringify(LOCATIONS));
}

// Add new location
function addLocation(newLocation) {
  // Generate ID if missing
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
