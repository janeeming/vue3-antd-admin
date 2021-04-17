<template>
<!-- 面包屑导航 -->
  <a-breadcrumb>
    <a-breadcrumb-item>Home</a-breadcrumb-item>
  </a-breadcrumb>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import { onBeforeRouteUpdate, useRoute } from "vue-router";
export default defineComponent({
  name: 'Breadcrumb',
  setup() {
    onBeforeRouteUpdate((to) => {
      console.log(to, "=====");
      let lastIndex = 0;
      
    });
    return {
     
    };
  },
});
</script>