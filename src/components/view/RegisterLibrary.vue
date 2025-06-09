<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const form = reactive({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
})

const handleRegister = () => {
  if (form.password !== form.confirmPassword) {
    alert('Password dan konfirmasi tidak cocok!');
    return;
  }

  const users = JSON.parse(localStorage.getItem('users')) || [];

  users.push({
    name: form.name,
    email: form.email,
    password: form.password
  });

  localStorage.setItem('users', JSON.stringify(users));
  alert('Pendaftaran berhasil!');

  form.name = '';
  form.email = '';
  form.password = '';
  form.confirmPassword = '';

  router.push('/LibraryOnline'); // ✅ ini harus sama dengan path di router
}

const handleGoogleRegister = () => {
  alert("Fitur Google Register belum tersedia 🙏");
}
</script>



<template>
  <div class="min-h-screen bg-[#29FF91] flex">
    <!-- Left Side - Form -->
    <div class="w-full md:w-1/2 flex items-center justify-center p-8">
      <div class="w-full max-w-md">
        <div class="text-center mb-8">
          <img src="https://i.imgur.com/2Nat6V1.png" class="h-12 w-12 mx-auto" alt="Library Logo" />
          <h1 class="text-3xl font-bold text-gray-900 mt-4">Libranet</h1>
        </div>

        <div class="bg-white rounded-q  xl shadow-lg p-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-2">Buat Akun Baru</h2>
          <p class="text-gray-600 mb-6">Silakan isi data untuk membuat akun</p>

          <form @submit.prevent="handleRegister">
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-medium mb-2" for="name">
                Nama Lengkap
              </label>
              <input v-model="form.name" id="name" type="text"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                placeholder="Nama Lengkap" required />
            </div>

            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-medium mb-2" for="email">
                Alamat Email
              </label>
              <input v-model="form.email" id="email" type="email"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                placeholder="Email@contoh.com" required />
            </div>

            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-medium mb-2" for="password">
                Password
              </label>
              <input v-model="form.password" id="password" type="password"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                placeholder="••••••••" required />
            </div>

            <div class="mb-6">
              <label class="block text-gray-700 text-sm font-medium mb-2" for="confirmPassword">
                Konfirmasi Password
              </label>
              <input v-model="form.confirmPassword" id="confirmPassword" type="password"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                placeholder="••••••••" required />
            </div>

            <button type="submit"
              class="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all shadow-md">
              Daftar
            </button>

            <div class="flex items-center my-6">
              <div class="flex-grow h-px bg-gray-300"></div>
              <span class="px-4 text-sm text-gray-500">atau</span>
              <div class="flex-grow h-px bg-gray-300"></div>
            </div>

            <button @click="handleGoogleRegister" type="button"
              class="w-full flex items-center justify-center border border-gray-300 hover:border-gray-500 text-gray-700 bg-white py-3 px-4 rounded-lg shadow-sm transition-all">
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" class="h-5 w-5 mr-3" alt="Google" />
              Daftar dengan Google
            </button>
          </form>

          <div class="mt-6 text-center">
            <p class="text-sm text-gray-600">
              Sudah punya akun?
              <a @click="$emit('goToLogin')"
                class="text-blue-600 hover:text-blue-800 font-medium transition-colors cursor-pointer">
                Masuk di sini
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Right Side - Illustration -->
    <div class="hidden md:flex md:w-1/2 bg-gradient-to-br from-blue-50 to-indigo-50 items-center justify-center p-12">
      <div class="text-center">
        <img src="https://i.imgur.com/oDGRaOp.png" alt="Books illustration" class="w-full max-w-lg mx-auto animate-float" />
        <h3 class="text-2xl font-bold text-gray-800 mt-8">Bergabung dan Mulai Membaca</h3>
        <p class="text-gray-600 mt-2 max-w-md mx-auto">
          Temukan koleksi buku favoritmu dan mulailah perjalanan membaca digital.
        </p>
      </div>
    </div>
  </div>
</template>


<style scoped>
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

@media (max-width: 768px) {
  .min-h-screen {
    padding: 2rem 1rem;
  }
}
</style>
