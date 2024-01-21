import axios, { AxiosInstance } from "axios";
import { pixabayApiKey, pixabayUrl } from "../constants";

export const api: AxiosInstance = axios.create({
  baseURL: `${pixabayUrl}/?key=${pixabayApiKey}`,
});
