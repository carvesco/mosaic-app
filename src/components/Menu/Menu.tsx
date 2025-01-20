import React from "react";
import { useState, useContext } from "react";
import "./Menu.sass";
import UploadImage from "./components/UploadImage";
import { ImageOptionsContext, ImageOptionsInterface } from "../../ImageContext";
import Select from "react-dropdown-select";
const renderingOptions = [
  {
    value: 1,
    label: "Original",
  },
  {
    value: 2,
    label: "Tiled",
  },
];
interface MenuProps {
  // Define your props here
}

const Menu = (props: MenuProps) => {
  const [selectedImgOption, setSelectedImgOption] = useState([
    {
      value: 1,
      label: "Original",
    },
  ]);
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
          min={20}
          max={200}
          disabled={imageOptions.rendering.value === 1 ? true : false}
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
          disabled={imageOptions.rendering.value === 1 ? true : false}
          min={20}
          max={200}
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
      <div>
        <h3>Mosaic Options</h3>
        <Select
          values={[imageOptions.rendering]}
          color="#0081a7ff"
          style={{ color: "#0081a7ff", border: "2px solid #00afb9ff" }}
          options={renderingOptions}
          onChange={(values) => {
            const newOptions: ImageOptionsInterface = {
              ...imageOptions,
              rendering: values[0],
            };
            setImageOptions(newOptions);
          }}
        />
      </div>
    </div>
  );
};

export default Menu;
