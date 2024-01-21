import { useQuery } from "@tanstack/react-query";
import { fetchImages } from "../api";
import { ImageResponse } from "../types";
export const useGetSearchResults = (searchParams: URLSearchParams) => {
  return useQuery<ImageResponse>({
    queryKey: ["getimages", searchParams.get("q")],
    queryFn: () => fetchImages(searchParams),
  });
};
