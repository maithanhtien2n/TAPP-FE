import RoutesConvertImageToText from "../views/convert-image-to-text/services/routes";
import RoutesVirtualAssistant from "../views/virtual-assistant/services/routes";

export default [
  {
    path: "tool",
    name: "Tool",
    component: () => import("../Tool.vue"),
  },
  {
    path: "tool",
    name: "ToolDetail",
    component: () => import("../ToolDetail.vue"),
    children: [...RoutesConvertImageToText, ...RoutesVirtualAssistant],
  },
];
