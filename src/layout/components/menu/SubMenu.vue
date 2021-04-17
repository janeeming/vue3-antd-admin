<template>
  <!-- 菜单子级组件 -->
  <a-sub-menu :key="menuInfo.path" v-bind="$attrs">
    <template #title>
      <!-- antd icon -->
      <!-- <component :is="$antIcons[item.meta.icon]" /> -->
      <!-- alibaba icon -->
      <i :class="menuInfo.meta.icon"></i>
      <span>{{ menuInfo.meta.title }}</span>
    </template>
    <template v-for="item in menuInfo.children" :key="item.path">
      <template v-if="!item.children">
        <a-menu-item :key="item.path" class="sub-item">
          <span>{{ item.meta.title }}</span>
          <!-- antd icon -->
          <!-- <component :is="$antIcons[item.meta.icon]" /> -->
          <!-- alibaba icon -->
          <i :class="item.meta.icon"></i>
        </a-menu-item>
      </template>
      <template v-else>
        <sub-menu :menu-info="item" :key="item.path"></sub-menu>
      </template>
    </template>
  </a-sub-menu>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "SubMenu",
  props: {
    menuInfo: {
      type: Object,
      default: () => ({}),
    },
  },
});
</script>

<style scoped>
.menu-con .iconfont {
  font-size: 22px;
  padding-right: 6px;
  vertical-align: sub;
}
.sub-item i {
  float: right;
}
</style>
