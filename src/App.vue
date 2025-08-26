<template>
  <v-app>
    <v-main>
      <!--여기 안에서 컨텐츠 높이를 자동 계산해줌-->
      <v-sheet class="d-flex align-center fill-height">
        <router-view />
      </v-sheet>
    </v-main>
  </v-app>
</template>

<script setup lang="ts"></script>
