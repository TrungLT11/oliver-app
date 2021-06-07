import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const router = new Router({
  mode: "hash",
  base: process.env.BASE_URL,
  routes: [
    {
      name: "Login",
      path: "/login",
      component: () => import("@/pages/login/Index")
    },
    {
      path: "/",
      component: () => import("@/pages/layout/Index"),
      children: [
        // Dashboard
        {
          name: "Order List",
          path: "",
          component: () => import("@/pages/orders-list/Index")
        },
        // Pages
        {
          name: "New Order",
          path: "order/new",
          component: () => import("@/pages/order-form/NewOrder")
        },
        {
          name: "Transfer List",
          path: "transfer",
          component: () => import("@/pages/transfer-list/Index")
        },
        {
          name: "Exchange List",
          path: "exchange",
          component: () => import("@/pages/exchange/Index")
        },
        {
          name: "User List",
          path: "user",
          component: () => import("@/pages/user-list/Index")
        },
        {
          name: "Statistic",
          path: "statistic",
          component: () => import("@/pages/statistic/Index")
        },
        {
          name: "Notifications",
          path: "components/notifications",
          component: () => import("@/views/dashboard/component/Notifications")
        },
        {
          name: "Icons",
          path: "components/icons",
          component: () => import("@/views/dashboard/component/Icons")
        },
        {
          name: "Typography",
          path: "components/typography",
          component: () => import("@/views/dashboard/component/Typography")
        },
        // Tables
        {
          name: "Regular Tables",
          path: "tables/regular-tables",
          component: () => import("@/views/dashboard/tables/RegularTables")
        },
        // Maps
        {
          name: "Google Maps",
          path: "maps/google-maps",
          component: () => import("@/views/dashboard/maps/GoogleMaps")
        }
      ]
    }
  ]
});

router.beforeEach((to, from, next) => {
  const isAuthorized = localStorage.getItem("token");
  const toLogin = to.name === "Login";
  if (!isAuthorized && !toLogin) {
    return next({ path: "/login", query: { redirect: to.path } });
  }
  next();
});

export default router;
