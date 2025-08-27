<template>
  <div>
    <v-sheet class="d-flex" height="mx-auto" tile>
      <v-select
        v-model="type"
        :items="types"
        class="ma-2"
        density="compact"
        label="View Mode"
        variant="outlined"
        hide-details
      />
      <v-select
        v-model="weekday"
        :items="weekdays"
        class="ma-2"
        density="compact"
        label="weekdays"
        variant="outlined"
        hide-details
      />
    </v-sheet>

    <v-sheet>
      <v-calendar
        ref="calendar"
        class="ml-3 mr-3"
        v-model="value"
        :events="events"
        :view-mode="type"
        :weekdays="weekday"
        @click:date="onDateClick"
        @click:day="onDateClick"
      />
    </v-sheet>

    <!-- 팝업 -->
    <Popup v-model:open="dialog" :date="selectedDate" @save="onSaveFromPopup" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import Popup from "./Popup.vue";
import { ExpenseService } from "@/pages/service/ExpenseService";
import { formatDate } from "@/utils/date";

const props = defineProps({ events: Array });
const emit = defineEmits(["save"]);

const type = ref("month");
const types = [
  { title: "월간", value: "month" },
  { title: "주간", value: "week" },
  { title: "일간", value: "day" },
];
const weekday = ref([0, 1, 2, 3, 4, 5, 6]);
const weekdays = [
  { title: "일 ~ 토", value: [0, 1, 2, 3, 4, 5, 6] },
  { title: "월 ~ 일", value: [1, 2, 3, 4, 5, 6, 0] },
  { title: "월 ~ 금", value: [1, 2, 3, 4, 5] },
  { title: "월, 수, 금", value: [1, 3, 5] },
];

const value = ref([new Date()]);
const dialog = ref(false);
const selectedDate = ref(null);

async function onSaveFromPopup({ amount, note }) {
  if (!selectedDate.value) {
    console.error("선택된 날짜 없음");
    alert("날짜를 먼저 선택해주세요.");
    return;
  }

  try {
    const spendDate = formatDate(selectedDate.value);

    const saved = await ExpenseService.create({
      amount,
      note,
      spendDate,
    });

    props.events.push({
      title: `지출 ₩${amount.toLocaleString()}${note ? ` - ${note}` : ""}`,
      start: selectedDate.value,
      end: selectedDate.value,
      allDay: true,
      color: "blue",
    });

    emit("save", {
      amount,
      note,
      date: selectedDate.value,
    });
  } catch (error) {
    console.error("지출 저장 실패", error);
    alert("저장 실패");
  }
}

function onDateClick(payload) {
  const target =
    payload?.target || payload?.currentTarget || payload?.srcElement;
  let dateToUse = null;

  if (target?.textContent) {
    const dayText = target.textContent.trim();
    const dayNumber = parseInt(dayText);

    if (!isNaN(dayNumber) && dayNumber >= 1 && dayNumber <= 31) {
      const currentDisplayDate = value.value[0] || new Date();
      dateToUse = new Date(
        currentDisplayDate.getFullYear(),
        currentDisplayDate.getMonth(),
        dayNumber
      );
    }
  }

  if (dateToUse && !isNaN(dateToUse.getTime())) {
    selectedDate.value = dateToUse;
    dialog.value = true;
  } else {
    console.error("날짜 추출 실패");
    alert("날짜를 인식할 수 없습니다.");
  }
}
</script>
