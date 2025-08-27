import { expenseApi } from "@/features/bill/ExpenseApi";

export const ExpenseService = {
  async create({ amount, note, spendDate }) {
    try {
      const data = await expenseApi.create({ amount, note, spendDate });
      return data;
    } catch (error) {
      console.error("소비 내역 등록 실패", error);
      throw error;
    }
  },

  async list({ view, year, month, week, date }) {
    try {
      const data = await expenseApi.list({ view, year, month, week, date });
      return data;
    } catch (error) {
      console.error("소비 내역 기록 가지고 오기 실패", error);
      throw error;
    }
  },

  async remove(id) {
    try {
      await expenseApi.remove(id);
    } catch (error) {
      console.error("소비 내역 삭제 실패", error);
      throw error;
    }
  },
};
