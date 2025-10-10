<template>
  <v-container>
    <v-card v-if="board">
      <v-card-title class="text-h5">
        {{ board.title }}
      </v-card-title>

      <v-card-subtitle class="mt-2">
        <v-chip size="small" class="mr-2"> 번호: {{ board.boardId }} </v-chip>
        <v-chip size="small">
          작성일: {{ formatDate(board.createdAt) }}
        </v-chip>
      </v-card-subtitle>

      <v-divider class="my-4"></v-divider>

      <v-card-text>
        <div style="white-space: pre-wrap; min-height: 200px">
          {{ board.content }}
        </div>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-btn text @click="goToList">목록</v-btn>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="goToEdit">수정</v-btn>
        <v-btn color="error" @click="deleteBoard">삭제</v-btn>
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
import { boardDetailListApi, boardDelete } from "@/features/main/BoardApi";

const router = useRouter();
const route = useRoute();

const board = ref(null);

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

const goToList = () => {
  router.push("/board/list");
};

const goToEdit = () => {
  router.push(`/board/edit/${route.params.boardId}`);
};

const deleteBoard = async () => {
  if (!confirm("정말 삭제하시겠습니까?")) {
    return;
  }

  try {
    await boardDelete.boardDelete(route.params.boardId);
    alert("삭제되었습니다.");
    router.push("/board/list");
  } catch (error) {
    console.error("삭제 오류:", error);
    alert("삭제에 실패했습니다.");
  }
};

const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleString("ko-KR");
};

onMounted(() => {
  fetchBoardDetail();
});
</script>
