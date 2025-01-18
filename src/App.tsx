import { useState } from "react";
//import "./App.css";
import "./App.sass";
import Menu from "./components/Menu/Menu";
import ImageCanvas from "./components/Canvas/ImageCanvas";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1 className="app-title">MosaicApp</h1>
      <p>Convert the image you want into a mosaic with different options.</p>
      <div className="menu-canvas-container">
        <Menu />
        <ImageCanvas />
      </div>
    </>
  );
}

export default App;
