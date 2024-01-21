import { api } from "./api";
export const fetchImages = async (query: URLSearchParams) => {
  try {
    const response = await api.get("", { params: query });
    return response.data;
  } catch (err) {
    console.error(err);
  }
};
