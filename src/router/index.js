import { createRouter, createWebHashHistory } from "vue-router";
import Layout from "../layout/BasicsLayout.vue";
// 公共路由无需权限
const constantRoutes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../layout/BasicsLayout.vue"),
  },
];
// 权限路由,前端定义或后端返回
export const asyncRoutes = [
  {
    path: "/System",
    name: "System",
    hidden: false,
    component: () => import("../layout/BasicsLayout.vue"),
    meta: {
      title: "系统管理",
      icon: "iconfont icongouwuche",
      roles: ["admin", "editor"], // 普通的用户角色
    },
    children: [
      {
        path: "/System/admin",
        name: "AdminList",
        hidden: false,
        component: () => import("../views/admin/list.vue"),
        meta: {
          title: "用户管理",
          icon: "iconfont icongouwuche",
          roles: ["editor"], //  editor角色的用户才能访问该页面
          requiresAuth: true,
          keepAlive: true,
        },
      },
      {
        path: "/System/role",
        name: "RoleList",
        hidden: false,
        component: () => import("../views/role/list.vue"),
        meta: {
          title: "角色管理",
          icon: "iconfont icongouwuche",
          roles: ["admin"], //  admin角色的用户才能访问该页面
          requiresAuth: true,
          keepAlive: true,
        },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes,
});

// 重置路由
// reset router
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher;
}

// 注册路由
function addRoute(parent, routers) {
  routers.forEach((element) => {
    if (element.children && element.children.length > 0) {
      router.addRoute(element);
      addRoute(element, element.children);
    } else {
      if (parent) {
        router.addRoute(parent.name, element);
      }
    }
  });
}
addRoute(null, asyncRoutes);

// 4.0路由添加例子
// router.addRoute({ path: '/about', component: () => import("../layout/BasicsLayout.vue")})
// router.addRoute("about",{ path: '/info', component: () => import("../views/role/list.vue") })
export default router;
