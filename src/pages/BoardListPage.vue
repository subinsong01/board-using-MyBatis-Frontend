<template>
  <v-container>
    <v-card>
      <v-card-title
        class="d-flex justify-space-between align-center text-h5 my-4"
      >
        <span>작성한 글 내역</span>
      </v-card-title>

      <v-card-text>
        <v-row class="mb-2">
          <v-col cols="8" md="10">
            <v-text-field
              v-model="searchTitle"
              label="제목 검색"
              outlined
              dense
              clearable
            />
          </v-col>

          <v-col cols="12" md="2">
            <v-btn
              color="pink-lighten-3"
              class="text-white"
              @click="searchBoard"
              block
              size="x-large"
            >
              검색
            </v-btn>
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
      <v-card-title class="d-flex justify-space-between align-center mb-3">
        <v-spacer></v-spacer>
        <v-btn color="pink-lighten-2" @click="goToCreate">글 작성</v-btn>
      </v-card-title>
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
  { title: "번호", key: "boardId", align: "left", width: "100" },
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

//글 작성
const goToCreate = () => {
  router.push("/");
};

//글 상세
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
