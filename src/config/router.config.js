// 路由配置,使用动态权限该数据需要从后端获取
// 配置说明：
// hidden: 是否渲染菜单 boolean
// title: 菜单名称 String
// icon: 菜单图标 String
// target: 打开方式_blank|_self|_top|_parent"
// keepAlive: 是否缓存页面 boolean
// hiddenHeaderContent: 头部是否显示
const routerObject = {
  redirect: "",
  name: "router-name",
  hidden: true,
  meta: {
    title: "title",
    icon: "a-icon",
    target: "_blank|_self|_top|_parent",
    keepAlive: true,
    hiddenHeaderContent: true,
  },
};

export default routerObject;
