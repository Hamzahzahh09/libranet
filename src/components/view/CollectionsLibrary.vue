<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import booksData from '@/data/buku.json'

// Ambil data buku dan batasi 4 item
const bookArray = Array.isArray(booksData) ? booksData : booksData.books
const collectionBook = ref(bookArray.slice(0, 4))

const searchQuery = ref('')
const filteredBooks = ref([...collectionBook.value])
const visibleBooks = ref(4)

const router = useRouter()

const navigateTo = (path) => {
  router.push(path)
}

// Fungsi pencarian
const searchBooks = () => {
  if (searchQuery.value.trim() === '') {
    filteredBooks.value = [...collectionBook.value]
  } else {
    filteredBooks.value = collectionBook.value.filter(book =>
      book.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }
}

// Fungsi "Lihat Selengkapnya"
const loadMore = () => {
  visibleBooks.value = Math.min(visibleBooks.value + 4, filteredBooks.value.length)
}

// Buku yang sedang tampil
const currentBooks = () => {
  return filteredBooks.value.slice(0, visibleBooks.value)
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

    <!-- Main Content -->
    <main class="py-8 container mx-auto px-4 max-w-7xl">
      <!-- Page Title -->
      <div class="text-center mb-8 relative">
        <h1 class="text-5xl font-bold mb-2">Koleksi</h1>
        <div class="w-48 h-1 bg-gradient-to-r from-green-400 to-blue-500 mx-auto"></div>
      </div>

      <!-- Search and Filter -->
      <div class="flex flex-col md:flex-row justify-between items-center mb-8 px-4">
        <span class="text-lg font-medium mb-4 md:mb-0">Koleksi kamu :</span>
        <div class="relative w-full md:w-64">
          <input
            v-model="searchQuery"
            @input="searchBooks"
            type="text"
            placeholder="Cari buku..."
            class="w-full pl-4 pr-10 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
          >
          <img
            src="https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-06-05/LyG3Uagnqe.png"
            alt="Search"
            class="absolute right-3 top-2.5 w-5 h-5"
          >
        </div>
      </div>

     <!-- Grid Buku -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
        <div
          v-for="(book, index) in currentBooks()"
          :key="'collection-' + index"
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
              <button class="text-blue-600 hover:text-blue-800 text-sm font-medium transition">
                Detail
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Load More Button -->
      <div class="text-center mt-8">
        <button
          @click="loadMore"
          v-if="visibleBooks < filteredBooks.length"
          class="bg-green-400 hover:bg-green-500 text-black font-medium py-2 px-6 rounded-lg transition-colors duration-300"
        >
          Lihat Selengkapnya
        </button>
      </div>
    </main>
  \
  </div>
</template>
