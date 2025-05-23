<script setup>
import { ref } from 'vue'
import LibraryOnline from './components/Library/LibraryOnline.vue'
import AnnouncementsLibrary from './components/Library/Announcementslibrary.vue'

const currentPage = ref('LibraryOnline')

const navigateTo = (page) => {
  currentPage.value = page
}
</script>

<template>
  <!-- hamzah -->
  <div class="app">
    <component
      :is="currentPage === 'LibraryOnline' ? LibraryOnline : AnnouncementsLibrary"
      @navigate="navigateTo"
    />
  </div>
</template>
