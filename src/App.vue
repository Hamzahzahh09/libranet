<script setup>
import { ref } from 'vue'

import LoginLibrary from './components/Library/LoginLibrary.vue'
import LibraryOnline from './components/Library/LibraryOnline.vue'
import CollectionsLibrary from './components/Library/CollectionsLibrary.vue'
import RegisterLibrary from './components/Library/RegisterLibrary.vue'

const page = ref('login') // nilai awal
const changePage = (newPage) => {
  page.value = newPage
}
</script>

<template>
  <!-- NAVBAR (Tampilkan kalau bukan login/register) -->
  <div class="min-h-screen bg-gray-50" v-if="page !== 'login' && page !== 'register'">
    <nav class="bg-white shadow-sm sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16 items-center">
          <div class="flex items-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2991/2991101.png"
              class="h-8 w-8"
              alt="Library Logo"
            />
            <span class="ml-2 text-xl font-semibold text-gray-900">Perpustakaan Digital</span>
          </div>

          <div>
            <ul class="flex gap-5">
              <li><a href="#" @click.prevent="changePage('home')">Home</a></li>
              <li><a href="#" @click.prevent="changePage('koleksi')">Koleksi</a></li>
            </ul>
          </div>

          <div class="flex items-center">
            <button class="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none">
              <img
                class="h-8 w-8 rounded-full"
                src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                alt="Profile"
              />
            </button>
          </div>
        </div>
      </div>
    </nav>
  </div>

  <!-- COMPONENTS BERDASARKAN PAGE -->
  <div>
    <!-- LOGIN -->
    <LoginLibrary v-if="page === 'login'" @login="changePage('home')" @goToRegister="changePage('register')" />

    <!-- REGISTER -->
    <RegisterLibrary v-if="page === 'register'" @goToLogin="changePage('login')" />

    <!-- HOME -->
    <LibraryOnline v-if="page === 'home'" />

    <!-- KOLEKSI -->
    <CollectionsLibrary v-if="page === 'koleksi'" />
  </div>
</template>
