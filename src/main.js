import { createApp } from 'vue';
import App from './App.vue';
import { Button, message } from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

const app = createApp(App);
app.config.productionTip = false;
app.use(Button);
app.config.globalProperties.$message = message;
app.mount('#app');
