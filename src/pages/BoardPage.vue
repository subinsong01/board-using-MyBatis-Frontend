<template>
  <v-card width="100%">
    <v-card-title> 글 작성 </v-card-title>

    <v-card-text>
      <v-text-field v-model="title" label="제목" outlined dense required />
      <v-textarea
        v-model="content"
        label="내용"
        auto-grow
        outlined
        rows="5"
        required
      />
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="submitForm">등록</v-btn>
      <v-btn text @click="cancel">취소</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { boardApi } from "@/features/main/BoardApi";

const title = ref("");
const content = ref("");
const router = useRouter();

const submitForm = async () => {
  if ((title, (content = null))) {
    alert("내용을 입력해주세요");
  }
  try {
    const res = await boardApi.board({
      title: title.value,
      content: content.value,
    });
    window.alert("글이 성공적으로 등록되었습니다.");
    router.push("/board/list");
  } catch (error) {
    console.error("res >> 게시판 생성 오류", error);
    window.alert("등록에 실패했습니다.");
  }
  title.value = "";
  content.value = "";
};

const cancel = () => {
  router.push("/board/list");
};
</script>
