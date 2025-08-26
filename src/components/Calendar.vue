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
      ></v-select>
      <v-select
        v-model="weekday"
        :items="weekdays"
        class="ma-2"
        density="compact"
        label="weekdays"
        variant="outlined"
        hide-details
      ></v-select>
    </v-sheet>
    <v-sheet>
      <v-calendar
        ref="calendar"
        v-model="value"
        :events="events"
        :view-mode="type"
        :weekdays="weekday"
      ></v-calendar>
    </v-sheet>
  </div>
</template>
<script>
import { useDate } from "vuetify";

export default {
  data: () => ({
    type: "month",
    types: [
      { title: "월간", value: "month" },
      { title: "주간", value: "week" },
      { title: "일간", value: "day" },
    ],
    weekday: [0, 1, 2, 3, 4, 5, 6],
    weekdays: [
      { title: "일 ~ 토", value: [0, 1, 2, 3, 4, 5, 6] },
      { title: "월 ~ 일", value: [1, 2, 3, 4, 5, 6, 0] },
      { title: "월 ~ 금", value: [1, 2, 3, 4, 5] },
      { title: "월, 수, 금", value: [1, 3, 5] },
    ],

    value: [new Date()],
    events: [],
    colors: ["파랑", "남색", "보라", "청록", "초록", "주황", "회색"],
    titles: [
      "회의",
      "휴일",
      "연차",
      "출장",
      "이벤트",
      "생일",
      "컨퍼런스",
      "파티",
    ],
  }),
  mounted() {
    const adapter = useDate();
    this.getEvents({
      start: adapter.startOfDay(adapter.startOfMonth(new Date())),
      end: adapter.endOfDay(adapter.endOfMonth(new Date())),
    });
  },
  methods: {
    getEvents({ start, end }) {
      const events = [];

      const min = start;
      const max = end;
      const days = (max.getTime() - min.getTime()) / 86400000;
      const eventCount = this.rnd(days, days + 20);

      for (let i = 0; i < eventCount; i++) {
        const allDay = this.rnd(0, 3) === 0;
        const firstTimestamp = this.rnd(min.getTime(), max.getTime());
        const first = new Date(firstTimestamp - (firstTimestamp % 900000));
        const secondTimestamp = this.rnd(2, allDay ? 288 : 8) * 900000;
        const second = new Date(first.getTime() + secondTimestamp);

        events.push({
          title: this.titles[this.rnd(0, this.titles.length - 1)],
          start: first,
          end: second,
          color: this.colors[this.rnd(0, this.colors.length - 1)],
          allDay: !allDay,
        });
      }

      this.events = events;
    },
    getEventColor(event) {
      return event.color;
    },
    rnd(a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a;
    },
  },
};
</script>
