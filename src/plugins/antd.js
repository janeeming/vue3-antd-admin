// src/plugins/antd.js
// antd组件按需引入配置
import { createApp } from "vue";
import "ant-design-vue/dist/antd.css";
import { Button, message,Row } from "ant-design-vue";

export default {
    components:{ AButton:Button },
}