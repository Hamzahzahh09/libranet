// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import LoginLibrary from '../components/view/LoginLibrary.vue'
import RegisterLibrary from '../components/view/RegisterLibrary.vue'
import LibraryOnline from '../components/view/LibraryOnline.vue'
import CollectionsLibrary from '@/components/view/CollectionsLibrary.vue'
import DetailView from '@/components/view/DetailView.vue'
import AnnouncementsLibrary from '@/components/view/AnnouncementsLibrary.vue'
import PopularLibrary from '@/components/view/PopularLibrary.vue'
import ProfileLibranet from '@/components/view/ProfileLibranet.vue'
import EbookLibrary from '@/components/view/EbookLibrary.vue'
import EbookLibrary2 from '@/components/view/EbookLibrary2.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginLibrary,
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterLibrary,
    },
    {
      path: '/library',
      name: 'library',
      component: LibraryOnline,
    },
    {
      path: '/collection',
      name: 'collection',
      component: CollectionsLibrary,
    },
    {
      path: '/detail/:id',
      name: 'detail',
      component: DetailView,
    },
    {
      path: '/baca',
      name: 'baca',
      component: EbookLibrary,
    },
    {
      path: '/baca/2',
      name: 'baca2',
      component: EbookLibrary2,
    },
    {
      path: '/pengumuman',
      name: 'pengumuman',
      component: AnnouncementsLibrary,
    },
    {
      path: '/populer',
      name: 'populer',
      component: PopularLibrary,
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileLibranet,
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/',
    },
  ],
})

export default router
