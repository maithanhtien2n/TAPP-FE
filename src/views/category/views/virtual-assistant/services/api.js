import { AxiosInstance } from "@/services/api";

class ApiVirtualAssistant {
  getVirtualAssistant = async (param, noLoading = false) => {
    return await AxiosInstance({
      method: "GET",
      url: `virtual-assistant/train/${param}`,
      noLoading,
    });
  };

  saveVirtualAssistant = async (args) => {
    return await AxiosInstance({
      method: "POST",
      url: `virtual-assistant/train`,
      data: args,
    });
  };

  chat = async (args) => {
    console.log(args);
    return await AxiosInstance({
      method: "POST",
      url: `virtual-assistant/chat`,
      data: {
        userId: args?.userId || "",
        contents: args?.contents || [],
      },
      noLoading: true,
    });
  };

  checkLinkChat = async (param) => {
    return await AxiosInstance({
      method: "GET",
      url: `virtual-assistant/check-link-chat/${param}`,
    });
  };
}

export const API_VIRTUAL_ASSISTANT = new ApiVirtualAssistant();
