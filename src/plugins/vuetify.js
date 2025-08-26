// src/plugins/vuetify.ts
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

import { createVuetify } from "vuetify";
import * as directives from "vuetify/directives";
import { VCalendar } from "vuetify/labs/VCalendar";

export default createVuetify({
  components: {
    VCalendar,
  },
  directives,
  theme: {
    defaultTheme: "system",
  },
});
