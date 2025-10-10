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
export const boardDetailListApi = {
  async boardDetailList(boardId) {
    const { data } = await http.get(`/board/${boardId}`);
    return data;
  },
};

//게시판 수정
export const boardUpdate = {
  async boardUpdate(boardId, { title, content }) {
    const { data } = await http.patch(`/board/update/${boardId}`, {
      title,
      content,
    });
    return data;
  },
};

//게시판 삭제
export const boardDelete = {
  async boardDelete(boardId) {
    const { data } = await http.delete(`/board/${boardId}`);
    return data;
  },
};
