import buku from '../../data/buku.json'

<script setup>
import { ref } from 'vue'
import books from '@/data/buku.json' // @ = src (dalam Vite atau Webpack dengan alias)

// Reactive data dari JSON
const popularBooks = ref(books)
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 1. Navbar -->
    <nav class="bg-white shadow-sm sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16 items-center">
          <!-- Logo and Name -->
          <div class="flex items-center">
            <img src="https://cdn-icons-png.flaticon.com/512/2991/2991101.png"
                 class="h-8 w-8"
                 alt="Library Logo">
            <span class="ml-2 text-xl font-semibold text-gray-900">Perpustakaan Digital</span>
          </div>

          <!-- Desktop Navigation -->
          <div class="hidden md:flex items-center space-x-8">
            <router-link to="/" class="nav-link active">Beranda</router-link>
            <router-link to="/announcements" class="nav-link">Pengumuman</router-link>
            <router-link to="/collections" class="nav-link">Koleksi</router-link>
            <router-link to="/popular" class="nav-link">Populer</router-link>
            <router-link to="/ebooks" class="nav-link">E-Book</router-link>
            <router-link to="/search" class="nav-link">Cari Koleksi</router-link>
          </div>

          <!-- Profile/Login -->
          <div class="flex items-center">
            <button class="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none">
              <img class="h-8 w-8 rounded-full"
                   src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                   alt="Profile">
            </button>
          </div>
        </div>
      </div>
    </nav>

    <!-- 2. Hero Section -->
    <section class="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div class="md:flex items-center justify-between">
          <div class="md:w-1/2 mb-10 md:mb-0">
            <h1 class="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              Selamat Datang di <br>Perpustakaan Digital
            </h1>
            <p class="text-xl mb-8 text-blue-100">
              Temukan buku favoritmu dengan cepat & mudah. Akses ribuan koleksi digital
              kapan saja, di mana saja.
            </p>
            <div class="flex flex-col sm:flex-row gap-4">
              <button class="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                Lihat Koleksi
              </button>
              <button class="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                Daftar Sekarang
              </button>
            </div>

            <!-- Quick Stats -->
            <div class="flex flex-wrap gap-4 mt-8">
              <div class="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg flex items-center">
                <span class="text-2xl font-bold mr-2">500+</span>
                <span class="text-sm">Buku Tersedia</span>
              </div>
              <div class="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg flex items-center">
                <span class="text-2xl font-bold mr-2">100+</span>
                <span class="text-sm">Pengguna Aktif</span>
              </div>
            </div>
          </div>

          <div class="md:w-1/2 flex justify-center">
            <img src="https://cdn-icons-png.flaticon.com/512/3663/3663398.png"
                 class="h-64 md:h-96 animate-float"
                 alt="Reading Illustration">
          </div>
        </div>
      </div>
    </section>

    <!-- 3. Search Section -->
    <section class="py-12 bg-white">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-gray-50 p-6 rounded-xl shadow-sm">
          <h2 class="text-xl font-semibold text-center mb-6">Cari Koleksi Perpustakaan</h2>
          <div class="flex flex-col md:flex-row gap-4">
            <select class="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white">
              <option>Semua Kategori</option>
              <option>Novel</option>
              <option>Teknologi</option>
              <option>Agama</option>
              <option>Sains</option>
              <option>Sejarah</option>
            </select>
            <div class="relative flex-1">
              <input
                type="text"
                placeholder="Cari judul buku atau penulis..."
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-12"
              >
              <button class="absolute right-3 top-3 text-blue-600 hover:text-blue-800">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 4. Popular Collections -->
    <section class="py-12 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center mb-8">
          <h2 class="text-2xl md:text-3xl font-semibold">Koleksi Terpopuler</h2>
          <router-link to="/popular" class="text-blue-600 hover:text-blue-800 flex items-center">
            Lihat Semua <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </router-link>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div v-for="(book, index) in popularBooks" :key="index"
               class="bg-white rounded-xl shadow-sm hover:shadow-md transition-all overflow-hidden group">
            <div class="relative overflow-hidden h-48">
              <img :src="book.image" :alt="book.title"
                   class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105">
              <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <span class="text-xs text-white bg-blue-600 px-2 py-1 rounded-full">⭐ {{ book.rating }}/5</span>
              </div>
            </div>
            <div class="p-4">
              <h3 class="font-semibold text-gray-900 mb-1 line-clamp-1">{{ book.title }}</h3>
              <p class="text-sm text-gray-600 mb-2">oleh {{ book.author }}</p>
              <div class="flex justify-between items-center">
                <span class="text-xs text-gray-500">Dipinjam {{ book.borrowed }}x</span>
                <button class="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  Detail
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 5. New Collections -->
    <section class="py-12 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center mb-8">
          <h2 class="text-2xl md:text-3xl font-semibold">Koleksi Terbaru</h2>
          <router-link to="/collections" class="text-blue-600 hover:text-blue-800 flex items-center">
            Lihat Semua <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </router-link>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div v-for="(book, index) in newBooks" :key="index"
               class="bg-white rounded-xl shadow-sm hover:shadow-md transition-all overflow-hidden group">
            <div class="relative overflow-hidden h-48">
              <img :src="book.image" :alt="book.title"
                   class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105">
              <span class="absolute top-2 right-2 bg-green-600 text-white text-xs px-2 py-1 rounded-full">
                Baru
              </span>
            </div>
            <div class="p-4">
              <h3 class="font-semibold text-gray-900 mb-1 line-clamp-1">{{ book.title }}</h3>
              <p class="text-sm text-gray-600 mb-2">oleh {{ book.author }}</p>
              <p class="text-xs text-gray-500">Ditambahkan {{ book.addedDate }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 6. Visit Section / Footer CTA -->
    <section class="py-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="md:flex items-center justify-between">
          <div class="md:w-1/2 mb-10 md:mb-0">
            <h2 class="text-3xl font-bold mb-6">Kunjungi Perpustakaan Kami</h2>
            <p class="text-xl mb-6 text-blue-100">
              Nikmati pengalaman membaca yang lebih lengkap dengan mengunjungi perpustakaan fisik kami.
            </p>

            <div class="space-y-4 mb-8">
              <div class="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-3 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div>
                  <h4 class="font-semibold">Lokasi</h4>
                  <p class="text-blue-100">Gedung Perpustakaan Utama, Kampus Universitas, Jl. Pendidikan No. 1</p>
                </div>
              </div>

              <div class="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-3 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <h4 class="font-semibold">Jam Operasional</h4>
                  <p class="text-blue-100">Senin-Jumat: 08.00-20.00 WIB<br>Sabtu: 09.00-15.00 WIB</p>
                </div>
              </div>
            </div>

            <button class="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
              Lihat Peta Lokasi
            </button>
          </div>

          <div class="md:w-1/2">
            <div class="bg-white p-1 rounded-xl shadow-xl overflow-hidden">
              <!-- Replace with actual Google Maps embed -->
              <div class="bg-gray-200 h-64 md:h-80 flex items-center justify-center">
                <p class="text-gray-500">Peta Lokasi Perpustakaan</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-800 text-white py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div class="flex items-center mb-4">
              <img src="https://cdn-icons-png.flaticon.com/512/2991/2991101.png" class="h-8 w-8" alt="Library Logo">
              <span class="ml-2 text-xl font-semibold">Perpustakaan Digital</span>
            </div>
            <p class="text-gray-400 text-sm">
              Menyediakan akses ke pengetahuan dan informasi untuk semua kalangan.
            </p>
          </div>

          <div>
            <h4 class="text-lg font-semibold mb-4">Tautan Cepat</h4>
            <ul class="space-y-2">
              <li><router-link to="/" class="text-gray-400 hover:text-white transition-colors">Beranda</router-link></li>
              <li><router-link to="/announcements" class="text-gray-400 hover:text-white transition-colors">Pengumuman</router-link></li>
              <li><router-link to="/collections" class="text-gray-400 hover:text-white transition-colors">Koleksi</router-link></li>
              <li><router-link to="/popular" class="text-gray-400 hover:text-white transition-colors">Populer</router-link></li>
            </ul>
          </div>

          <div>
            <h4 class="text-lg font-semibold mb-4">Layanan</h4>
            <ul class="space-y-2">
              <li><router-link to="/ebooks" class="text-gray-400 hover:text-white transition-colors">E-Book</router-link></li>
              <li><router-link to="/search" class="text-gray-400 hover:text-white transition-colors">Cari Koleksi</router-link></li>
              <li><router-link to="/services" class="text-gray-400 hover:text-white transition-colors">Peminjaman</router-link></li>
              <li><router-link to="/services" class="text-gray-400 hover:text-white transition-colors">Keanggotaan</router-link></li>
            </ul>
          </div>

          <div>
            <h4 class="text-lg font-semibold mb-4">Kontak</h4>
            <ul class="space-y-3 text-gray-400">
              <li class="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                (021) 1234-5678
              </li>
              <li class="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                info@perpusdigital.ac.id
              </li>
            </ul>
          </div>
        </div>

        <div class="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400 text-sm">
          <p>© 2023 Perpustakaan Digital. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
</template>
