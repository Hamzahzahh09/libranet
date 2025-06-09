<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const books = ref([
  {
    id: 1,
    title: "Jurus Jitu Mengelola Emosi",
    pages: 156,
    rating: 4.9,
    cover: "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-06-05/woinEM9hOM.png",
    starIcon: "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-06-05/fecvQDFOfP.png"
  },
  {
    id: 2,
    title: "A Thousand Splendid Suns",
    pages: 321,
    rating: 4.8,
    cover: "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-06-05/bNj5HO27iD.png",
    starIcon: "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-06-05/1tvGLpt8Zw.png"
  },
  {
    id: 3,
    title: "Jurus Jitu Mengelola Emosi",
    pages: 67,
    rating: 4.9,
    cover: "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-06-05/qiM9uviJj6.png",
    starIcon: "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-06-05/SogcCUb8Xc.png"
  },
  {
    id: 4,
    title: "Jurus Jitu Mengelola Emosi",
    pages: 156,
    rating: 4.9,
    cover: "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-06-05/7ReZsM3ypu.png",
    starIcon: "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-06-05/2fnaTbKgmD.png"
  },
  {
    id: 5,
    title: "Cantik Itu Luka",
    pages: 156,
    rating: 4.9,
    cover: "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-06-05/kyU8anMJwv.png",
    starIcon: "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-06-05/HDsweVUGjO.png"
  },
  {
    id: 6,
    title: "When The Sky Is Blooming",
    pages: 258,
    rating: 4.8,
    cover: "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-06-05/HFJi4oZjtR.png",
    starIcon: "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-06-05/W0PUAbX0Ok.png"
  },
  {
    id: 7,
    title: "Seorang Pria Yang Melalui",
    pages: 237,
    rating: 4.9,
    cover: "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-06-05/qQcj8MbHKb.png",
    starIcon: "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-06-05/1Dk1ndRnB4.png"
  },
  {
    id: 8,
    title: "Hujan",
    pages: 258,
    rating: 4.9,
    cover: "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-06-05/etaPnYMGwG.png",
    starIcon: "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-06-05/ZdeDyeXJie.png"
  }
])

const searchQuery = ref('')
const filteredBooks = ref([...books.value])
const visibleBooks = ref(4)
const router = useRouter()

const navigateTo = (path) => {
  router.push(path)
}

const searchBooks = () => {
  if (searchQuery.value.trim() === '') {
    filteredBooks.value = [...books.value]
  } else {
    filteredBooks.value = books.value.filter(book =>
      book.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }
}
const loadMore = () => {
  visibleBooks.value = Math.min(visibleBooks.value + 4, books.value.length)
}

const currentBooks = () => {
  return filteredBooks.value.slice(0, visibleBooks.value)
}
</script>

<template>
  <div class="min-h-screen bg-white bg-opacity-95 mx-auto max-w-[1280px] px-4">
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
          <router-link to="/collection" class="text-lg font-semibold hover:text-blue-600 transition"
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

    <!-- Main Content -->
    <main class="py-8">
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

      <!-- Book Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
        <div
          v-for="book in currentBooks()"
          :key="book.id"
          class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
        >
          <div class="relative h-48 overflow-hidden">
            <img
              :src="book.cover"
              :alt="book.title"
              class="w-full h-full object-cover"
            >
            <div class="absolute bottom-2 left-2 bg-green-400 rounded-xl px-3 py-1 flex items-center">
              <img
                :src="book.starIcon"
                alt="Star"
                class="w-4 h-4 mr-1"
              >
              <span class="text-sm">{{ book.rating }}/5</span>
            </div>
          </div>
          <div class="p-4">
            <h3 class="font-medium text-lg mb-1 line-clamp-1">{{ book.title }}</h3>
            <p class="text-gray-500 text-sm">{{ book.pages }} halaman</p>
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
  </div>
</template>
