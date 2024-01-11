export default [
  {
    path: "account-info",
    name: "AccountInfo",
    component: () => import("../AccountInfo.vue"),
  },
  {
    path: "topup",
    name: "Topup",
    component: () => import("../Topup.vue"),
  },
];
