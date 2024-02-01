export default [
  {
    path: "convert-image-to-text/:id",
    name: "ConvertImageToText",
    component: () => import("../ConvertImageToText.vue"),
  },
];
