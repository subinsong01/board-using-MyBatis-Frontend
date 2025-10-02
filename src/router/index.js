import { createRouter, createWebHistory } from "vue-router";

import BoardPage from "@/pages/BoardPage.vue";
import BoardListPage from "@/pages/BoardListPage.vue";

const routes = [
  { path: "/", component: BoardPage },
  { path: "/board/list", component: BoardListPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
