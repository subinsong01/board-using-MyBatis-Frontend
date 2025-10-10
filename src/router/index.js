import { createRouter, createWebHistory } from "vue-router";

import BoardPage from "@/pages/BoardPage.vue";
import BoardListPage from "@/pages/BoardListPage.vue";
import BoardDetailPage from "@/pages/BoardDetailPage.vue";
import BoardEditPage from "@/pages/BoardEditPage.vue";
const routes = [
  { path: "/", component: BoardPage },
  { path: "/board/list", component: BoardListPage },
  { path: "/board/:boardId", component: BoardDetailPage },
  { path: "/board/edit/:boardId", component: BoardEditPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
