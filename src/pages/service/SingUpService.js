import { createUser } from "@/features/signup/SignUpApi";

export const SignUpService = {
  async signup(param) {
    const res = await createUser(param);
    return res;
  },
};
