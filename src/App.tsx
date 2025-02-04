import { useState } from "react";
//import "./App.css";
import "./App.sass";
import Menu from "./components/Menu/Menu";
import ImageCanvas from "./components/Canvas/ImageCanvas";
import { ImageContext } from "./ImageContext";
import { ImageOptionsContext } from "./ImageContext";
import { FaGithub } from "react-icons/fa";

function App() {
  const [imageCanvas, setImageCanvas] = useState("/1.jpg");
  const currentYear = new Date().getFullYear();
  const [imageOptions, setImageOptions] = useState({
    width: 50,
    height: 50,
    rendering: {
      value: 1,
      label: "Original",
    },
    borders: false,
    bordersColor: "#aabbcc",
  });
  const value = { imageCanvas, setImageCanvas };
  const optionsValue = { imageOptions, setImageOptions };

  return (
    <>
      <h1 className="app-title">MOSAICARV</h1>
      <p>Convert the image you want into a mosaic with different options.</p>
      <div className="menu-canvas-container">
        <ImageContext.Provider value={value}>
          <ImageOptionsContext.Provider value={optionsValue}>
            <Menu />
            <ImageCanvas />
          </ImageOptionsContext.Provider>
        </ImageContext.Provider>
      </div>
      <footer>
        <p>Developed by CARVESCO &copy; {currentYear}</p>
        <div>
          <a href="https://github.com/carvesco/mosaic-app" target="_blank">
            <FaGithub className="footer-icon" />
          </a>
        </div>
      </footer>
    </>
  );
}

export default App;
