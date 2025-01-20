import { createContext } from "react";

const defaultImage = "/1.jpg";

export const ImageContext = createContext<{
  imageCanvas: string;
  setImageCanvas: (url: string) => void;
}>({
  imageCanvas: defaultImage,
  setImageCanvas: () => {},
});

export interface ImageOptionsInterface {
  width: number;
  height: number;
  rendering: {
    value: number;
    label: string;
  };
}

export const ImageOptionsContext = createContext<{
  imageOptions: ImageOptionsInterface;
  setImageOptions: (options: ImageOptionsInterface) => void;
}>({
  imageOptions: {
    width: 50,
    height: 50,
    rendering: {
      value: 1,
      label: "Original",
    },
  },
  setImageOptions: () => {},
});
