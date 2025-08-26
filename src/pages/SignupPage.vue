<template>
  <v-sheet class="mx-auto" width="500">
    <h3 class="text-h3 font-weight-bold mb-10 text-center">회원가입</h3>
    <v-form fast-fail @submit.prevent>
      <v-text-field v-model="id" label="아이디"></v-text-field>
      <v-text-field
        v-model="password"
        type="password"
        label="비밀번호"
      ></v-text-field>
      <v-text-field
        v-model="passwordConfirm"
        type="password"
        label="비밀번호 확인"
      ></v-text-field>
      <v-btn class="mt-4" type="submit" block @click="OnSignupSubmit"
        >회원가입</v-btn
      >
    </v-form>
  </v-sheet>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { SignUpService } from "./service/SingUpService";

const id = ref("");
const password = ref("");
const passwordConfirm = ref("");
const router = useRouter();

const OnSignupSubmit = async () => {
  if (!id.value || !password.value || !passwordConfirm.value) {
    confirm("모두 입력하세요~ ");
    return;
  }

  if (password.value !== passwordConfirm.value) {
    alert("비밀번호 다름");
    return;
  }

  try {
    await SignUpService.signup({
      username: id.value,
      password: password.value,
    });
    alert("회원가입이 완료 되었습니다~");
    router.push("/");
  } catch (error) {
    console.error(error);
    alert("회원가입 중 오류가 발생했습니다.");
  }
};
</script>
