import { createRouter, createWebHistory } from 'vue-router';
import ViewNotesList from '@/views/ViewNotesList.vue';
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'notesList',
      component: ViewNotesList
    },
    {
      path: '/stats',
      name: 'stats',
      component: () => import('../views/ViewStats.vue')
    },
    {
      path: '/edit-note/:id',
      name: 'editNote',
      component: () => import('../views/ViewEditNote.vue')
    },
    {
      path: '/auth',
      name: 'auth',
      component: () => import('../views/ViewAuth.vue')
    }
  ]
});

router.beforeEach(async (to, from) => {
  const auth = useAuthStore()
  if (!auth.isLoggedIn && to.name !== 'auth') {
    return { name: 'auth' }
  }
  if (auth.isLoggedIn && to.name === 'auth') {
    return {name: 'notesList'}
  }
})
export default router;
