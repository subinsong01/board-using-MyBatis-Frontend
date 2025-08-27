<template>
  <v-dialog
    :model-value="open"
    @update:model-value="(v) => emit('update:open', v)"
    max-width="420"
  >
    <v-card>
      <v-card-title class="mt-5 ml-3">사용 금액 입력</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="onSave">
          <v-text-field
            v-model.number="local.amount"
            label="금액 (원)"
            type="number"
            min="0"
            step="100"
            prepend-inner-icon="mdi-cash"
            clearable
            required
          />
          <v-text-field
            v-model="local.note"
            label="메모"
            prepend-inner-icon="mdi-note-text"
            clearable
          />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn variant="text" @click="emit('update:open', false)">취소</v-btn>
        <v-btn color="primary" @click="onSave">저장</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { reactive, watch } from "vue";

const props = defineProps<{ open: boolean; date: Date | null }>();
const emit = defineEmits(["update:open", "save"]);

const local = reactive({ amount: null as number | null, note: "" });

watch(
  () => props.open,
  (v) => {
    if (v) {
      local.amount = null;
      local.note = "";
    }
  }
);

function onSave() {
  if (!local.amount || local.amount <= 0 || !props.date) {
    console.error("입력 누락 - amount:", local.amount, "date:", props.date);
    return;
  }
  let safeDate = props.date;
  if (!(safeDate instanceof Date)) {
    safeDate = new Date(safeDate);
  }
  if (isNaN(safeDate.getTime())) {
    return;
  }
  emit("save", {
    amount: local.amount,
    note: local.note?.trim() || "",
    date: safeDate,
  });
  emit("update:open", false);
}
</script>
