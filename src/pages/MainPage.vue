<template>
  <v-card width="100%">
    <v-card-title class="mt-3">오늘의 소비 📝</v-card-title>
    <v-card-actions class="d-flex justify-end">
      <v-btn color="primary" @click="logout">로그아웃</v-btn>
      <v-btn color="primary" @click="dialog = true">추가</v-btn>
    </v-card-actions>

    <!-- 캘린더 -->
    <Calendar :events="events" />
    <v-dialog v-model="dialog" max-width="400">
      <v-card>
        <v-card-title>사용 금액 입력</v-card-title>
        <v-card-text>
          <v-text-field v-model="amount" label="금액 (원)" type="number" />
          <v-text-field v-model="note" label="메모" />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn variant="text" @click="dialog = false">취소</v-btn>
          <v-btn color="primary" @click="saveExpense">저장</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Calendar from "@/components/Calendar.vue";
import { LoginService } from "./service/LoginService";
import { useRouter } from "vue-router";

// 다이얼로그 상태
const dialog = ref(false);
const amount = ref<number | null>(null);
const note = ref("");
const router = useRouter();

// 캘린더에 표시할 이벤트 목록
const events = ref<any[]>([]);

function saveExpense() {
  if (!amount.value) return;

  events.value.push({
    title: `${note.value || "지출"}: ${amount.value.toLocaleString()}원`,
    start: new Date(),
    end: new Date(),
    allDay: true,
    color: "blue",
  });

  // 초기화 & 닫기
  amount.value = null;
  note.value = "";
  dialog.value = false;
}

const logout = async () => {
  try {
    await LoginService.logout();
    alert("성공적으로 로그아웃 되었습니다.");
    router.push("/");
  } catch (error) {
    console.error("로그아웃 실패", error);
    alert("로그아웃 중 오류가 발생했습니다.");
  }
};
</script>
