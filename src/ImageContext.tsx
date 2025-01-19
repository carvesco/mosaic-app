import { createContext } from "react";

const defaultImage = "/1.jpg";

export const ImageContext = createContext({
  imageCanvas: defaultImage,
  setImageCanvas: (url: string) => {},
});
