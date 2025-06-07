<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import booksData from '@/data/buku.json'

const router = useRouter()
const bookArray = Array.isArray(booksData) ? booksData : booksData.books
const popularBooks = ref(bookArray.slice(0, 4)) // Show first 4 books as popular
const newBooks = ref(bookArray.filter((book) => book.isNew).slice(0, 4)) // Show first 4 new books

const navigateTo = (path) => {
  router.push(path)
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 font-sans">
    <!-- Header -->
    <header class="sticky top-0 z-50 bg-white shadow-md">
      <div class="container mx-auto px-6 py-4 flex justify-between items-center">
        <div class="flex items-center space-x-3 cursor-pointer" @click="navigateTo('/')">
          <img src="https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-06-05/UgVLgrqrgd.png" alt="Libranet Logo"
            class="w-10 h-10">
          <span class="text-2xl font-semibold text-blue-900">Libranet</span>
        </div>

        <nav class="hidden md:flex space-x-8">
          <router-link to="/" class="text-lg font-semibold hover:text-blue-600 transition" active-class="text-blue-600"
            exact>Beranda</router-link>
          <router-link to="/pengumuman" class="text-lg font-semibold hover:text-blue-600 transition"
            active-class="text-blue-600">Pengumuman</router-link>
          <router-link to="/koleksi" class="text-lg font-semibold hover:text-blue-600 transition"
            active-class="text-blue-600">Koleksi</router-link>
          <router-link to="/populer" class="text-lg font-semibold hover:text-blue-600 transition"
            active-class="text-blue-600">Populer</router-link>
        </nav>

        <div class="flex items-center space-x-6">
          <img src="https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-06-05/JzZcgNsGvt.png" alt="Notification"
            class="w-9 h-9 rounded-full cursor-pointer">
          <span class="text-lg font-semibold cursor-pointer">Account</span>
        </div>
      </div>
    </header>

    <!-- Hero Section -->
    <section class="container mx-auto px-6 py-16">
      <div class="flex flex-col md:flex-row items-center">
        <div class="md:w-1/2 text-center md:text-left mb-10 md:mb-0">
          <h1 class="text-4xl font-bold mb-4">
            Selamat Datang di <br>
            <span class="text-blue-900">- Libranet -</span> <br>
            Gerbang Dunia Tanpa Batas!
          </h1>
          <div class="w-full h-1 bg-gradient-to-r from-green-400 to-blue-500 my-6"></div>
          <p class="text-xl text-gray-700">
            Di sini kamu bisa melihat koleksi<br>
            buku-buku yang kamu inginkan<br>
            di libranet
          </p>
        </div>
        <div class="md:w-1/2 flex justify-center">
          <img src="https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-06-05/gjUTOSMU1A.png"
            alt="Reading illustration" class="w-full max-w-md">
        </div>
      </div>
    </section>

    <!-- Search Section -->
    <section class="container mx-auto px-6 py-8 text-center">
      <h2 class="text-2xl font-semibold mb-6">Temukan Buku Yang Kamu Mau Di Sini</h2>
      <div class="flex flex-col md:flex-row justify-center items-center gap-4 max-w-3xl mx-auto">
        <div class="relative w-full md:w-auto">
          <select
            class="w-full md:w-40 h-12 pl-4 pr-10 rounded-lg border border-gray-300 bg-green-400 text-gray-700 appearance-none focus:outline-none focus:ring-2 focus:ring-green-500">
            <option>kategori</option>
            <option>Fiksi</option>
            <option>Non-Fiksi</option>
            <option>Sains</option>
            <option>Sejarah</option>
          </select>
          <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <img src="https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-06-05/bVQXs6oshJ.png" alt="Dropdown icon"
              class="w-5 h-5">
          </div>
        </div>
        <div class="relative w-full">
          <input type="text" placeholder="cari buku atau penulis"
            class="w-full h-12 pl-4 pr-12 rounded-lg border border-gray-300 bg-white bg-opacity-30 focus:outline-none focus:ring-2 focus:ring-blue-500">
          <img src="https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-06-05/h2oEWgtN08.png" alt="Search icon"
            class="absolute right-3 top-3 w-6 h-6">
        </div>
      </div>
    </section>

    <!-- Popular Books -->
    <section class="bg-gray-50 py-12">
      <div class="container mx-auto px-6">
        <h2 class="text-3xl font-semibold text-green-400 mb-8 ml-4">Terpopuler</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          <div v-for="(book, index) in popularBooks" :key="'popular-' + index"
            class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
            <div class="h-48 relative">
              <img :src="book.image" :alt="book.title" class="w-full h-full object-cover">
              <div class="absolute bottom-2 left-2 bg-green-400 rounded-xl px-3 py-1 flex items-center">
                <img src="https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-06-05/oCHiL45Cqi.png" alt="Star icon"
                  class="w-4 h-4 mr-1">
                <span class="text-sm text-gray-600">{{ book.rating }}/5</span>
              </div>
            </div>
            <div class="p-4">
              <h3 class="font-medium text-lg capitalize">{{ book.title }}</h3>
              <p class="text-sm text-gray-500 mt-2">{{ book.pages }} halaman</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- New Books -->
    <section class="bg-gray-50 py-12">
      <div class="container mx-auto px-6">
        <h2 class="text-3xl font-semibold text-green-400 mb-8 ml-4">Terbaru</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          <div v-for="(book, index) in newBooks" :key="'new-' + index"
            class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
            <div class="h-48 relative">
              <img :src="book.image" :alt="book.title" class="w-full h-full object-cover">
              <div class="absolute bottom-2 left-2 bg-green-400 rounded-xl px-3 py-1 flex items-center">
                <img src="https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-06-05/oCHiL45Cqi.png" alt="Star icon"
                  class="w-4 h-4 mr-1">
                <span class="text-sm text-gray-600">{{ book.rating }}/5</span>
              </div>
            </div>
            <div class="p-4">
              <h3 class="font-medium text-lg capitalize">{{ book.title }}</h3>
              <p class="text-sm text-gray-500 mt-2">{{ book.pages }} halaman</p>
            </div>
          </div>
        </div>
      </div>
    </section>

   <!-- Visit Section -->
<section class="bg-green-400 py-16">
  <div class="container mx-auto px-6 flex flex-col md:flex-row items-center">
    <div class="md:w-1/2 mb-10 md:mb-0">
      <h2 class="text-2xl font-semibold mb-6">Kunjungi Perpustakaan Kami</h2>
      <p class="mb-8">
        Nikmati pengalaman membaca yang lebih lengkap dengan mengunjungi perpustakaan fisik kami.
      </p>

      <div class="flex items-start mb-6">
        <img src="https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-06-05/tb1GkOeHLS.png" alt="Location icon"
          class="w-6 h-6 mr-2 mt-1">
        <div>
          <h3 class="font-semibold text-lg mb-1">Lokasi</h3>
          <p>Gedung Perpustakaan Utama, Kampus Universitas, Jl. Pendidikan No.1</p>
        </div>
      </div>

      <div class="flex items-start">
        <img src="https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-06-05/V8ZADTMaez.png" alt="Clock icon"
          class="w-6 h-6 mr-2 mt-1">
        <div>
          <h3 class="font-semibold text-lg mb-1">Jam Operasional</h3>
          <p>Senin - Jumat: 08:00-20:00 WIB<br>Sabtu: 09-15:00 WIB</p>
        </div>
      </div>
    </div>

    <div class="md:w-1/2 flex justify-center">
      <img src="https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-06-05/uoNoO30.png" alt="Library Illustration"
        class="w-full max-w-sm">
    </div>
  </div>
</section>
</div>

<!-- Footer -->
<footer class="bg-green-500 text-white py-12">
  <div class="container mx-auto px-6">
    <div class="flex flex-col md:flex-row justify-between mb-10">
      <div class="mb-6 md:mb-0">
        <div class="flex items-center space-x-3 mb-4">
          <span class="text-2xl font-semibold">Libranet</span>
        </div>
        <p class="max-w-xs">
          Menyediakan akses ke pengetahuan dan informasi untuk semua kalangan.
        </p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-3 gap-8">
        <div>
          <h3 class="text-xl font-semibold mb-4">Tautan Cepat</h3>
          <ul class="space-y-2">
            <li><a href="#" class="hover:text-green-300 transition">Beranda</a></li>
            <li><a href="#" class="hover:text-green-300 transition">Pengumuman</a></li>
            <li><a href="#" class="hover:text-green-300 transition">Koleksi</a></li>
            <li><a href="#" class="hover:text-green-300 transition">Populer</a></li>
          </ul>
        </div>

        <div>
          <h3 class="text-xl font-semibold mb-4">Layanan</h3>
          <ul class="space-y-2">
            <li><a href="#" class="hover:text-green-300 transition">E-Book</a></li>
            <li><a href="#" class="hover:text-green-300 transition">Cari Koleksi</a></li>
            <li><a href="#" class="hover:text-green-300 transition">Peminjaman</a></li>
            <li><a href="#" class="hover:text-green-300 transition">Keanggotaan</a></li>
          </ul>
        </div>

        <div>
          <h3 class="text-xl font-semibold mb-4">Kontak</h3>
          <ul class="space-y-2">
            <li>+62 85716469544</li>
            <li>+62 85619448607</li>
            <li>hamzzahh@gmail.com</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</footer>
</template>
