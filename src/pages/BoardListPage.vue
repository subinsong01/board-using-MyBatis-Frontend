<template>
  <v-container>
    <v-card>
      <v-card-title class="d-flex justify-space-between align-center">
        <span>게시판</span>
        <v-btn color="primary" @click="goToCreate">글 작성</v-btn>
      </v-card-title>

      <v-card-text>
        <!-- 검색 영역 -->
        <v-row class="mb-4">
          <v-col cols="12" md="4">
            <v-text-field
              v-model="searchTitle"
              label="제목 검색"
              outlined
              dense
              clearable
            />
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="searchContent"
              label="내용 검색"
              outlined
              dense
              clearable
            />
          </v-col>
          <v-col cols="12" md="4">
            <v-btn color="primary" @click="searchBoard" block>검색</v-btn>
          </v-col>
        </v-row>

        <!-- 게시글 목록 -->
        <v-data-table
          :headers="headers"
          :items="boardList"
          :loading="loading"
          class="elevation-1"
          @click:row="goToDetail"
        >
          <template v-slot:item.boardId="{ item }">
            {{ item.boardId }}
          </template>
          <template v-slot:item.title="{ item }">
            {{ item.title }}
          </template>
          <template v-slot:item.createdAt="{ item }">
            {{ formatDate(item.createdAt) }}
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { boardListApi } from "@/features/main/BoardApi";

const router = useRouter();

const searchTitle = ref("");
const searchContent = ref("");
const boardList = ref([]);
const loading = ref(false);

const headers = [
  { title: "번호", key: "boardId", align: "center", width: "100" },
  { title: "제목", key: "title", align: "start" },
  { title: "작성일", key: "createdAt", align: "center", width: "200" },
];

const fetchBoardList = async () => {
  loading.value = true;
  try {
    const response = await boardListApi.boardList({
      title: searchTitle.value,
      content: searchContent.value,
    });
    boardList.value = response;
  } catch (error) {
    console.error("게시판 목록 조회 오류:", error);
  } finally {
    loading.value = false;
  }
};

const searchBoard = () => {
  fetchBoardList();
};

const goToCreate = () => {
  router.push("/board/create");
};

const goToDetail = (event, { item }) => {
  router.push(`/board/${item.boardId}`);
};

const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("ko-KR");
};

onMounted(() => {
  fetchBoardList();
});
</script>
