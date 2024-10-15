import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

/* Layout */
import Layout from "@/layout";
import mLayout from "@/layout/mainLayout.vue";

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: "/login",
    component: () => import("@/views/login/index"),
    hidden: true,
  },

  {
    path: "/userInfo",
    component: () => import("@/views/user/userinfo"),
    hidden: true,
  },
  {
    path: "/dashboard",
    component: () => import("@/views/dashboard/index"),
    hidden: true,
  },
  //  {
  //     path: "/home",
  //    name: "/home",
  //     component: () => import("@/views/home/index"),
  //     meta: {
  //       title: "home",
  //       icon: "dashboard",
  //     },
  //   },

  {
    path: "/",
    component: Layout,
    redirect: "/main/writepaper",
    // children: [
    //   {
    //     path: "home",
    //     name: "home",
    //     component: () => import("@/views/home/index"),
    //     meta: {
    //       title: "home",
    //       icon: "dashboard",
    //     },
    //   },
    // ],
  },

  {
    path: "/paper",
    component: Layout,
    redirect: "/paper/preview",
    children: [
      {
        path: "preview",
        name: "preview",
        component: () => import("@/views/paperpreview/index"),
        meta: {
          title: "范文样例",
          icon: "dashboard",
        },
      },
      {
        path: "reduceRepetiton",
        name: "reduceRepetiton",
        component: () => import("@/views/reduceRepetition/index"),
        meta: {
          title: "智能降重",
          icon: "dashboard",
        },
      },
    ],
  },
  // {
  //   path: '/paper',
  //   component: Layout,
  //   redirect: '/paper/reduceRepetiton',
  //   children: []
  // },

  // {
  //   path: '/reduceRepetiton',
  //   component: () => import('@/views/reduceRepetition/index'),
  //   hidden: true
  // },
  {
    path: "/home",
    component: Layout,
    children: [
      {
        path: "home",
        name: "home",
        component: () => import("@/views/home/index"),

        meta: {
          title: "home",
          icon: "dashboard",
        },
      },
    ],
    hidden: true,
  },
  {
    path: "/user",
    component: Layout,
    children: [
      {
        path: "promotion",
        name: "promotion",
        component: () => import("@/views/user/index.vue"),

        meta: {
          title: "promotion",
          icon: "dashboard",
        },
      },
    ],
    hidden: true,
  },

  {
    path: "/main",
    component: mLayout,
    redirect: "/main/explore",
    name: "main",
    meta: {
      title: "main",
      icon: "el-icon-s-help",
    },
    children: [
      {
        path: "explore",
        name: "explore",
        component: () => import("@/views/explore/index"),
        meta: {
          keepAlive: true,
          title: "explore",
          icon: "table",
          sideBarIndex: 5,
        },
      },
      {
        path: "writepaper",
        name: "writepaper",
        component: () => import("@/views/writepaper/index"),
        meta: {
          title: "writepaper",
          keepAlive: true,
          icon: "tree",
          sideBarIndex: 1,
        },
      },
      // 读论文
      {
        path: "readpaper",
        name: "readpaper",
        component: () => import("@/views/readpaper/index"),
        meta: {
          keepAlive: true,
          title: "readpaper",
          icon: "tree",
          sideBarIndex: 2,
          underDevelopment: true,
        },
      },
      // 改论文
      {
        path: "amendpaper",
        name: "amendpaper",
        component: () => import("@/views/amendpaper/index"),
        meta: {
          title: "amendpaper",
          keepAlive: true,
          icon: "tree",
          sideBarIndex: 3,
          underDevelopment: true,
        },
      },
      // 综合服务
      {
        path: "integratedservices",
        name: "integratedservices",
        component: () => import("@/views/integratedservices/index"),
        meta: {
          keepAlive: true,
          title: "integratedservices",
          icon: "tree",
          sideBarIndex: 4,
          underDevelopment: true,
        },
      },
      // ai工具
      {
        path: "aitools",
        name: "aitools",
        component: () => import("@/views/aitools/index"),
        meta: {
          title: "aitools",
          keepAlive: true,
          icon: "tree",
          sideBarIndex: 6,
          underDevelopment: true,
        },
      },
      // 降重/降aigc率
      {
        path: "reduceRepetition",
        name: "reduceRepetition",
        component: () => import("@/views/reduceRepetition/index.vue"),
        meta: {
          title: "reduceRepetition",
          icon: "tree",
          sideBarIndex: 7,
          keepAlive: true,
        },
      },
    ],
  },

  {
    path: "/404",
    component: () => import("@/views/404"),
    hidden: true,
  },
  // 404 page must be placed at the end !!!
  {
    path: "*",
    redirect: "/404",
    hidden: true,
  },
];

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({
      y: 0,
    }),
    routes: constantRoutes,
  });

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
