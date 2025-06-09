<script setup>
import { ref, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import bukuData from '../../data/buku.json';

const router = useRouter();
const route = useRoute();

// Ambil id dari route params
const bookId = computed(() => Number(route.params.id));

// Cari buku yang sesuai
const book = computed(() => {
  return bukuData.books.find(b => b.id === bookId.value);
});

// State untuk interaktivitas
const hoverRating = ref(0);
const showFullSynopsis = ref(false);
const isInCollection = ref(false);
const showPreview = ref(false);

// Sinopsis text (bisa diubah sesuai kebutuhan)
const fullSynopsis = `Jurus Jitu Mengelola Emosi adalah buku pengembangan diri yang membahas cara memahami, menerima, dan mengelola emosi secara bijak. Buku ini mengajak pembaca untuk mengenali berbagai jenis emosi negatif seperti marah, cemas, dan sedih, serta memberikan strategi praktis untuk mengendalikannya tanpa menekannya. Dengan gaya bahasa yang ringan dan mudah dipahami, buku ini memadukan pendekatan psikologis dan nilai-nilai spiritual yang relevan dalam kehidupan sehari-hari. Penulis menyertakan berbagai kisah reflektif, studi kasus, dan latihan sederhana agar pembaca bisa langsung mempraktikkannya. Melalui buku ini, pembaca diajak untuk tidak menjadi budak emosi, melainkan menjadikan emosi sebagai kompas dalam berpikir dan bertindak. Buku ini cocok untuk siapa saja yang ingin lebih sabar, tenang, dan berdaya dalam menghadapi tekanan hidup. Seiring berjalannya waktu, pembaca akan menyadari bahwa ketenangan bukan datang dari luar, melainkan dari pemahaman mendalam terhadap diri sendiri. Jurus Jitu Mengelola Emosi bukan sekadar bacaan, tapi panduan hidup yang membantu kita menjadi pribadi yang lebih matang dan kuat secara emosional.`;
const shortSynopsis = fullSynopsis.substring(0, 150) + '...';

const getStarImage = (index) => {
  const rating = hoverRating.value || (book.value ? book.value.rating : 0);
  const starValue = index + 1;
  return starValue <= Math.floor(rating)
    ? 'https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-06-09/bSfmqXJ5LX.png'
    : starValue - 0.5 <= rating
      ? 'https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-06-09/dn1wwaksTX.png'
      : 'https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-06-09/PFnT5yBF8b.png';
};

const navigateTo = (path) => {
  router.push(path)
}

const rateBook = (rating) => {
  console.log('Memberi rating:', rating);
};

const openBookPreview = () => {
  showPreview.value = true;
};

const readNow = () => {
  console.log('Membaca buku sekarang');
};

const addToCollection = () => {
  isInCollection.value = !isInCollection.value;
};
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="sticky top-0 z-50 bg-white shadow-md">
      <div class="container mx-auto px-6 py-4 flex justify-between items-center">
        <div class="flex items-center space-x-3 cursor-pointer" @click="navigateTo('/')">
          <img src="https://i.imgur.com/2Nat6V1.png" alt="Libranet Logo" class="w-10 h-10">
          <span class="text-2xl font-semibold text-blue-900">Libranet</span>
        </div>

        <nav class="hidden md:flex space-x-8">
          <router-link to="/library"
            class="text-lg font-semibold text-gray-700 hover:text-blue-600 transition relative py-2"
            active-class="text-blue-600 font-bold" exact>
            Beranda
            <span
              class="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
          </router-link>
          <router-link to="/pengumuman"
            class="text-lg font-semibold text-gray-700 hover:text-blue-600 transition relative py-2"
            active-class="text-blue-600 font-bold">
            Pengumuman
          </router-link>
          <router-link to="/collection"
            class="text-lg font-semibold text-gray-700 hover:text-blue-600 transition relative py-2"
            active-class="text-blue-600 font-bold">
            Koleksi
          </router-link>
          <router-link to="/populer"
            class="text-lg font-semibold text-gray-700 hover:text-blue-600 transition relative py-2"
            active-class="text-blue-600 font-bold">
            Populer
          </router-link>
        </nav>

        <div class="flex items-center space-x-6">
          <div class="relative">
            <img src="https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-06-05/JzZcgNsGvt.png" alt="Notification"
              class="w-9 h-9 rounded-full cursor-pointer hover:opacity-80 transition">
            <span class="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full"></span>
          </div>
          <div class="flex items-center space-x-2 cursor-pointer group">
            <span class="text-lg font-semibold text-gray-700 group-hover:text-blue-600 transition">Account</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500 group-hover:text-blue-600 transition"
              viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clip-rule="evenodd" />
            </svg>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="container mx-auto px-4 py-8">
      <div v-if="book" class="bg-white rounded-xl shadow-md overflow-hidden p-6">
        <div class="flex flex-col md:flex-row gap-8">
          <!-- Book Cover -->
          <div class="w-full md:w-1/3 flex flex-col items-center">
            <img :src="book.image" :alt="book.title"
              class="w-full max-w-xs rounded-lg shadow-md cursor-pointer hover:scale-[1.02] transition-transform"
              @click="openBookPreview">

            <!-- Rating -->
            <div class="mt-6 flex items-center">
              <div class="flex mr-2">
                <div v-for="(star, index) in 5" :key="index"
                  class="w-5 h-5 bg-cover bg-no-repeat cursor-pointer hover:scale-110 transition-transform"
                  :style="{ backgroundImage: `url(${getStarImage(index)})` }" @mouseover="hoverRating = index + 1"
                  @mouseleave="hoverRating = 0" @click="rateBook(index + 1)">
                </div>
              </div>
              <span class="text-lg font-medium text-gray-700">
                {{ hoverRating || book.rating }}
              </span>
            </div>
          </div>

          <!-- Book Details -->
          <div class="w-full md:w-2/3">
            <h1 class="text-3xl font-bold text-gray-800 mb-4">{{ book.title }}</h1>
            <h2 class="text-xl text-gray-600 mb-6">Buku Pengembangan Diri</h2>

            <!-- Metadata -->
            <div class="flex flex-col gap-3 text-gray-700 mb-6">
              <div class="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pen-icon lucide-pen"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/></svg>
                <span class="text-sm p-2">{{ book.author }}</span>
              </div>
              <div class="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-book-icon lucide-book"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"/></svg>
                <span class="text-sm p-2">Tersedia 5 Eksemplar</span>
              </div>
              <div class="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user-round-icon lucide-user-round"><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/></svg>
                <span class="text-sm p-2">{{ book.borrowed }} Pembaca</span>
              </div>
            </div>

            <!-- Synopsis -->
            <div class="mb-8">
              <h3 class="text-lg font-semibold text-gray-800 mb-2">{{ book.Sinopsis }}</h3>
              <p class="text-gray-700 leading-relaxed">
                {{ showFullSynopsis ? fullSynopsis : shortSynopsis }}
                <span class="text-blue-600 cursor-pointer hover:underline ml-1"
                  @click="showFullSynopsis = !showFullSynopsis">
                  {{ showFullSynopsis ? 'Lebih Sedikit' : 'Lebih Banyak' }}
                </span>
              </p>
            </div>

            <!-- Action Buttons -->
            <div class="flex flex-wrap gap-4 mt-8">
              <button @click="readNow"
                class="px-6 py-3 bg-green-400 hover:bg-green-500 text-white font-medium rounded-lg transition-colors shadow-md hover:shadow-lg">
                Baca Sekarang
              </button>

              <button @click="addToCollection"
                class="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-lg transition-colors">
                {{ isInCollection ? '✓ Dalam Koleksi' : '+ Tambah ke Koleksi' }}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="text-center py-20 text-gray-500 text-xl">
        Buku tidak ditemukan.
      </div>
    </main>

    <!-- Book Preview Modal -->
    <div v-if="showPreview" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100]"
      @click.self="showPreview = false">
      <div class="bg-white p-6 rounded-lg max-w-4xl w-full mx-4 relative">
        <button class="absolute top-4 right-4 text-3xl text-gray-500 hover:text-red-500 transition-colors"
          @click="showPreview = false">
          &times;
        </button>
        <img :src="book.image" :alt="book.title"
          class="w-full h-auto max-h-[80vh] object-contain">
      </div>
    </div>
  </div>
</template>
