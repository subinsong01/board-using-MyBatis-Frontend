import { http } from "@/shared/axios";

export const expenseApi = {
  async create({ amount, note, spendDate }) {
    const { data } = await http.post("/bill/record", {
      amount,
      note,
      spendDate,
    });
    return data;
  },
  async list({ view, year, month, week, date }) {
    /*
    view = "month" | "week" | "day"
    view 파라미터는 백엔드가 어떤 단위로 데이터를 묶어서 조회할지 알려주는 힌트
    왜 view가 필요할까?
    1. 쿼리 방식이 달라짐
    월간 조회 → WHERE YEAR(spend_date) = ? AND MONTH(spend_date) = ?
    주간 조회 → WHERE YEAR(spend_date) = ? AND DATEPART(WEEK, spend_date) = ?
    일간 조회 → WHERE spend_date = ?

    2. 백엔드 로직 단순화
    프론트에서 view=month를 주면 백엔드가 if(view=="month") { ... } 해서 알아서 쿼리 처리 가능.
    list() 하나의 API만 두고 모드를 나눌 수 있음.

    3. 확장성 : 지금은 day/week/month지만 나중에 year 뷰나 custom-range를 추가하고 싶을 때도 view 값만 늘리면 됨.
    */
    const { data } = await http.get("/expense", {
      params: { view, year, month, week, date },
    });
    return data;
  },

  async remove(id) {
    await http.delete(`/expense/${id}`);
  },
};
