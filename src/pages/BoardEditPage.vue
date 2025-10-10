<template>
  <v-container>
    <v-card v-if="board">
      <v-card-title class="text-h5"> 게시글 수정 </v-card-title>

      <v-divider class="my-4"></v-divider>

      <v-card-text>
        <v-form @submit.prevent="updateBoard">
          <v-text-field
            v-model="board.title"
            label="제목"
            variant="outlined"
            class="mb-4"
            required
          ></v-text-field>

          <v-textarea
            v-model="board.content"
            label="내용"
            variant="outlined"
            rows="10"
            required
          ></v-textarea>
        </v-form>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-btn text @click="goToDetail">취소</v-btn>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="updateBoard" :loading="isLoading">
          저장
        </v-btn>
      </v-card-actions>
    </v-card>

    <v-card v-else class="text-center pa-10">
      <v-card-text>게시글을 불러오는 중...</v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { boardDetailListApi, boardUpdate } from "@/features/main/BoardApi";

const router = useRouter();
const route = useRoute();

const board = ref(null);
const isLoading = ref(false);

const fetchBoardDetail = async () => {
  try {
    const data = await boardDetailListApi.boardDetailList(route.params.boardId);
    board.value = data;
  } catch (error) {
    console.error("상세 조회 오류:", error);
    alert("게시글을 불러올 수 없습니다.");
    router.push("/board/list");
  }
};

const updateBoard = async () => {
  if (!board.value.title.trim()) {
    alert("제목을 입력해주세요.");
    return;
  }

  if (!board.value.content.trim()) {
    alert("내용을 입력해주세요.");
    return;
  }

  isLoading.value = true;

  try {
    await boardUpdate.boardUpdate(route.params.boardId, {
      title: board.value.title,
      content: board.value.content,
    });
    alert("수정되었습니다.");
    router.push(`/board/${route.params.boardId}`);
  } catch (error) {
    console.error("수정 오류:", error);
    alert("수정에 실패했습니다.");
  } finally {
    isLoading.value = false;
  }
};

const goToDetail = () => {
  router.push(`/board/${route.params.boardId}`);
};

onMounted(() => {
  fetchBoardDetail();
});
</script>
