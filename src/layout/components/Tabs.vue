<template>
  <!-- 标签页组件 -->
  <a-tabs
    v-model:activeKey="activeKey"
    hide-add
    type="editable-card"
    @edit="onEdit"
  >
    <a-tab-pane
      v-for="pane in panes"
      :key="pane.key"
      :tab="pane.title"
      :closable="pane.closable"
    >
      {{ pane.content }}
    </a-tab-pane>
  </a-tabs>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
export default defineComponent({
  components: {
    
  },
  setup() {
    // 标签页数据
    const panes = ref([
      { title: "Tab 1", content: "Content of Tab 1", key: "1" },
      { title: "Tab 2", content: "Content of Tab 2", key: "2" },
    ]);
    const activeKey = ref(panes.value[0].key);
    const newTabIndex = ref(0);
    // 添加标签页
    const add = () => {
      activeKey.value = `newTab${newTabIndex.value++}`;
      panes.value.push({
        title: `New Tab ${activeKey.value}`,
        content: `Content of new Tab ${activeKey.value}`,
        key: activeKey.value,
      });
    };
    // 删除标签页
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
        } else {
          activeKey.value = panes.value[0].key;
        }
      }
    };

    const onEdit = (targetKey: string) => {
      remove(targetKey);
    };
    return {
      panes,
      activeKey,
      onEdit,
      add,
    };
  },
});
</script>
</script>