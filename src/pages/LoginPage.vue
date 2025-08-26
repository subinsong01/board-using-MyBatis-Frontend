<template>
  <v-sheet class="mx-auto" width="500">
    <h3 class="text-h3 font-weight-bold mb-6 text-center">로그인</h3>
    <v-form fast-fail @submit.prevent>
      <v-text-field v-model="id" label="아이디"></v-text-field>
      <v-text-field
        v-model="password"
        type="password"
        label="비밀번호"
      ></v-text-field>
      <v-btn class="mt-4" type="submit" block @click="login">로그인</v-btn>
      <v-btn class="mt-4" type="submit" block @click="signup">회원가입</v-btn>
    </v-form>
  </v-sheet>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const id = ref("");
const password = ref("");
const router = useRouter();

const login = async () => {
  if (!id.value || !password.value) {
    confirm("아이디와 비밀번호 모두 입력하세요!");
    return;
  }

  try {
    await LoginService.login({
      username: id.value,
      password: password.value,
    });
    router.push("/main");
  } catch (e) {
    confirm("로그인 실패");
    console.log("error", e);
  }
};

//회원가입 페이지로 이동
const signup = () => {
  router.push("/signup");
};
</script>
