export * as IService from "./api";
export * from "./enums";
export * as IModel from "./models";
export interface User {
  email: string;
  firstname: string;
  lastname: string;
}

export interface Image {
  id: number;
  pageURL: string;
  type: string;
  tags: string;
  previewURL: string;
  previewWidth: number;
  previewHeight: number;
  webformatURL: string;
  webformatWidth: number;
  webformatHeight: number;
  largeImageURL: string;
  fullHDURL: string;
  imageURL: string;
  imageWidth: number;
  imageHeight: number;
  imageSize: number;
  views: number;
  downloads: number;
  likes: number;
  comments: number;
  user_id: number;
  user: string;
  userImageURL: string;
}
export interface ImageResponse {
  total: number;
  totalHits: number;
  hits: Image[];
}
