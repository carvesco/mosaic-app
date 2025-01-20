import { createContext } from "react";

const defaultImage = "/1.jpg";

export const ImageContext = createContext({
  imageCanvas: defaultImage,
  setImageCanvas: (url: string) => {},
});

export interface ImageOptionsInterface {
  width: number;
  height: number;
}

export const ImageOptionsContext = createContext<{
  imageOptions: ImageOptionsInterface;
  setImageOptions: (options: ImageOptionsInterface) => void;
}>({
  imageOptions: {
    width: 50,
    height: 50,
  },
  setImageOptions: () => {},
});
