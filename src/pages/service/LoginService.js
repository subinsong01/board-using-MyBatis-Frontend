import { login, getMyInfo, logout } from "@/features/login/LoginApi";

export const LoginService = {
  //로그인 시도
  async login({ username, password }) {
    try {
      const data = await login({ username, password });
      return data;
    } catch (error) {
      console.error("로그인 시도 에러", error);
      throw error;
    }
  },
  //정보 가져오기
  async getMyInfo() {
    try {
      const data = await getMyInfo();
      return data;
    } catch (error) {
      console.error("유저 정보 가지고 오기 에러", error);
      throw error;
    }
  },

  //로그아웃
  async logout() {
    try {
      await logout(); //세션 종료 요청
    } catch (error) {
      console.log("로그아웃 실패 ~~~~~", error);
      throw error;
    }
  },
};
