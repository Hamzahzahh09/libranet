<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const loginForm = reactive({
  email: '',
  password: ''
})

const rememberMe = ref(false)
const errorMessage = ref('')
const showPassword = ref(false)
const isLoading = ref(false)
const showSuccess = ref(false)

const closeAlert = () => {
  showSuccess.value = false
}

const handleLogin = () => {
  try {
    errorMessage.value = ''
    isLoading.value = true

    setTimeout(() => {
      // Validasi input
      if (!loginForm.email || !loginForm.password) {
        errorMessage.value = 'Email dan password harus diisi'
        isLoading.value = false
        return
      }

      // Ambil data user dari localStorage
      const users = JSON.parse(localStorage.getItem('users')) || []

      // Cari user yang sesuai
      const foundUser = users.find(user =>
        user.email === loginForm.email &&
        user.password === loginForm.password
      )

      if (!foundUser) {
        errorMessage.value = 'Email atau password salah'
        isLoading.value = false
        return
      }

      // Simpan data login
      localStorage.setItem('currentUser', JSON.stringify({
        email: foundUser.email,
        name: foundUser.name
      }))

      if (rememberMe.value) {
        localStorage.setItem('rememberedEmail', loginForm.email)
      } else {
        localStorage.removeItem('rememberedEmail')
      }

      // Tampilkan alert sukses
      showSuccess.value = true
      isLoading.value = false

      setTimeout(() => {
        router.push('/library')
      }, 1500)
    }, 1000) // simulasi delay
  } catch (error) {
    console.error('Login error:', error)
    errorMessage.value = 'Terjadi kesalahan saat login'
    isLoading.value = false
  }
}
</script>

<template>
  <!-- Loading overlay -->
  <div v-if="isLoading" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
    <div class="text-white text-lg flex flex-col items-center">
      <svg class="animate-spin h-10 w-10 mb-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
        viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
      </svg>
      <span>Loading...</span>
    </div>
  </div>

  <!-- Success Alert -->
  <div v-if="showSuccess"
    class="fixed top-5 left-1/2 transform -translate-x-1/2 z-50 bg-green-100 border border-green-400 text-green-700 px-6 py-4 rounded-lg shadow-md flex items-center">
    <svg class="h-6 w-6 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
    </svg>
    <span>Login berhasil!</span>
    <button @click="closeAlert" class="ml-4 text-sm text-green-700 hover:underline">Tutup</button>
  </div>

  <div class="min-h-screen bg-[#29FF91] flex">
    <!-- Left Side - Form -->
    <div class="w-full md:w-1/2 flex items-center justify-center p-8">
      <div class="w-full max-w-md">
        <div class="text-center mb-8">
          <img src="https://i.imgur.com/2Nat6V1.png" class="h-12 w-12 mx-auto" alt="Library Logo" />
          <h1 class="text-3xl font-bold text-gray-900 mt-4">Libranet</h1>
        </div>

        <div class="bg-white rounded-xl shadow-lg p-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-2">Masuk ke Akun Anda</h2>
          <p class="text-gray-600 mb-6">Silakan masuk dengan email dan password Anda</p>

          <div v-if="errorMessage"
            class="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative flex items-center">
            <svg class="h-5 w-5 mr-2 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
            <span>{{ errorMessage }}</span>
          </div>

          <form @submit.prevent="handleLogin">
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-medium mb-2" for="email">Alamat Email</label>
              <input v-model="loginForm.email" id="email" type="email"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                placeholder="Email@contoh.com" required />
            </div>

            <!-- Password input dengan ikon -->
            <div class="relative w-full mb-2">
              <input :type="showPassword ? 'text' : 'password'" v-model="loginForm.password"
                class="w-full px-4 py-3 pr-12 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Password" />

              <!-- Tombol ikon mata -->
              <button type="button" @click="showPassword = !showPassword"
                class="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700">
                <svg v-if="!showPassword" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20"
                  fill="currentColor">
                  <path
                    d="M10 3C5.5 3 1.7 6.1 1 10c.7 3.9 4.5 7 9 7s8.3-3.1 9-7c-.7-3.9-4.5-7-9-7zm0 12a5 5 0 110-10 5 5 0 010 10z" />
                  <path d="M10 7a3 3 0 100 6 3 3 0 000-6z" />
                </svg>

                <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path fill-rule="evenodd"
                    d="M3.28 2.22a.75.75 0 011.06 0l17.44 17.44a.75.75 0 11-1.06 1.06l-2.03-2.03C16.79 20.03 14.45 21 12 21c-5 0-9.27-3.11-10.65-7.53a1.05 1.05 0 010-.94 10.64 10.64 0 014.47-5.31L3.28 3.28a.75.75 0 010-1.06zM9.37 10.44a3 3 0 004.19 4.19l-4.19-4.19z"
                    clip-rule="evenodd" />
                </svg>
              </button>
            </div>

            <div class="flex items-center justify-between mb-6">
              <div class="flex items-center">
                <input id="remember" type="checkbox" v-model="rememberMe"
                  class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                <label for="remember" class="ml-2 block text-sm text-gray-700">Ingat saya</label>
              </div>

              <!-- Ganti router-link lupa password -->
              <a href="/forgot-password" class="text-sm text-blue-600 hover:text-blue-800 transition-colors">
                Lupa password?
              </a>
            </div>

            <button type="submit"
              class="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all shadow-md">
              Masuk
            </button>
          </form>

          <div class="flex items-center my-6">
            <div class="flex-grow h-px bg-gray-300"></div>
            <span class="px-4 text-sm text-gray-500">atau</span>
            <div class="flex-grow h-px bg-gray-300"></div>
          </div>

          <button @click="handleGoogleLogin" type="button"
            class="w-full flex items-center justify-center border border-gray-300 hover:border-gray-500 text-gray-700 bg-white py-3 px-4 rounded-lg shadow-sm transition-all">
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" class="h-5 w-5 mr-3" alt="Google" />
            Masuk dengan Google
          </button>

          <div class="mt-6 text-center">
            <p class="text-sm text-gray-600">
              Belum punya akun?
              <!-- Ganti router-link daftar sekarang -->
              <a href="/register"
                class="text-blue-600 hover:text-blue-800 font-medium transition-colors cursor-pointer">
                Daftar sekarang
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Right Side - Illustration -->
    <div class="hidden md:flex md:w-1/2 bg-gradient-to-br from-blue-50 to-indigo-50 items-center justify-center p-12">
      <div class="text-center">
        <img src="https://i.imgur.com/oDGRaOp.png" alt="Person flying with books"
          class="w-full max-w-lg mx-auto animate-float" />
        <h3 class="text-2xl font-bold text-gray-800 mt-8">Jelajahi Dunia Literasi</h3>
        <p class="text-gray-600 mt-2 max-w-md mx-auto">
          Akses ribuan koleksi buku digital dari berbagai genre dan penulis terkenal
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
input[type='password']::-ms-reveal,
input[type='password']::-ms-clear {
  display: none;
}

input[type='password']::-webkit-credentials-auto-fill-button,
input[type='password']::-webkit-password-toggle-button {
  display: none;
  visibility: hidden;
}

@keyframes float {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-15px);
  }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .min-h-screen {
    padding: 2rem 1rem;
  }
}
</style>
