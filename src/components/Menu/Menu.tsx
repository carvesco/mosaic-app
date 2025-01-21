import { useContext } from "react";
import "./Menu.sass";
import UploadImage from "./components/UploadImage";
import { ImageOptionsContext, ImageOptionsInterface } from "../../ImageContext";
import Select from "react-dropdown-select";
import { HexColorPicker } from "react-colorful";
import { Popover, PopoverTrigger, PopoverContent } from "@heroui/popover";
const renderingOptions = [
  {
    value: 1,
    label: "Original",
  },
  {
    value: 2,
    label: "Tiled",
  },
  {
    value: 3,
    label: "Tiled-Voronoi",
  },
];

const Menu = () => {
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
          max={100}
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
        <input
          className="dimension-input"
          type="text"
          value={imageOptions.width}
          onChange={(e) => {
            const newOptions: ImageOptionsInterface = {
              ...imageOptions,
              width: Number(e.target.value),
            };
            setImageOptions(newOptions);
          }}
        />
      </div>
      <div className="dimensions-container">
        <h4>Height</h4>
        <input
          type="range"
          className="slider"
          disabled={imageOptions.rendering.value === 1 ? true : false}
          min={20}
          max={100}
          value={imageOptions.height}
          onChange={(e) => {
            const newOptions: ImageOptionsInterface = {
              ...imageOptions,
              height: Number(e.target.value),
            };
            setImageOptions(newOptions);
          }}
        />
        <input
          className="dimension-input"
          type="text"
          value={imageOptions.height}
          onChange={(e) => {
            const newOptions: ImageOptionsInterface = {
              ...imageOptions,
              height: Number(e.target.value),
            };
            setImageOptions(newOptions);
          }}
        />
      </div>
      <div>
        <h3>Mosaic Options</h3>
        <h4>Type</h4>
        <Select
          values={[imageOptions.rendering]}
          className="select-rendering"
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
        <div className="border-checkbox">
          <h4
            style={{
              paddingBottom: 1,
              color: imageOptions.rendering.value === 1 ? "#9A9999" : "",
            }}
          >
            Borders
          </h4>
          <div className="checkbox-wrapper-3">
            <input
              disabled={imageOptions.rendering.value === 1 ? true : false}
              type="checkbox"
              id="cbx-3"
              checked={imageOptions.borders}
              onChange={() => {
                const newOptions: ImageOptionsInterface = {
                  ...imageOptions,
                  borders: !imageOptions.borders,
                };
                setImageOptions(newOptions);
              }}
            />
            <label htmlFor="cbx-3" className="toggle">
              <span></span>
            </label>
          </div>
          <h4
            style={{
              paddingBottom: 1,
              color: imageOptions.rendering.value === 1 ? "#9A9999" : "",
            }}
          >
            Border Color
          </h4>
          <Popover placement="bottom" showArrow={true}>
            <PopoverTrigger>
              <button
                disabled={imageOptions.rendering.value === 1 ? true : false}
                className="color-picker-button"
                style={{
                  backgroundColor:
                    imageOptions.rendering.value === 1 ||
                    imageOptions.borders === false
                      ? "#9A9999"
                      : imageOptions.bordersColor,
                }}
              />
            </PopoverTrigger>
            <PopoverContent>
              <HexColorPicker
                color={imageOptions.bordersColor}
                onChange={(e) => {
                  const newOptions: ImageOptionsInterface = {
                    ...imageOptions,
                    bordersColor: e,
                  };
                  setImageOptions(newOptions);
                }}
              />
            </PopoverContent>
          </Popover>
        </div>
        {/* <HexColorPicker color={color} onChange={setColor} />; */}
      </div>
    </div>
  );
};

export default Menu;
