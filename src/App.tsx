import { useState } from "react";
//import "./App.css";
import "./App.sass";
import Menu from "./components/Menu/Menu";
import ImageCanvas from "./components/Canvas/ImageCanvas";
import { ImageContext } from "./ImageContext";
import { ImageOptionsContext } from "./ImageContext";
import { render } from "sass";

function App() {
  const [imageCanvas, setImageCanvas] = useState("/1.jpg");
  const [imageOptions, setImageOptions] = useState({
    width: 20,
    height: 50,
    rendering: {
      value: 1,
      label: "Original",
    },
  });
  const value = { imageCanvas, setImageCanvas };
  const optionsValue = { imageOptions, setImageOptions };

  return (
    <>
      <h1 className="app-title">MosaicApp</h1>
      <p>Convert the image you want into a mosaic with different options.</p>
      <div className="menu-canvas-container">
        <ImageContext.Provider value={value}>
          <ImageOptionsContext.Provider value={optionsValue}>
            <Menu />
            <ImageCanvas />
          </ImageOptionsContext.Provider>
        </ImageContext.Provider>
      </div>
    </>
  );
}

export default App;
