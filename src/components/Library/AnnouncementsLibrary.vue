<script setup>
import { ref } from 'vue'

const emit = defineEmits(['navigate'])

const announcements = ref([
  {
    id: 1,
    title: "Perpustakaan Tutup Hari Libur",
    content: "Perpustakaan akan tutup pada tanggal 17 Agustus 2023",
    date: "2023-08-15"
  },
  {
    id: 2,
    title: "Penambahan Koleksi Buku Baru",
    content: "Kami telah menambahkan 50 judul buku baru",
    date: "2023-08-10"
  }
])

const goToHome = () => {
  emit('navigate', 'LibraryOnline')
}
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Navbar (sama dengan halaman utama) -->
    <nav class="bg-white shadow-sm sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16 items-center">
          <div class="flex items-center">
            <img src="https://cdn-icons-png.flaticon.com/512/2991/2991101.png"
                 class="h-8 w-8" alt="Logo">
            <span class="ml-2 text-xl font-semibold">Perpustakaan Digital</span>
          </div>

          <div class="hidden md:flex items-center space-x-8">
            <button @click="goToHome"
                    class="text-gray-700 hover:text-blue-600">Beranda</button>
            <button class="text-blue-600 font-medium">Pengumuman</button>
          </div>

          <div class="flex items-center">
            <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                 class="h-8 w-8 rounded-full" alt="Profile">
          </div>
        </div>
      </div>
    </nav>

    <!-- Konten Pengumuman -->
    <section class="py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold mb-8">Pengumuman Terkini</h1>

        <div class="space-y-6">
          <div v-for="item in announcements" :key="item.id"
               class="bg-white p-6 rounded-lg shadow">
            <h2 class="text-xl font-semibold mb-2">{{ item.title }}</h2>
            <p class="text-gray-600 mb-3">{{ item.content }}</p>
            <span class="text-sm text-gray-500">{{ new Date(item.date).toLocaleDateString('id-ID') }}</span>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
