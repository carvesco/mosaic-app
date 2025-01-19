import React from "react";
import "./Menu.sass";
import UploadImage from "./components/UploadImage";
interface MenuProps {
  // Define your props here
}

const Menu: React.FC<MenuProps> = (props) => {
  return (
    <div className="menu">
      <h2>Upload</h2>
      <UploadImage onFilesSelected={(image) => console.log(image)} />
      <h3>Grid Dimensions</h3>
      <div></div>
    </div>
  );
};

export default Menu;
