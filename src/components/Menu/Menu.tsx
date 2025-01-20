import React from "react";
import { useState, useContext } from "react";
import "./Menu.sass";
import UploadImage from "./components/UploadImage";
import { ImageOptionsContext, ImageOptionsInterface } from "../../ImageContext";

interface MenuProps {
  // Define your props here
}

const Menu: React.FC<MenuProps> = (props) => {
  const [gridWidth, setGridWidth] = React.useState(50);
  const [gridHeight, setGridHeight] = React.useState(50);
  const { imageOptions, setImageOptions } = useContext(ImageOptionsContext);
  return (
    <div className="menu">
      <h2>Upload</h2>
      <UploadImage onFilesSelected={(image) => console.log(image)} />
      <h3>Grid Dimensions</h3>
      <div className="dimensions-container">
        <h4>Width</h4>
        <input
          type="range"
          className="slider"
          value={imageOptions.width}
          onChange={(e) => {
            const newOptions: ImageOptionsInterface = {
              ...imageOptions,
              width: Number(e.target.value),
            };
            setImageOptions(newOptions);
          }}
        />
        <h4>{imageOptions.width}</h4>
      </div>
      <div className="dimensions-container">
        <h4>Height</h4>
        <input
          type="range"
          className="slider"
          value={imageOptions.height}
          onChange={(e) => {
            const newOptions: ImageOptionsInterface = {
              ...imageOptions,
              height: Number(e.target.value),
            };
            setImageOptions(newOptions);
          }}
        />
        <h4>{imageOptions.height}</h4>
      </div>
    </div>
  );
};

export default Menu;
