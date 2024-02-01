export default [
  {
    path: "virtual-assistant/:id",
    name: "VirtualAssistant",
    component: () => import("../VirtualAssistant.vue"),
  },
  {
    path: "virtual-assistant/:id/config",
    name: "VirtualAssistantConfig",
    component: () => import("../VirtualAssistantConfig.vue"),
  },
  {
    path: "virtual-assistant/:id/chat",
    name: "VirtualAssistantChat",
    component: () => import("../VirtualAssistantChat.vue"),
  },
];
