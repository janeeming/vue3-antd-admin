<template>
  <!-- 菜单父级组件 -->
  
  <div class="menu-con">
    <a-menu
      mode="inline"
      theme="dark"
      v-model:openKeys="openKeys"
      v-model:selectedKeys="selectedKeys"
      :inline-collapsed="collapsed"
      @openChange="onOpenChange"
      @click="menuClick"
      v-bind="toggleCollapsed"
    >
      <template v-for="item in list" :key="item.path">
        <template v-if="!item.children">
          <a-menu-item :key="item.path">
            <!-- antd icon -->
            <!-- <component :is="$antIcons[item.meta.icon]" /> -->
            <!-- alibaba icon -->
            <i :class="item.meta.icon" ></i>
            <div>{{ item.meta.title }}</div>
          </a-menu-item>
        </template>
        <template v-else>
          <sub-menu :menu-info="item" :key="item.path"></sub-menu>
        </template>
      </template>
    </a-menu>
    
  </div>
</template>
<script lang="ts">
import {
  defineProps,
  defineComponent,
  ref,
  onMounted,
  watch,
  reactive,
  toRefs,
} from "vue";
import { createRouter, onBeforeRouteUpdate, useRoute, useRouter } from "vue-router";
import SubMenu from "./SubMenu.vue";
import { createFromIconfontCN, PieChartOutlined } from "@ant-design/icons-vue";
import { asyncRoutes } from "../../../router";

export default defineComponent({
  name: "ParentMenu",
  props: {},

  setup() {
    const router = useRouter();
    const rotuers = router.options.routes;
    const route = useRoute();

    const state = reactive({
      list: [],
      collapsed: false,
      rootSubmenuKeys: [],
      openKeys: [],
      selectedKeys: [],
      preOpenKeys: [],
    });
   
    let storage = window.localStorage;
    state.list = asyncRoutes;
    state.selectedKeys = [route.path];
    // 监听
    onBeforeRouteUpdate((to) => {
      state.selectedKeys  = [to.path];
    });
    
    watch(
      () => state.openKeys,
      (val, oldVal) => {
        state.preOpenKeys = oldVal;
        storage.setItem("openKeys",JSON.stringify(state.openKeys));
      }
    );
    onMounted(() => {
      console.log("Component is mounted!");
      // console.log(rotuers);
      // // 将从缓存中取出openKeys
      let openKeysStr = storage.getItem("openKeys");
      if (openKeysStr) {
        // 存在即赋值
        state.openKeys = JSON.parse(openKeysStr);
      } else {
        // 默认
        // state.openKeys = ["/dashboard"];
      }
    });
    // 请求菜单权限与按钮权限
    const getMenus = () => {};
    // 遍历所有父菜单
    const eachParentMenu = () => {
      state.list.forEach((element) => {
        if (element.children.length > 0) {
          state.rootSubmenuKeys.push(element.path);
        }
      });
    };
    // 当菜单被折叠时触发
    const toggleCollapsed = () => {
      state.collapsed = !state.collapsed;
      state.openKeys = state.collapsed ? [] : state.preOpenKeys;
    };
    // 当菜单被展开时触发此处
    const onOpenChange = (openKeys: string[]) => {
      const latestOpenKey = openKeys.find(
        (key) => state.openKeys.indexOf(key) === -1
      );
      if (state.rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
        state.openKeys = openKeys;
      } else {
        state.openKeys = latestOpenKey ? [latestOpenKey] : [];
      }
    };
    // 点击菜单，路由跳转,注意的是当点击MenuItem才会触发此函数
    const menuClick = (e) => {
      console.log("click", e);
      // storage.setItem("selectedKeys",key);
      router.push({
        path: e.key,
      });
    };

    return {
      ...toRefs(state),
      toggleCollapsed,
      onOpenChange,
      menuClick,
      rotuers,
    };
  },
  components: {
    SubMenu,
    PieChartOutlined,
  },
});
</script>

<style scoped>
.menu-con .iconfont {
  font-size: 28px;
}
</style>
