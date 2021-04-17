<template>
  <a-layout id="components-layout-demo-custom-trigger">
    <!-- 侧边栏开始 -->
    <a-layout-sider
      class="layout-sider scroller"
      v-model:collapsed="collapsed"
      :trigger="null"
      collapsible
    >
      <div class="logo">
        <div class="logo-img">
          <!-- <img src="../assets/ant-design-logo.svg" /> -->
        </div>
        <h1 class="logo-title">Antdv-Admin</h1>
      </div>
      <!-- <Menu collapsed="collapsed" /> -->
      <!-- 菜单 -->
      <parent-menu toggleCollapsed="toggleCollapsedHandel"></parent-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <a-row type="flex" justify="space-between">
          <a-col>
            <menu-unfold-outlined
              v-if="collapsed"
              class="trigger"
              @click="toggleCollapsed"
            />
            <menu-fold-outlined
              v-else
              class="trigger"
              @click="toggleCollapsed"
            />
          </a-col>
          <a-col class="right-text">
            <a-dropdown>
              <a class="ant-dropdown-link username-link" @click.prevent>
                <a-avatar
                  class="avatar"
                  src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                />
                小明
              </a>
              <template #overlay>
                <a-menu>
                  <a-menu-item key="1">
                    <UserOutlined />
                    个人中心
                  </a-menu-item>
                  <a-menu-item key="2">
                    <UserOutlined />
                    退出系统
                  </a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
            <a-dropdown>
              <template #overlay>
                <a-menu @click="handleMenuClick">
                  <a-menu-item key="1"> 简体中文 </a-menu-item>
                  <a-menu-item key="2"> English </a-menu-item>
                </a-menu>
              </template>
              <a-button class="language-btn" type="link">
                <GlobalOutlined />
              </a-button>
            </a-dropdown>
          </a-col>
        </a-row>
      </a-layout-header>
      <!-- 主体开始 -->
      <a-layout-content
        :style="{
          margin: '2px 2px',
          padding: '2px',
          background: '#fff',
          minHeight: '280px',
          overflow: 'auto',
        }"
      >
        <a-tabs
          v-model:activeKey="activeKey"
          hide-add
          type="editable-card"
          @edit="onEdit"
          @change="onChange"
        >
          <a-tab-pane
            v-for="pane in panes"
            :key="pane.key"
            :tab="pane.title"
            :closable="pane.closable"
          >
          </a-tab-pane>
        </a-tabs>
        <router-view v-slot="{ Component }">
          <transition>
            <keep-alive>
              <component :is="Component" />
            </keep-alive>
          </transition>
        </router-view>
        <!-- <router-view></router-view> -->
      </a-layout-content>
      <!-- 主体结束 -->
    </a-layout>
  </a-layout>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref, watch } from "vue";
import { onBeforeRouteUpdate, useRoute, useRouter } from "vue-router";
import ParentMenu from "./components/menu/ParentMenu.vue";

export default defineComponent({
  setup() {
    const router = useRouter();
    const route = useRoute();
    // 标签页数据例子
    // panes = [{ title: "Tab 1", content: "Content of Tab 1", key: "1" }];
    const panes = ref([]);
    const activeKey = ref("");
    const newTabIndex = ref(0);
    const collapsed = ref(false);
    const appName = ref("Antdv-Admin");

    let storage = window.localStorage;
    onMounted(() => {
      let panesStr = storage.getItem("panes");

      if (panesStr) {
        // 存在即赋值
        panes.value = JSON.parse(panesStr);
        activeKey.value = route.path;
      } else {
        // 默认
      }
    });
    onBeforeRouteUpdate((to) => {
      let lastIndex = 0;
      panes.value.forEach((pane, i) => {
        if (pane.key === to.path) {
          lastIndex = 1;
          activeKey.value = to.path;
        }
      });

      if (lastIndex <= 0) {
        let pane = {
          title: to.meta.title,
          content: "",
          key: to.path,
        };
        add(pane);
      }
    });
    // 添加
    const add = (pane) => {
      activeKey.value = `${pane.key}`;
      panes.value.push({
        title: `${pane.title}`,
        content: `${activeKey.value}`,
        key: activeKey.value,
        closable: panes.value.length > 0
      });
      updatePanes();
    };
    // 删除
    const remove = (targetKey: string) => {
      let lastIndex = 0;
      panes.value.forEach((pane, i) => {
        if (pane.key === targetKey) {
          lastIndex = i - 1;
        }
      });
      panes.value = panes.value.filter((pane) => pane.key !== targetKey);
      if (panes.value.length && activeKey.value === targetKey) {
        if (lastIndex >= 0) {
          activeKey.value = panes.value[lastIndex].key;
          router.push({
            path: activeKey.value,
          });
        } else {
          activeKey.value = panes.value[0].key;
          
        }
      } else {
        console.log("tabs is end");
      }
    };
    // 编辑
    const onEdit = (targetKey: string) => {
      remove(targetKey);
      updatePanes();
    };
    // 切换
    const onChange = (activeKey: string) => {
      router.push({
        path: activeKey,
      });
    };
    // 更新
    function updatePanes() {
      storage.setItem("panes", "");
      storage.setItem("panes", JSON.stringify(panes.value));
    }
    // 展开收缩
    const toggleCollapsed = () => {
      collapsed.value = !collapsed.value;
    };

    return {
      appName,
      collapsed,
      toggleCollapsed,
      panes,
      activeKey,
      onEdit,
      onChange,
      add,
    };
  },
  components: {
    "parent-menu": ParentMenu,
  },
});
</script>
<style scoped>
#components-layout-demo-custom-trigger {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  margin: 16px;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.logo .logo-img {
  display: inline-block;
  width: 32px;
  height: 32px;
  vertical-align: top;
  background-image: url("../assets/ant-design-logo.svg");
  background-size: 100% 100%;
  white-space: nowrap;
}
.logo .logo-img img {
  width: 100%;
  height: auto;
  max-width: 100%;
  display: block;
}
.logo .logo-title {
  display: inline-block;
  margin: 0;
  padding: 0 3px;
  color: #fff;
  font-weight: 500;
  line-height: 32px;
  overflow: hidden;
  white-space: nowrap;
}
.site-layout .site-layout-background {
  background: #fff;
}

.layout-sider {
  overflow-y: auto;
}
.right-text {
  text-align: right;
}
.avatar {
  position: relative;
  top: -3px;
}
.username-link {
  display: inline-block;
  padding-right: 8px;
  height: 100%;
}
.language-btn {
  display: inline-block;
  font-size: 18px;
  height: 64px;
  line-height: 64px;
  text-align: center;
  vertical-align: top;
  padding: 0 12px;
  cursor: pointer;
  transition: color 0.1s;
}
</style>
