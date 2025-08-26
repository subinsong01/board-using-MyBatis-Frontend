import { http } from "@/shared/axios";

export async function createUser(param) {
  const { data } = await http.post("/signup", param);
  return data;
}
