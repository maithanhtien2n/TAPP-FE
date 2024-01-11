import { AxiosInstance } from "@/services/api";

class ApiConvertImageToText {
  convertImageToText = async (args) => {
    return await AxiosInstance({
      method: "POST",
      url: "convert-image-to-text",
      data: {
        image: args?.image?.base64.split(",")[1],
        language: "vie",
      },
    });
  };
}

export const API_CONVERT_IMAGE_TO_TEXT = new ApiConvertImageToText();
