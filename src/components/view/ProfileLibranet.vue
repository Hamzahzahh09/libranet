<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { onClickOutside } from '@vueuse/core'

const router = useRouter()

onClickOutside(dropdownRef, () => {
  showAccountDropdown.value = false
})

// State management
const editMode = ref(false)
const isSubmitting = ref(false)
const fileInput = ref(null)
const profileImagePreview = ref(null)
const newGenre = ref('')
const showAccountDropdown = ref(false)
const dropdownRef = ref(null)


// Default data
const defaultForm = {
  firstName: 'Sarah',
  lastName: 'Johnson',
  email: 'sarah.j@example.com',
  phone: '+62 812-3456-7890',
  address: 'Jl. Sudirman No. 123, Jakarta Selatan',
  bio: 'Saya adalah seorang pecinta buku yang senang membaca berbagai genre, terutama fiksi sastra dan pengembangan diri. Saya juga aktif dalam klub buku lokal dan sering berbagi rekomendasi buku.',
  favoriteGenres: ['Fiksi Sastra', 'Pengembangan Diri', 'Sejarah', 'Fantasi'],
  searchHistory: [
    { query: 'novel terbaik 2023', date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) },
    { query: 'buku produktivitas', date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
    { query: 'khaled hosseini', date: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000) }
  ],
  profileImage: 'https://randomuser.me/api/portraits/women/44.jpg'
}

// Load data from localStorage or use default
const loadFormData = () => {
  const savedData = localStorage.getItem('userProfileData')
  if (savedData) {
    const parsedData = JSON.parse(savedData)
    // Convert date strings back to Date objects
    parsedData.searchHistory = parsedData.searchHistory.map(item => ({
      ...item,
      date: new Date(item.date)
    }))
    return parsedData
  }
  return defaultForm
}


const handleLogout = () => {
  // Hapus data dari localStorage
  localStorage.removeItem('userProfileData')

  // Redirect ke halaman login
  router.push('/login')

  // Tampilkan pesan logout (opsional)
  alert('Anda telah logout')
}

// Initialize form with saved data or defaults
const originalForm = loadFormData()
const form = reactive({ ...originalForm })

// Set profile image preview from saved data
profileImagePreview.value = form.profileImage

// Save data to localStorage
const saveFormData = (data) => {
  const dataToSave = {
    ...data,
    // Convert Date objects to strings for storage
    searchHistory: data.searchHistory.map(item => ({
      ...item,
      date: item.date.toISOString()
    }))
  }
  localStorage.setItem('userProfileData', JSON.stringify(dataToSave))
}

// Methods
const navigateTo = (path) => {
  router.push(path)
}

const toggleEditMode = () => {
  editMode.value = !editMode.value
  if (!editMode.value) {
    // Reset form if cancelling edit
    Object.assign(form, originalForm)
    profileImagePreview.value = originalForm.profileImage
  }
}

const cancelEdit = () => {
  toggleEditMode()
}

const openFilePicker = () => {
  fileInput.value.click()
}

const handleImageUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      profileImagePreview.value = e.target.result
      form.profileImage = e.target.result // Save to form
    }
    reader.readAsDataURL(file)
  }
}

const handleSubmit = async () => {
  isSubmitting.value = true

  // Simulate API call
  try {
    await new Promise(resolve => setTimeout(resolve, 1500))

    // Update original form with new values
    const updatedForm = {
      ...form,
      profileImage: profileImagePreview.value || originalForm.profileImage
    }

    Object.assign(originalForm, updatedForm)

    // Save to localStorage
    saveFormData(updatedForm)

    editMode.value = false
  } catch (error) {
    console.error('Error updating profile:', error)
  } finally {
    isSubmitting.value = false
  }
}

const addGenre = () => {
  if (newGenre.value.trim() && !form.favoriteGenres.includes(newGenre.value.trim())) {
    form.favoriteGenres.push(newGenre.value.trim())
    newGenre.value = ''
  }
}

