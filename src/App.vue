<script setup>
import { RouterView, useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'

const isLoading = ref(false)
const router = useRouter()

onMounted(() => {
  router.beforeEach((to, from, next) => {
    isLoading.value = true
    next()
  })

  router.afterEach(() => {
    setTimeout(() => {
      isLoading.value = false
    }, 500) // delay biar animasinya kelihatan
  })
})
</script>

<template>
  <div>
    <!-- Loading Spinner -->
    <div v-if="isLoading" class="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-80">
      <svg class="animate-spin h-10 w-10 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
      </svg>
    </div>

    <!-- Router View -->
    <RouterView />
  </div>
</template>

<style scoped>
/* Tambahan opsional untuk smoother transition */
</style>
