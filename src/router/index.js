import { createRouter, createWebHashHistory } from "vue-router";

export default createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: () => import("@/views/HomePage.vue"),
    },
    {
      path: "/login",
      component: () => import("@/views/LoginPage.vue"),
    },
    {
      path: "/cart",
      component: () => import("@/views/ShoppingCart.vue"),
    },
    {
      path: "/order/detail/:id",
      component: () => import("@/views/OrderDetail.vue"),
    },
    {
      path: "/orders",
      component: () => import("@/views/MemberOrders.vue"),
    },
    {
      path: "/profile",
      component: () => import("@/views/MemberProfile.vue"),
    },
    {
      path: "/shop",
      component: () => import("@/views/ShopPage.vue"),
    },
    {
      path: "/:pathMatch(.*)*",
      component: () => import("@/views/NotFound.vue"),
    },
  ],
});
