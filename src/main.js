import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "ant-design-vue/dist/antd.css";
import * as Icons from "@ant-design/icons-vue";
import "./icons/iconfont/iconfont.css"



const app = createApp(App);

// 全部引入
// import Antd from 'ant-design-vue';
// app.use(Antd);

// 按需引入
import {
  Button,
  message,
  Layout,
  Row,
  Col,
  Breadcrumb,
  Dropdown,
  Menu,
  Affix,
  Mentions,
  Avatar,
  ConfigProvider,
  Form,
  Input,
  Select,
  Popover,
  Tabs,
  Space,
  Table,
  
} from "ant-design-vue";



app.config.productionTip = false;
app
  .use(Button)
  .use(Layout)
  .use(Row)
  .use(Col)
  .use(Breadcrumb)
  .use(Dropdown)
  .use(Menu)
  .use(Affix)
  .use(Mentions)
  .use(Avatar)
  .use(ConfigProvider)
  .use(Form)
  .use(Input)
  .use(Select)
  .use(Popover)
  .use(Tabs)
  .use(Space)
  .use(Table);
app.config.globalProperties.$message = message;

// 批量引入antd的图标组件
for (const i in Icons) {
  app.component(i, Icons[i]);
}
// 添加到全局
app.config.globalProperties.$antIcons = Icons;

app.use(store);
app.use(router);
app.mount("#app");
