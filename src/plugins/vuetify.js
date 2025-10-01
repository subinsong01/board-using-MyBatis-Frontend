// src/plugins/vuetify.ts
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

import { createVuetify } from "vuetify";
import * as directives from "vuetify/directives";

export default createVuetify({
  directives,
  theme: {
    defaultTheme: "system",
  },
});
