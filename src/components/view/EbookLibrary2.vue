<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router'

const router = useRouter()
const showAccountDropdown = ref(false)
const showMobileMenu = ref(false)
const isBookmarked = ref(false)
const isLiked = ref(false)
const likeCount = ref(245)
const showBackToTop = ref(false)
const currentPage = ref(2)

const navigateTo = (path) => {
  router.push(path)
  showMobileMenu.value = false
}

const handleLogout = () => {
  localStorage.removeItem('userProfileData')
  router.push('/login')
}

const toggleBookmark = () => {
  isBookmarked.value = !isBookmarked.value
}

const likeArticle = () => {
  isLiked.value = !isLiked.value
  likeCount.value += isLiked.value ? 1 : -1
}

const handleScroll = () => {
  showBackToTop.value = window.scrollY > 300
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

const changePage = (page) => {
  currentPage.value = page
  scrollToTop()
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <div class="min-h-screen bg-gray-50 font-sans">
    <!-- Modern Header with Dropdown -->
    <header class="sticky top-0 z-50 bg-white shadow-sm">
      <div class="container mx-auto px-4 sm:px-6 py-3">
        <div class="flex items-center justify-between">
          <!-- Logo -->
          <div @click="navigateTo('/library')" class="flex items-center space-x-2 cursor-pointer group">
            <img src="https://i.imgur.com/2Nat6V1.png" alt="Libranet Logo" class="w-10 h-10 transition-transform group-hover:scale-105">
            <span class="text-2xl font-bold text-blue-900 group-hover:text-blue-700 transition">Libranet</span>
          </div>

          <!-- Desktop Navigation -->
          <nav class="hidden md:flex items-center space-x-1">
            <router-link
              to="/library"
              class="px-4 py-2 rounded-lg font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all"
              active-class="text-blue-600 bg-blue-50 font-semibold"
              exact
            >
              Beranda
            </router-link>
            <router-link
              to="/pengumuman"
              class="px-4 py-2 rounded-lg font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all"
              active-class="text-blue-600 bg-blue-50 font-semibold"
            >
              Pengumuman
            </router-link>
            <router-link
              to="/collection"
              class="px-4 py-2 rounded-lg font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all"
              active-class="text-blue-600 bg-blue-50 font-semibold"
            >
              Koleksi
            </router-link>
            <router-link
              to="/populer"
              class="px-4 py-2 rounded-lg font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all"
              active-class="text-blue-600 bg-blue-50 font-semibold"
            >
              Populer
            </router-link>
          </nav>

          <!-- User Controls -->
          <div class="flex items-center space-x-4">
            <!-- Notification -->
            <button class="relative p-2 rounded-full hover:bg-gray-100 transition">
              <img src="https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-06-05/JzZcgNsGvt.png"
                   alt="Notification"
                   class="w-6 h-6">
              <span class="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full"></span>
            </button>

            <!-- User Dropdown -->
            <div class="relative">
              <button
                @click="showAccountDropdown = !showAccountDropdown"
                class="flex items-center space-x-1 p-2 rounded-lg hover:bg-gray-100 transition"
                aria-label="Account menu"
              >
                <span class="font-medium text-gray-700">Account</span>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </button>

              <!-- Dropdown Menu -->
              <transition
                enter-active-class="transition duration-100 ease-out"
                enter-from-class="transform scale-95 opacity-0"
                enter-to-class="transform scale-100 opacity-100"
                leave-active-class="transition duration-75 ease-in"
                leave-from-class="transform scale-100 opacity-100"
                leave-to-class="transform scale-95 opacity-0"
              >
                <div
                  v-if="showAccountDropdown"
                  class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50 border border-gray-100"
                  @click="showAccountDropdown = false"
                >
                  <router-link
                    to="/profile"
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
                    @click="showAccountDropdown = false"
                  >
                    Profil Saya
                  </router-link>
                  <router-link
                    to="/settings"
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
                    @click="showAccountDropdown = false"
                  >
                    Pengaturan
                  </router-link>
                  <button
                    @click="handleLogout"
                    class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition flex items-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Logout
                  </button>
                </div>
              </transition>
            </div>

            <!-- Mobile Menu Button -->
            <button
              @click="showMobileMenu = !showMobileMenu"
              class="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
              aria-label="Menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Mobile Menu -->
      <transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="transform -translate-y-4 opacity-0"
        enter-to-class="transform translate-y-0 opacity-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="transform translate-y-0 opacity-100"
        leave-to-class="transform -translate-y-4 opacity-0"
      >
        <div
          v-if="showMobileMenu"
          class="md:hidden bg-white border-t border-gray-200 shadow-sm"
        >
          <div class="container mx-auto px-4 py-3 space-y-2">
            <router-link
              to="/library"
              class="block px-4 py-3 rounded-lg font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition"
              active-class="text-blue-600 bg-blue-50 font-semibold"
              exact
              @click="showMobileMenu = false"
            >
              Beranda
            </router-link>
            <router-link
              to="/pengumuman"
              class="block px-4 py-3 rounded-lg font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition"
              active-class="text-blue-600 bg-blue-50 font-semibold"
              @click="showMobileMenu = false"
            >
              Pengumuman
            </router-link>
            <router-link
              to="/collection"
              class="block px-4 py-3 rounded-lg font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition"
              active-class="text-blue-600 bg-blue-50 font-semibold"
              @click="showMobileMenu = false"
            >
              Koleksi
            </router-link>
            <router-link
              to="/populer"
              class="block px-4 py-3 rounded-lg font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition"
              active-class="text-blue-600 bg-blue-50 font-semibold"
              @click="showMobileMenu = false"
            >
              Populer
            </router-link>
          </div>
        </div>
      </transition>
    </header>

    <!-- Main Content -->
    <main class="container mx-auto px-4 sm:px-6 py-8">
      <div class="bg-white rounded-xl shadow-sm overflow-hidden">
        <!-- Article Header -->
        <div class="p-6 sm:p-8 border-b border-gray-100">
          <div class="flex flex-col sm:flex-row justify-between items-start gap-6">
            <div class="flex-1">
              <div class="flex items-center space-x-4 mb-4">
                <span class="text-sm text-gray-500">Pengumuman</span>
                <span class="text-sm text-gray-500">•</span>
                <span class="text-sm text-gray-500">10 Juni 2025</span>
              </div>
              <h1 class="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-2">
                Bangun dari Kegagalan, Lari menuju Harapan
              </h1>
              <p class="text-gray-600">Ditulis oleh Admin Libranet</p>
            </div>
            <div class="flex items-center space-x-3">
              <button
                @click="toggleBookmark"
                class="p-2 rounded-full hover:bg-gray-100 transition"
                :aria-label="isBookmarked ? 'Hapus bookmark' : 'Tambahkan bookmark'"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" :class="isBookmarked ? 'text-yellow-500 fill-current' : 'text-gray-400'" viewBox="0 0 20 20" fill="none" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 5a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 19V5z" />
                </svg>
              </button>
              <button
                @click="likeArticle"
                class="p-2 rounded-full hover:bg-gray-100 transition"
                aria-label="Sukai artikel"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" :class="isLiked ? 'text-red-500 fill-current' : 'text-gray-400 fill-none'" viewBox="0 0 20 20" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span class="sr-only">Likes: {{ likeCount }}</span>
              </button>
              <span class="text-gray-700 font-medium" v-if="isLiked">{{ likeCount }}</span>
            </div>
          </div>
        </div>

        <!-- Article Content -->
        <article class="prose prose-lg max-w-none p-6 sm:p-8">
          <p class="text-gray-800 leading-relaxed mb-6">
            Kadang hidup tidak berjalan sesuai rencana. Kita sudah berusaha keras, berdoa siang dan malam, namun hasilnya tetap tidak seperti yang diharapkan. Mungkin gagal di ujian penting, tidak lolos seleksi beasiswa, ditolak dalam lomba, atau merasa tidak dihargai setelah bekerja keras. Saat itu terjadi, mudah sekali untuk merasa putus asa. Rasanya seperti dunia tidak adil, seperti semua usaha tidak berarti apa-apa.
          </p>

          <p class="text-gray-800 leading-relaxed mb-6">
            Namun di balik setiap kegagalan, selalu ada pelajaran. Kadang kita tidak menyadari bahwa kegagalan itu justru menjauhkan kita dari sesuatu yang buruk, dan mendekatkan kita pada sesuatu yang lebih baik. Gagal bukan berarti kamu tidak berbakat, tapi mungkin kamu sedang diarahkan ke jalan yang lebih tepat. Tuhan tahu kapan waktunya kamu berhasil, dan kapan waktunya kamu belajar.
Jangan takut gagal. Takutlah jika kamu tidak pernah mencoba. Karena orang yang tidak pernah mencoba, tidak akan pernah tahu sejauh mana kemampuannya. Keberanian bukan berarti tidak pernah takut, tapi tetap melangkah walau hati penuh keraguan.
          </p>

          <p class="text-gray-800 leading-relaxed mb-6">
            Banyak tokoh besar di dunia yang mengalami kegagalan berulang kali. Tapi mereka tidak menyerah. Mereka belajar, bangkit, dan mencoba lagi. Mereka percaya bahwa nilai dari seseorang tidak ditentukan oleh hasil satu kali ujian, satu kali kegagalan, atau satu kali penolakan. Nilai seseorang ditentukan oleh seberapa besar ia mau belajar dari kesalahan, dan seberapa kuat ia bertahan ketika keadaannya sulit.
          </p>

          <p class="text-gray-800 leading-relaxed mb-6">
            Kamu pun bisa menjadi seperti itu. Mungkin sekarang kamu masih merasa kecil, belum yakin dengan masa depanmu, atau merasa tertinggal dari orang lain. Tapi ingat, setiap orang punya waktunya masing-masing. Hidup bukan perlombaan siapa yang lebih cepat, tapi tentang siapa yang tetap bertahan sampai akhir.
Terus asah dirimu. Belajar, gagal, coba lagi, dan terus melangkah. Mimpi bukan hanya milik mereka yang pintar atau punya uang. Mimpi adalah milik mereka yang tidak menyerah.
          </p>
        </article>

        <!-- Article Footer -->
        <div class="p-6 sm:p-8 border-t border-gray-100">
          <div class="flex flex-col sm:flex-row justify-between items-center gap-4">
            <!-- Social Sharing -->
            <div class="flex items-center space-x-3">
              <span class="text-gray-700 font-medium">Bagikan:</span>
              <button class="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </button>
              <button class="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </button>
              <button class="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </button>
            </div>

            <!-- Pagination -->
            <div class="flex items-center space-x-2 bg-white rounded-lg px-4 py-2 shadow-sm">
              <span class="text-gray-700">Halaman:</span>
              <button
                @click="changePage(1)"
                class="w-9 h-9 flex items-center justify-center rounded-full font-medium transition"
                :class="currentPage === 1 ? 'bg-green-400 text-white' : 'border border-green-400 text-gray-600 hover:bg-gray-100'"
              ><a href="/baca">
                1</a>
              </button>
              <button
                @click="changePage(2)"
                class="w-9 h-9 flex items-center justify-center rounded-full font-medium transition"
                :class="currentPage === 2 ? 'bg-green-400 text-white' : 'border border-green-400 text-gray-600 hover:bg-gray-100'"
              ><a href="/baca/2">
                2</a>
              </button>
              <button
                @click="changePage(156)"
                class="w-9 h-9 flex items-center justify-center rounded-full font-medium transition"
                :class="currentPage === 156 ? 'bg-green-400 text-white' : 'border border-green-400 text-gray-600 hover:bg-gray-100'"
              >
                156
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Back to Top Button -->
    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="transform opacity-0 scale-90"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-90"
    >
      <button
        v-if="showBackToTop"
        @click="scrollToTop"
        class="fixed bottom-6 right-6 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-all"
        aria-label="Kembali ke atas"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </transition>
  </div>
</template>

<style>
/* Custom prose styles for article content */
.prose {
  color: #374151;
}

.prose p {
  margin-bottom: 1.5rem;
  line-height: 1.7;
}

/* Smooth transitions for interactive elements */
button, a {
  transition: all 0.2s ease;
}

/* Focus styles for accessibility */
button:focus, a:focus {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

/* Active nav link indicator */
.router-link-active {
  position: relative;
}

.router-link-active:after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 50%;
  transform: translateX(-50%);
  width: 20px;
  height: 3px;
  background-color: #3b82f6;
  border-radius: 3px;
}
</style>
