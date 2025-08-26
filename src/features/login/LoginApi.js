import { http } from "@/shared/axios";

export const authApi = {
  async login({ username, password }) {
    const { data } = await http.post("/auth/login", { username, password });
    return data;
  }, //로그인
  async getMyInfo() {
    const { data } = await http.get("/auth/me");
    return data;
  }, //유저 정보 조회
  async logout() {
    await http.post("/auth/logout");
  }, //로그아웃
};
