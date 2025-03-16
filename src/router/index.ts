import { createMemoryHistory, createRouter } from 'vue-router'

import CombatView from '../views/CombatTracker.vue';

const routes = [
  { path: '/', component: CombatView },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

export default router;