<template>
  <a-config-provider :locale="locale">
    <router-view />
  </a-config-provider>
</template>

<script>

import zhCN from "ant-design-vue/es/locale/zh_CN";
import enGB from "ant-design-vue/es/locale/en_GB";
import { defineComponent, ref } from "vue";

export default defineComponent({
  components: {},
  setup() {
    return {
      locale: zhCN,
    };
  },
});
</script>

<style>
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */

html,
body {
  overflow: hidden;
}
/* 滚动条样式 */

.scroller {
  overflow-y: scroll;
  /* scrollbar-color: rebeccapurple green; */
  scrollbar-width: thin;
}

.scroller::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 3px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}

.scroller::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  /* border-radius: 10px; */
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #535353;
}

.scroller::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #ededed;
}
</style>