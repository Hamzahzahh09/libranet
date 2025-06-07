// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import LoginLibrary from '../components/view/LoginLibrary.vue'
import RegisterLibrary from '../components/view/RegisterLibrary.vue'
import LibraryOnline from '../components/view/LibraryOnline.vue'
import CollectionsLibrary from '@/components/view/CollectionsLibrary.vue'
import DetailView from '@/components/view/DetailView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/library',
    },
    {
      path: '/login',
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
      path: '/detail',
      name: 'detail',
      component: DetailView,
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/',
    },
  ],
})

export default router
