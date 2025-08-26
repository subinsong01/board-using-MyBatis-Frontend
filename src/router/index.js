import { createRouter, createWebHistory } from "vue-router";
import MainPage from "@/pages/MainPage.vue";
import LoginPage from "@/pages/LoginPage.vue";
import SignupPage from "@/pages/SignupPage.vue";

const routes = [
  { path: "/", component: LoginPage },
  { path: "/signup", component: SignupPage },
  { path: "/main", component: MainPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