const removeGenre = (index) => {
  form.favoriteGenres.splice(index, 1)
}

const removeSearchHistory = (index) => {
  form.searchHistory.splice(index, 1)
}

const getGenreColorClass = (genre) => {
  const colors = {
    'Fiksi Sastra': 'bg-blue-100 text-blue-800',
    'Pengembangan Diri': 'bg-green-100 text-green-800',
    'Sejarah': 'bg-purple-100 text-purple-800',
    'Fantasi': 'bg-yellow-100 text-yellow-800'
  }
  return colors[genre] || 'bg-gray-100 text-gray-800'
}

const formatDate = (date) => {
  const now = new Date()
  const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24))

  if (diffDays === 0) return 'hari ini'
  if (diffDays === 1) return 'kemarin'
  if (diffDays < 7) return `${diffDays} hari lalu`
  if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7)
    return `${weeks} minggu lalu`
  }
  return date.toLocaleDateString('id-ID')
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 font-sans">
    <header class="sticky top-0 z-50 bg-white shadow-md">
      <div class="container mx-auto px-6 py-4 flex justify-between items-center">
        <div class="flex items-center space-x-3 cursor-pointer" @click="navigateTo('/')">
          <img src="https://i.imgur.com/2Nat6V1.png" alt="Libranet Logo" class="w-10 h-10">
          <span class="text-2xl font-semibold text-blue-900">Libranet</span>
        </div>

        <nav class="hidden md:flex space-x-8">
          <router-link to="/library"
            class="text-lg font-semibold text-gray-700 hover:text-blue-600 transition relative py-2"
            active-class="text-blue-600 font-bold" exact>
            Beranda
          </router-link>
          <router-link to="/pengumuman"
            class="text-lg font-semibold text-gray-700 hover:text-blue-600 transition relative py-2"
            active-class="text-blue-600 font-bold">
            Pengumuman
          </router-link>
          <router-link to="/collection"
            class="text-lg font-semibold text-gray-700 hover:text-blue-600 transition relative py-2"
            active-class="text-blue-600 font-bold">
            Koleksi
          </router-link>
          <router-link to="/populer"
            class="text-lg font-semibold text-gray-700 hover:text-blue-600 transition relative py-2"
            active-class="text-blue-600 font-bold">
            Populer
          </router-link>
        </nav>

        <!-- Ganti bagian ini di header -->
        <div class="flex items-center space-x-6">
          <div class="relative">
            <img src="https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-06-05/JzZcgNsGvt.png" alt="Notification"
              class="w-9 h-9 rounded-full cursor-pointer hover:opacity-80 transition">
            <span class="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full"></span>
          </div>

           <!-- Account Dropdown -->
  <div class="relative" ref="dropdownRef">
    <div
      class="flex items-center space-x-2 cursor-pointer group"
      @click="showAccountDropdown = !showAccountDropdown"
      aria-haspopup="true"
      :aria-expanded="showAccountDropdown.toString()"
      tabindex="0"
      @keydown.enter.space.prevent="showAccountDropdown = !showAccountDropdown"
    >
      <span class="text-lg font-semibold text-gray-700 group-hover:text-blue-600 transition">Account</span>
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500 group-hover:text-blue-600 transition"
        viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd"
          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
          clip-rule="evenodd" />
      </svg>
    </div>

    <!-- Dropdown Menu -->
    <div v-if="showAccountDropdown" class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
      <router-link to="/profile" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" @click="showAccountDropdown = false">
        Profil Saya
      </router-link>
      <router-link to="/settings" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" @click="showAccountDropdown = false">
        Pengaturan
      </router-link>
      <button @click="handleLogout"
        class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24"
          stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
        Logout
      </button>
    </div>
  </div>div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="container mx-auto px-4 py-8 max-w-6xl">
      <div class="flex flex-col lg:flex-row gap-8">
        <!-- Sidebar Profil -->
        <div class="w-full lg:w-80 flex-shrink-0">
          <div class="bg-white rounded-xl shadow-md overflow-hidden">
            <!-- Foto Profil -->
            <div class="relative">
              <div class="h-32 bg-gradient-to-r from-blue-400 to-purple-500"></div>
              <div class="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
                <div class="relative group">
                  <img :src="profileImagePreview || 'https://randomuser.me/api/portraits/women/44.jpg'"
                    alt="Profile Photo" class="w-32 h-32 rounded-full border-4 border-white object-cover shadow-md">
                  <div v-if="editMode"
                    class="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                    @click="openFilePicker">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <input type="file" ref="fileInput" class="hidden" accept="image/*" @change="handleImageUpload">
                  </div>
                </div>
              </div>
            </div>

            <!-- Info Profil -->
            <div class="pt-20 pb-6 px-6 text-center">
              <h2 class="text-2xl font-bold text-gray-800">{{ form.firstName }} {{ form.lastName }}</h2>
              <p class="text-gray-600">{{ form.email }}</p>
              <p class="text-sm text-gray-500 mt-2">Member sejak Januari 2022</p>

              <div class="mt-6 flex justify-center space-x-4">
                <div class="text-center">
                  <p class="text-xl font-bold text-gray-800">24</p>
                  <p class="text-sm text-gray-500">Buku</p>
                </div>
                <div class="text-center">
                  <p class="text-xl font-bold text-gray-800">156</p>
                  <p class="text-sm text-gray-500">Hari</p>
                </div>
                <div class="text-center">
                  <p class="text-xl font-bold text-gray-800">4.8</p>
                  <p class="text-sm text-gray-500">Rating</p>
                </div>
              </div>

              <button @click="toggleEditMode"
                class="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition">
                {{ editMode ? 'Batal Edit' : 'Edit Profil' }}
              </button>
            </div>

            <!-- Menu Navigasi -->
            <div class="border-t border-gray-200 pt-4 pb-6">
              <nav class="space-y-2">
                <router-link to="/profile"
                  class="block px-6 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
                  active-class="bg-blue-50 text-blue-600 font-medium border-r-4 border-blue-600" exact>
                  Profil Saya
                </router-link>
                <router-link to="/profile/activity"
                  class="block px-6 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
                  active-class="bg-blue-50 text-blue-600 font-medium border-r-4 border-blue-600">
                  Aktivitas
                </router-link>
                <router-link to="/profile/collections"
                  class="block px-6 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
                  active-class="bg-blue-50 text-blue-600 font-medium border-r-4 border-blue-600">
                  Koleksi Saya
                </router-link>
                <router-link to="/profile/settings"
                  class="block px-6 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
                  active-class="bg-blue-50 text-blue-600 font-medium border-r-4 border-blue-600">
                  Pengaturan
                </router-link>
              </nav>
            </div>
          </div>
        </div>

        <!-- Konten Utama -->
        <div class="flex-1">
          <div class="bg-white rounded-xl shadow-md overflow-hidden">
            <!-- Header Konten -->
            <div class="border-b border-gray-200 px-6 py-4">
              <h2 class="text-xl font-bold text-gray-800">Informasi Profil</h2>
              <p class="text-sm text-gray-500 mt-1">Kelola informasi profil Anda untuk mengontrol, melindungi dan
                mengamankan akun</p>
            </div>

            <!-- Form Profil -->
            <div class="p-6">
              <form @submit.prevent="handleSubmit" class="space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Nama Depan</label>
                    <input type="text" v-model="form.firstName" :readonly="!editMode"
                      :class="['w-full px-4 py-2 rounded-lg border focus:outline-none', editMode ? 'border-gray-300 focus:ring-2 focus:ring-blue-500' : 'border-transparent bg-gray-50']">
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Nama Belakang</label>
                    <input type="text" v-model="form.lastName" :readonly="!editMode"
                      :class="['w-full px-4 py-2 rounded-lg border focus:outline-none', editMode ? 'border-gray-300 focus:ring-2 focus:ring-blue-500' : 'border-transparent bg-gray-50']">
                  </div>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input type="email" v-model="form.email" :readonly="!editMode"
                    :class="['w-full px-4 py-2 rounded-lg border focus:outline-none', editMode ? 'border-gray-300 focus:ring-2 focus:ring-blue-500' : 'border-transparent bg-gray-50']">
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Nomor Telepon</label>
                  <input type="tel" v-model="form.phone" :readonly="!editMode"
                    :class="['w-full px-4 py-2 rounded-lg border focus:outline-none', editMode ? 'border-gray-300 focus:ring-2 focus:ring-blue-500' : 'border-transparent bg-gray-50']">
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Alamat</label>
                  <textarea v-model="form.address" :readonly="!editMode"
                    :class="['w-full px-4 py-2 rounded-lg border focus:outline-none', editMode ? 'border-gray-300 focus:ring-2 focus:ring-blue-500' : 'border-transparent bg-gray-50']"
                    rows="3"></textarea>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Tentang Saya</label>
                  <textarea v-model="form.bio" :readonly="!editMode"
                    :class="['w-full px-4 py-2 rounded-lg border focus:outline-none', editMode ? 'border-gray-300 focus:ring-2 focus:ring-blue-500' : 'border-transparent bg-gray-50']"
                    rows="4"></textarea>
                </div>

                <div class="flex justify-end" v-if="editMode">
                  <button type="button" @click="cancelEdit"
                    class="mr-4 px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition">
                    Batal
                  </button>
                  <button type="submit"
                    class="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition flex items-center"
                    :disabled="isSubmitting">
                    <svg v-if="isSubmitting" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                      </path>
                    </svg>
                    {{ isSubmitting ? 'Menyimpan...' : 'Simpan Perubahan' }}
                  </button>
                </div>
              </form>
            </div>
          </div>

          <!-- Bagian Preferensi Buku -->
          <div class="mt-8 bg-white rounded-xl shadow-md overflow-hidden">
            <div class="border-b border-gray-200 px-6 py-4">
              <h2 class="text-xl font-bold text-gray-800">Preferensi Buku</h2>
            </div>

            <div class="p-6">
              <h3 class="text-lg font-medium text-gray-800 mb-4">Genre Favorit</h3>
              <div class="flex flex-wrap gap-3 mb-6">
                <span v-for="(genre, index) in form.favoriteGenres" :key="index" class="px-3 py-1 rounded-full text-sm"
                  :class="[editMode ? 'cursor-pointer hover:bg-opacity-70' : '', getGenreColorClass(genre)]"
                  @click="editMode ? removeGenre(index) : null">
                  {{ genre }}
                  <svg v-if="editMode" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 inline ml-1" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </span>
                <div v-if="editMode" class="relative">
                  <input type="text" v-model="newGenre" @keydown.enter="addGenre" placeholder="Tambah genre"
                    class="px-3 py-1 text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-1 focus:ring-blue-500">
                  <button @click="addGenre"
                    class="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-600">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </button>
                </div>
              </div>

              <h3 class="text-lg font-medium text-gray-800 mb-4">Riwayat Pencarian</h3>
              <div class="space-y-3">
                <div v-for="(search, index) in form.searchHistory" :key="index"
                  class="flex justify-between items-center p-3 rounded-lg"
                  :class="editMode ? 'bg-red-50 hover:bg-red-100 cursor-pointer' : 'bg-gray-50'"
                  @click="editMode ? removeSearchHistory(index) : null">
                  <span class="text-gray-700">"{{ search.query }}"</span>
                  <div class="flex items-center">
                    <span class="text-sm text-gray-500 mr-2">{{ formatDate(search.date) }}</span>
                    <svg v-if="editMode" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-red-500" fill="none"
                      viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
