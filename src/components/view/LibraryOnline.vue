<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import booksData from '@/data/buku.json'


const router = useRouter()
const bookArray = Array.isArray(booksData) ? booksData : booksData.books
const popularBooks = ref(bookArray.slice(0, 12))
const searchQuery = ref('')
const selectedCategory = ref('kategori')
const showDropdown = ref(false)

const categories = [
  'Semua Kategori',
  'Fiksi',
  'Non-Fiksi',
  'Sains',
  'Teknologi',
  'Sejarah',
  'Bisnis'
]

const navigateTo = (path) => {
  router.push(path)
}

const selectCategory = (category) => {
  selectedCategory.value = category
  showDropdown.value = false
  // Tambahkan logika filter berdasarkan kategori
}

const searchBooks = () => {
  if (searchQuery.value.trim()) {
    console.log('Mencari:', searchQuery.value)
    // Implementasi pencarian sebenarnya
  }
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 font-sans">
    <!-- Header yang lebih modern -->
    <header class="sticky top-0 z-50 bg-white shadow-md">
      <div class="container mx-auto px-6 py-4 flex justify-between items-center">
        <div class="flex items-center space-x-3 cursor-pointer" @click="navigateTo('/')">
          <img src="https://i.imgur.com/2Nat6V1.png" alt="Libranet Logo" class="w-10 h-10">
          <span class="text-2xl font-semibold text-blue-900">Libranet</span>
        </div>

        <nav class="hidden md:flex space-x-8">
          <router-link
            to="/library"
            class="text-lg font-semibold text-gray-700 hover:text-blue-600 transition relative py-2"
            active-class="text-blue-600 font-bold"
            exact
          >
            Beranda
            <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
          </router-link>
          <router-link
            to="/pengumuman"
            class="text-lg font-semibold text-gray-700 hover:text-blue-600 transition relative py-2"
            active-class="text-blue-600 font-bold"
          >
            Pengumuman
          </router-link>
          <router-link
            to="/collection"
            class="text-lg font-semibold text-gray-700 hover:text-blue-600 transition relative py-2"
            active-class="text-blue-600 font-bold"
          >
            Koleksi
          </router-link>
          <router-link
            to="/populer"
            class="text-lg font-semibold text-gray-700 hover:text-blue-600 transition relative py-2"
            active-class="text-blue-600 font-bold"
          >
            Populer
          </router-link>
        </nav>

        <div class="flex items-center space-x-6">
          <div class="relative">
            <img
              src="https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-06-05/JzZcgNsGvt.png"
              alt="Notification"
              class="w-9 h-9 rounded-full cursor-pointer hover:opacity-80 transition"
            >
            <span class="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full"></span>
          </div>
          <div class="flex items-center space-x-2 cursor-pointer group">
            <span class="text-lg font-semibold text-gray-700 group-hover:text-blue-600 transition">Account</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500 group-hover:text-blue-600 transition" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </div>
        </div>
      </div>
    </header>

    <!-- Hero Section dengan animasi lebih halus -->
    <section class="container mx-auto px-6 py-16">
      <div class="flex flex-col md:flex-row items-center gap-8">
        <div class="md:w-1/2 text-center md:text-left mb-10 md:mb-0">
          <h1 class="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Selamat Datang di <br>
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-900">Libranet</span> <br>
            <span class="text-gray-800">Gerbang Dunia Tanpa Batas!</span>
          </h1>
          <div class="w-32 h-1 bg-gradient-to-r from-green-400 to-blue-500 my-6 mx-auto md:mx-0 rounded-full"></div>
          <p class="text-xl text-gray-700 mb-8">
            Temukan koleksi buku-buku terbaik yang kamu inginkan di Libranet
          </p>
          <button
            @click="navigateTo('/collection')"
            class="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg shadow-lg hover:shadow-xl transition-all hover:scale-105 transform"
          >
            Jelajahi Koleksi
          </button>
        </div>
        <div class="md:w-1/2 flex justify-center">
          <div class="relative">
            <img
              src="https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-06-05/gjUTOSMU1A.png"
              alt="Reading illustration"
              class="w-full max-w-md transform transition duration-500 hover:scale-105"
            >
            <div class="absolute -bottom-6 -left-6 w-32 h-32 bg-blue-100 rounded-full -z-10"></div>
            <div class="absolute -top-6 -right-6 w-24 h-24 bg-green-100 rounded-full -z-10"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Search Section dengan efek lebih interaktif -->
    <section class="container mx-auto px-6 py-8 text-center bg-white rounded-xl shadow-sm md:mx-auto max-w-5xl">
      <h2 class="text-2xl md:text-3xl font-semibold mb-6 text-gray-800">Temukan Buku Yang Kamu Mau Di Sini</h2>
      <div class="flex flex-col md:flex-row justify-center items-center gap-4 max-w-3xl mx-auto">
        <div class="relative w-full md:w-auto">
          <button
            @click="showDropdown = !showDropdown"
            class="w-full md:w-48 h-12 pl-4 pr-10 rounded-lg border border-gray-300 bg-green-400 hover:bg-green-500 text-gray-700 appearance-none focus:outline-none focus:ring-2 focus:ring-green-500 flex items-center justify-between transition"
          >
            <span>{{ selectedCategory }}</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </button>

          <!-- Dropdown Kategori -->
          <div
            v-if="showDropdown"
            class="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200"
          >
            <div
              v-for="(category, index) in categories"
              :key="index"
              class="px-4 py-3 hover:bg-gray-100 cursor-pointer transition"
              @click="selectCategory(category)"
            >
              {{ category }}
            </div>
          </div>
        </div>

        <div class="relative w-full">
          <input
            type="text"
            v-model="searchQuery"
            @keyup.enter="searchBooks"
            placeholder="Cari buku atau penulis..."
            class="w-full h-12 pl-4 pr-12 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          >
          <button
            @click="searchBooks"
            class="absolute right-3 top-3 w-6 h-6 text-gray-500 hover:text-blue-600 transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>
      </div>
    </section>

    <!-- Popular Books dengan card lebih menarik -->
    <section class="py-12 bg-gradient-to-b from-white to-gray-50">
      <div class="container mx-auto px-6">
        <div class="flex justify-between items-center mb-8">
          <h2 class="text-3xl font-semibold text-gray-800">
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-blue-600">Buku Terpopuler</span>
          </h2>
          <router-link
            to="/populer"
            class="text-blue-600 hover:text-blue-800 font-medium flex items-center transition"
          >
            Lihat Semua
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
            </svg>
          </router-link>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div
            v-for="(book, index) in popularBooks"
            :key="'popular-' + index"
            class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group"
          >
            <div class="h-56 relative overflow-hidden">
              <img
                :src="book.image"
                :alt="book.title"
                class="w-full h-full object-cover transition duration-500 group-hover:scale-105"
              >
              <div class="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm rounded-xl px-3 py-1 flex items-center shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-yellow-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span class="text-sm font-medium text-gray-700">{{ book.rating }}/5</span>
              </div>
            </div>
            <div class="p-5">
              <h3 class="font-semibold text-lg text-gray-800 mb-2 line-clamp-1">{{ book.title }}</h3>
              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-500">{{ book.borrowed }} halaman</span>
                <router-link
                  :to="`/detail/${book.id}`"
                  class="text-blue-600 hover:text-blue-800 text-sm font-medium transition"
                >
                  Detail
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>


    <!-- Visit Section dengan peta interaktif -->
    <section class="bg-gradient-to-r from-green-400 to-green-500 py-16">
      <div class="container mx-auto px-6">
        <div class="flex flex-col lg:flex-row items-center gap-12">
          <div class="lg:w-1/2 space-y-8 text-white">
            <div>
              <h2 class="text-3xl font-bold mb-4">Kunjungi Perpustakaan Kami</h2>
              <p class="text-lg opacity-90">
                Nikmati pengalaman membaca yang lebih lengkap dengan mengunjungi perpustakaan fisik kami.
              </p>
            </div>

            <div class="space-y-6">
              <div class="flex items-start gap-4">
                <div class="p-2 bg-white bg-opacity-20 rounded-full flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map-pin-icon lucide-map-pin"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 class="text-xl font-semibold mb-1">Lokasi</h3>
                  <p class="opacity-90">Gedung Perpustakaan Utama, Kampus Universitas<br>Jl. Pendidikan No.1, Jakarta</p>
                </div>
              </div>

              <div class="flex items-start gap-4">
                <div class="p-2 bg-white bg-opacity-20 rounded-full flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 class="text-xl font-semibold mb-1">Jam Operasional</h3>
                  <p class="opacity-90">
                    Senin - Jumat: 08:00-20:00 WIB<br>
                    Sabtu: 09:00-15:00 WIB<br>
                    Minggu & Hari Libur: Tutup
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div class="lg:w-1/2 w-full h-full">
            <div class="rounded-xl overflow-hidden shadow-2xl border-4 border-white transform hover:scale-[1.02] transition duration-300">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d507306.1253930919!2d106.58456265848326!3d-6.605963867456011!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69ec10986385bd%3A0x55d55a1ef45cd0af!2sPerpustakaan%20Universitas%20Indonesia!5e0!3m2!1sid!2sid!4v1749357215541!5m2!1sid!2sid"
                class="w-full h-96 lg:h-[350px]"
                style="border:0;"
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer yang lebih elegan -->
    <footer class="bg-gradient-to-b from-green-700 to-green-800 text-white pt-16 pb-8">
      <div class="container mx-auto px-6">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div class="space-y-4">
            <div class="flex items-center gap-3">
              <img src="https://i.imgur.com/2Nat6V1.png" alt="Libranet Logo" class="w-10 h-10">
              <span class="text-2xl font-bold">Libranet</span>
            </div>
            <p class="text-green-100">
              Menyediakan akses ke pengetahuan dan informasi untuk semua kalangan.
            </p>
            <div class="flex gap-4 pt-2">
              <a href="#" class="text-green-100 hover:text-white transition p-2 bg-white/10 rounded-full hover:bg-white/20">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                </svg>
              </a>
              <a href="#" class="text-green-100 hover:text-white transition p-2 bg-white/10 rounded-full hover:bg-white/20">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a href="#" class="text-green-100 hover:text-white transition p-2 bg-white/10 rounded-full hover:bg-white/20">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h3 class="text-xl font-bold mb-6 text-green-200">Tautan Cepat</h3>
            <ul class="space-y-3">
              <li>
                <router-link
                  to="/"
                  class="text-green-100 hover:text-white transition-colors duration-300 flex items-center group"
                >
                  <span class="w-1 h-1 bg-green-100 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition"></span>
                  Beranda
                </router-link>
              </li>
              <li>
                <router-link
                  to="/pengumuman"
                  class="text-green-100 hover:text-white transition-colors duration-300 flex items-center group"
                >
                  <span class="w-1 h-1 bg-green-100 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition"></span>
                  Pengumuman
                </router-link>
              </li>
              <li>
                <router-link
                  to="/collection"
                  class="text-green-100 hover:text-white transition-colors duration-300 flex items-center group"
                >
                  <span class="w-1 h-1 bg-green-100 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition"></span>
                  Koleksi
                </router-link>
              </li>
              <li>
                <router-link
                  to="/populer"
                  class="text-green-100 hover:text-white transition-colors duration-300 flex items-center group"
                >
                  <span class="w-1 h-1 bg-green-100 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition"></span>
                  Populer
                </router-link>
              </li>
            </ul>
          </div>

          <div>
            <h3 class="text-xl font-bold mb-6 text-green-200">Layanan</h3>
            <ul class="space-y-3">
              <li>
                <router-link
                  to="/ebook"
                  class="text-green-100 hover:text-white transition-colors duration-300 flex items-center group"
                >
                  <span class="w-1 h-1 bg-green-100 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition"></span>
                  E-Book
                </router-link>
              </li>
              <li>
                <router-link
                  to="/peminjaman"
                  class="text-green-100 hover:text-white transition-colors duration-300 flex items-center group"
                >
                  <span class="w-1 h-1 bg-green-100 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition"></span>
                  Peminjaman
                </router-link>
              </li>
              <li>
                <router-link
                  to="/keanggotaan"
                  class="text-green-100 hover:text-white transition-colors duration-300 flex items-center group"
                >
                  <span class="w-1 h-1 bg-green-100 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition"></span>
                  Keanggotaan
                </router-link>
              </li>
              <li>
                <router-link
                  to="/bantuan"
                  class="text-green-100 hover:text-white transition-colors duration-300 flex items-center group"
                >
                  <span class="w-1 h-1 bg-green-100 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition"></span>
                  Bantuan
                </router-link>
              </li>
            </ul>
          </div>

          <div>
            <h3 class="text-xl font-bold mb-6 text-green-200">Hubungi Kami</h3>
            <ul class="space-y-4">
              <li class="flex items-start gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mt-0.5 flex-shrink-0 text-green-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <div>
                  <p class="text-green-100">+62 857 1646 9544</p>
                  <p class="text-green-100">+62 856 1944 8607</p>
                </div>
              </li>
              <li class="flex items-start gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mt-0.5 flex-shrink-0 text-green-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span class="text-green-100">info@libranet.ac.id</span>
              </li>
              <li class="flex items-start gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mt-0.5 flex-shrink-0 text-green-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span class="text-green-100">Gedung Perpustakaan Utama<br>Kampus Universitas<br>Jl. Pendidikan No.1</span>
              </li>
            </ul>
          </div>
        </div>

        <div class="border-t border-green-600 mt-12 pt-8 text-center text-green-100">
          <p>© 2023 Libranet. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
</template>
