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
      <UploadImage onFilesSelected={(files) => console.log(files)} />
    </div>
  );
};

export default Menu;
