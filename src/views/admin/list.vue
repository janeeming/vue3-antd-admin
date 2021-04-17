<template>
  <!-- 管理员列表 -->
  <div>
    <a-card bordered="true">
      <p>
        <a-space>
          <a-input placeholder="请输入用户名" style="width: 200px" />
          <a-button type="primary" :size="size">查询</a-button>
        </a-space>
      </p>
    </a-card>

    <div style="margin-bottom: 16px">
      <a-button
        type="primary"
        :disabled="!hasSelected"
        :loading="loading"
        @click="start"
      >
        Reload
      </a-button>
      <span style="margin-left: 8px">
        <template v-if="hasSelected">
          {{ `Selected ${selectedRowKeys.length} items` }}
        </template>
      </span>
    </div>
    <a-table
      :row-selection="{
        selectedRowKeys: selectedRowKeys,
        onChange: onSelectChange,
      }"
      :columns="columns"
      :data-source="data"
    />
  </div>
</template>

<script lang="ts">
import { computed, onMounted, reactive, toRefs } from "vue";

import { defineComponent } from "vue";
import { ColumnProps } from "ant-design-vue/es/table/interface";

type Key = ColumnProps["key"];

interface DataType {
  key: Key;
  name: string;
  avatar: string;
  age: number;
  address: string;
}

const columns = [
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "头像",
    dataIndex: "avatar",
  },
  {
    title: "Age",
    dataIndex: "age",
  },
  {
    title: "Address",
    dataIndex: "address",
  },
];
const data: DataType[] = [];
for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    name: `Edward King ${i}`,
    avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
    age: 32,
    address: `London, Park Lane no. ${i}`,
  });
}
export default defineComponent({
  setup() {
    const state = reactive<{
      selectedRowKeys: Key[];
      loading: boolean;
    }>({
      selectedRowKeys: [], // Check here to configure the default column
      loading: false,
    });
    const hasSelected = computed(() => state.selectedRowKeys.length > 0);

    const start = () => {
      state.loading = true;
      // ajax request after empty completing
      setTimeout(() => {
        state.loading = false;
        state.selectedRowKeys = [];
      }, 1000);
    };
    const onSelectChange = (selectedRowKeys: Key[]) => {
      console.log("selectedRowKeys changed: ", selectedRowKeys);
      state.selectedRowKeys = selectedRowKeys;
    };
    onMounted(() => {
      console.log("管理员Component is mounted!");
    });
    return {
      data,
      columns,
      hasSelected,
      ...toRefs(state),

      // func
      start,
      onSelectChange,
    };
  },
  components: {},
});
</script>
