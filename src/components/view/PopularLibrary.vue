<script setup>
import { ref } from 'vue';

const books = ref([
  {
    id: 1,
    title: "Jurus Jitu Mengelola Emosi",
    pages: "156 halaman",
    rating: "4.9/5",
    cover: "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-06-05/woinEM9hOM.png",
    star: "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-06-05/fecvQDFOfP.png"
  },
  {
    id: 2,
    title: "A Thousand Splendid Suns",
    pages: "321 halaman",
    rating: "4.8/5",
    cover: "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-06-05/bNj5HO27iD.png",
    star: "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-06-05/1tvGLpt8Zw.png"
  },
  // ... other books
]);

const navItems = ref([
  { name: "Beranda", active: false },
  { name: "Pengumuman", active: false },
  { name: "Koleksi", active: true },
  { name: "Populer", active: false }
]);

const searchQuery = ref("");

const toggleNavItem = (index) => {
  navItems.value.forEach((item, i) => {
    item.active = i === index;
  });
};
</script>

<template>
  <div class="w-[1280px] min-h-[1275px] bg-white/95 mx-auto relative overflow-hidden font-['Inter']">
    <!-- Header -->
    <header class="w-full h-[101px] bg-white shadow-[0_7px_4px_rgba(0,0,0,0.25)] relative z-[118]">
      <div class="w-[1223px] h-[40px] mx-auto mt-[21.928px] flex justify-between items-center">
        <div class="flex items-center gap-[10px]">
          <div class="w-[40px] h-[40px] bg-[url('https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-06-05/SWoCFLaDyt.png')] bg-cover"></div>
          <span class="text-[24px] font-semibold text-[#1e3a8a]">Libranet</span>
        </div>

        <nav>
          <ul class="flex gap-[60px]">
            <li
              v-for="(item, index) in navItems"
              :key="index"
              class="text-[18px] font-semibold cursor-pointer px-[10px] py-[5px] transition-all"
              :class="{
                'text-[#1e3a8a]': item.active,
                'hover:text-[#1e3a8a]': !item.active,
                'border-b-2 border-[#1e3a8a]': item.active
              }"
              @click="toggleNavItem(index)"
            >
              {{ item.name }}
            </li>
          </ul>
        </nav>

        <div class="flex items-center gap-[10px]">
          <div class="w-[40px] h-[40px] bg-[url('https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-06-05/sqZgpsW6Bw.png')] bg-cover rounded-full"></div>
          <span class="text-[18px] font-semibold">Fulanah</span>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="pt-[54px] px-[110px]">
      <div class="flex justify-between items-center mb-[3px]">
        <div class="w-[2.7%] h-[40.72%] bg-[url('https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-06-05/NXxCX7trrn.png')] bg-cover"></div>
        <h1 class="text-[64px] font-semibold capitalize">Koleksi</h1>
        <div class="relative w-[163px] h-[41px] bg-[rgba(217,217,217,0.6)] rounded-[1px] border border-[rgba(0,0,0,0.4)]">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search"
            class="w-full h-full bg-transparent pl-[32px] pr-[40px] text-[20px] font-medium text-[rgba(0,0,0,0.6)] focus:outline-none"
          >
          <div class="absolute top-[7px] right-[10px] w-[24px] h-[24px] bg-[url('https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-06-05/LyG3Uagnqe.png')] bg-cover"></div>
        </div>
      </div>

      <div class="w-[378px] h-[3px] bg-[url('https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-06-05/GYeurtfbvv.png')] bg-cover mx-auto"></div>

      <h2 class="text-[20px] font-medium capitalize mt-[25.968px]">Koleksi kamu :</h2>

      <!-- Book Collections -->
      <div class="mt-[46px]">
        <div class="flex justify-between mb-[103px]">
          <div
            v-for="book in books.slice(0, 4)"
            :key="book.id"
            class="w-[243px] h-[271px] bg-white rounded-[10px]"
          >
            <div
              class="w-[242px] h-[195px] bg-cover bg-no-repeat rounded-[10px] mx-auto"
              :style="{ backgroundImage: `url(${book.cover})` }"
            >
              <div class="w-[85px] h-[37px] bg-[#29ff90] rounded-[12px] ml-[10px] mt-[148px] flex items-center pl-[10px] gap-[6px]">
                <div class="w-[16px] h-[16px] bg-cover" :style="{ backgroundImage: `url(${book.star})` }"></div>
                <span class="text-[14px] text-black/50">{{ book.rating }}</span>
              </div>
            </div>
            <h3 class="text-[16px] font-medium capitalize mt-[14px] ml-[14px]">{{ book.title }}</h3>
            <p class="text-[14px] text-black/50 capitalize mt-[14px] ml-[14px]">{{ book.pages }}</p>
          </div>
        </div>

        <div class="flex justify-between">
          <div
            v-for="book in books.slice(4, 8)"
            :key="book.id"
            class="w-[243px] h-[271px] bg-white rounded-[10px]"
          >
            <div
              class="w-[242px] h-[195px] bg-cover bg-no-repeat rounded-[10px] mx-auto"
              :style="{ backgroundImage: `url(${book.cover})` }"
            >
              <div class="w-[85px] h-[37px] bg-[#29ff90] rounded-[12px] ml-[10px] mt-[148px] flex items-center pl-[10px] gap-[6px]">
                <div class="w-[16px] h-[16px] bg-cover" :style="{ backgroundImage: `url(${book.star})` }"></div>
                <span class="text-[14px] text-black/50">{{ book.rating }}</span>
              </div>
            </div>
            <h3 class="text-[16px] font-medium capitalize mt-[14px] ml-[14px]">{{ book.title }}</h3>
            <p class="text-[14px] text-black/50 capitalize mt-[14px] ml-[14px]">{{ book.pages }}</p>
          </div>
        </div>
      </div>

      <button class="w-[200px] h-[39px] bg-[#29ff90] rounded-[5px] flex justify-center items-center mx-auto mt-[32px] text-[16px] font-medium capitalize">
        Lihat Selengkapnya
      </button>
    </main>
  </div>
</template>
