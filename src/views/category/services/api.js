import { AxiosInstance } from "@/services/api";

export * from "../views/convert-image-to-text/services/api";
export * from "../views/virtual-assistant/services/api";

class ApiCategory {
  getListTool = async () => {
    return await AxiosInstance({
      method: "GET",
      url: "category",
    });
  };

  getToolDetail = async (param) => {
    return await AxiosInstance({
      method: "GET",
      url: `category/${param}`,
    });
  };

  plusAmountTool = async (param) => {
    return await AxiosInstance({
      method: "PUT",
      url: `category/plus-amount/${param}`,
    });
  };
}

export const API_CATEGORY = new ApiCategory();
