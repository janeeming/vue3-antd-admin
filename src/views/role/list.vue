<template>
  <!-- 角色列表 -->
  <div>
    <div>管理员列表</div>
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
export default defineComponent({
  setup() {
    const state = reactive({
      list: [],
      collapsed: false,
      rootSubmenuKeys: [],
      openKeys: [],
      selectedKeys: [],
      preOpenKeys: [],
    });
    onMounted(() => {
      console.log("角色Component is mounted!");
    });
    return {
      ...toRefs(state),
    };
  },
  components: {

  },
});
</script>
