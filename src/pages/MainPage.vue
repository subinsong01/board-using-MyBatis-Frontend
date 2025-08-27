<template>
  <v-card width="100%">
    <v-card-title class="mt-3 d-flex align-center">
      <span>{{ userId }}님의 </span>
      <span class="ml-2">소비 리포트 📝</span>
    </v-card-title>
    <v-card-actions class="d-flex justify-end">
      <v-btn color="primary" @click="logout">로그아웃</v-btn>
    </v-card-actions>
    <Calendar :events="events" @save="onSpendSave" />
  </v-card>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Calendar from "@/components/Calendar.vue";
import { LoginService } from "./service/LoginService";
import { useRouter } from "vue-router";
import { ExpenseService } from "./service/ExpenseService";

const router = useRouter();
const userId = ref("");
const events = ref([]);

onMounted(async () => {
  try {
    const [user, expenses] = await Promise.all([
      LoginService.getMyInfo(),
      ExpenseService.list({
        view: "month",
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1,
      }),
    ]);

    userId.value = user.username;

    events.value = expenses.map((item) => ({
      title: `지출 ₩${item.amount.toLocaleString()}${
        item.note ? ` - ${item.note}` : ""
      }`,
      start: new Date(item.spendDate),
      end: new Date(item.spendDate),
      allDay: true,
      color: "blue",
    }));
  } catch (e) {
    console.error("데이터 불러오기 실패", e);
  }
});

function onSpendSave({ amount, note, date }) {
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    console.error("잘못된 날짜:", date);
    return;
  }

  const start = new Date(date);
  const end = new Date(date);
  start.setHours(12, 0, 0, 0);
  end.setHours(12, 30, 0, 0);

  events.value = [
    ...events.value,
    {
      title: `지출 ₩${amount.toLocaleString()}${note ? ` - ${note}` : ""}`,
      start,
      end,
      allDay: false,
      color: "blue",
    },
  ];
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
