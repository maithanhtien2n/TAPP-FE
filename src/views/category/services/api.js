import { AxiosInstance } from "@/services/api";

export * from "../views/convert-image-to-text/services/api";
export * from "../views/virtual-assistant/services/api";

class ApiCategory {
  getListTool = async (noLoading = false) => {
    return await AxiosInstance({
      method: "GET",
      url: "category",
      noLoading,
    });
  };

  getToolDetail = async (param) => {
    return await AxiosInstance({
      method: "GET",
      url: `category/${param}`,
      noLoading: true,
    });
  };

  plusAmountTool = async (param) => {
    return await AxiosInstance({
      method: "PUT",
      url: `category/plus-amount/${param}`,
    });
  };

  saveTool = async (args) => {
    return await AxiosInstance({
      method: "PUT",
      url: `category?toolId=${args?._id || ""}`,
      data: {
        image: args?.image
          ? args?.image?.base64.split(":")[0] === "data"
            ? args?.image
            : null
          : null,
        title: args?.title || "",
        routeName: args?.routeName || "",
        isProTool: args?.isProTool || false,
      },
    });
  };

  deleteTool = async (param) => {
    return await AxiosInstance({
      method: "DELETE",
      url: `category/${param}`,
    });
  };

  checkProTool = async (toolId) => {
    return await AxiosInstance({
      method: "PUT",
      url: `category/check/pro-tool`,
      headers: {
        ToolId: toolId,
      },
      noLoading: true,
    });
  };
}

export const API_CATEGORY = new ApiCategory();
