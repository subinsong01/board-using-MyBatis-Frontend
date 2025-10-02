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
import { boardApi } from "@/features/main/BoardApi";

const title = ref("");
const content = ref("");

const submitForm = async () => {
  try {
    const res = await boardApi.board({
      title: title.value,
      content: content.value,
    });
    window.alert("글이 성공적으로 등록되었습니다.");
  } catch (error) {
    console.error("res >> 게시판 생성 오류", error);
  }
  title.value = "";
  content.value = "";
};

const cancel = () => {
  title.value = "";
  content.value = "";
};
</script>
