import { useState } from "react";
//import "./App.css";
import "./App.sass";
import Menu from "./components/Menu/Menu";
import ImageCanvas from "./components/Canvas/ImageCanvas";
import { ImageContext } from "./ImageContext";

function App() {
  const [imageCanvas, setImageCanvas] = useState("/1.jpg");
  const value = { imageCanvas, setImageCanvas };

  return (
    <>
      <h1 className="app-title">MosaicApp</h1>
      <p>Convert the image you want into a mosaic with different options.</p>
      <div className="menu-canvas-container">
        <ImageContext.Provider value={value}>
          <Menu />
          <ImageCanvas />
        </ImageContext.Provider>
      </div>
    </>
  );
}

export default App;
