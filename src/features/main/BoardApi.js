import { http } from "@/shared/axios";

//게시판 생성
export const boardApi = {
  async board({ title, content }) {
    const { data } = await http.post("/board/create", { title, content });
    return data;
  },
};

//게시판 전체 조회
export const boardListApi = {
  async boardList() {
    const { data } = await http.get("/board/list");
    return data;
  },
};

//게시판 상세 조회

//게시판 수정

//게시판 삭제
