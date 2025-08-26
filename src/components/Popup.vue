<template>
  <!-- 팝업 열기 버튼 -->
  <v-btn color="primary" @click="dialog = true">금액 입력</v-btn>

  <!-- 팝업 다이얼로그 -->
  <v-dialog v-model="dialog" max-width="400">
    <v-card>
      <v-card-title>사용 금액 입력</v-card-title>
      <v-card-text>
        <v-text-field
          v-model="amount"
          label="금액 (원)"
          type="number"
          prepend-inner-icon="mdi-cash"
          clearable
        />
        <v-text-field
          v-model="note"
          label="메모"
          prepend-inner-icon="mdi-note-text"
          clearable
        />
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn variant="text" @click="dialog = false">취소</v-btn>
        <v-btn color="primary" @click="saveAmount">저장</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref } from "vue";

const dialog = ref(false);
const amount = ref(null);
const note = ref("");

function saveAmount() {
  console.log("금액:", amount.value, "메모:", note.value);
  dialog.value = false;
}
</script>
