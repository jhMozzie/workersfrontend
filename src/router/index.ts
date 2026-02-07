import { createRouter, createWebHistory } from 'vue-router';
import WorkersView from '@/views/WorkersView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'workers',
      component: WorkersView,
    },
  ],
});

export default router;
