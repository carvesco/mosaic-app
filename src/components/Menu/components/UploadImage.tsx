//drag and rop component from https://medium.com/@dprincecoder/creating-a-drag-and-drop-file-upload-component-in-react-a-step-by-step-guide-4d93b6cc21e0

import React from "react";
import { useState, useEffect, useContext } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { MdClear } from "react-icons/md";
import "./UploadImage.sass";
import { ImageContext } from "../../../ImageContext";

interface UploadImageProps {
  onFilesSelected: (files: File) => void;
  width?: number;
  height?: number;
}

const UploadImage: React.FC<UploadImageProps> = ({
  onFilesSelected,
  width,
  height,
}) => {
  const [image, setImage] = useState<File>();
  const { setImageCanvas } = useContext(ImageContext);

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const selectedFiles = event.dataTransfer.files;
    if (selectedFiles && selectedFiles.length > 0) {
      const newFiles = Array.from(selectedFiles);
      setImage(newFiles[0]);
      const newImageURL = URL.createObjectURL(newFiles[0]);
      setImageCanvas(newImageURL);
    }
  };
  const handleRemoveFile = () => {
    setImage(undefined);
  };
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (selectedFiles && selectedFiles.length > 0) {
      const newFiles = Array.from(selectedFiles);
      setImage(newFiles[0]);
      const newImageURL = URL.createObjectURL(newFiles[0]);
      setImageCanvas(newImageURL);
    }
  };

  useEffect(() => {
    if (image) {
      onFilesSelected(image);
    }
  }, [image, onFilesSelected]);
  return (
    <section className="drag-drop" style={{ width: width, height: height }}>
      <div
        className={`document-uploader ${
          image ? "upload-box active" : "upload-box"
        }`}
        onDrop={handleDrop}
        onDragOver={(event) => event.preventDefault()}
      >
        <div className="upload-info">
          <AiOutlineCloudUpload style={{ color: "#00afb9ff" }} />
          <div>
            <p>Drag and drop your Image here</p>
            <p>Supported files: .JPG and .PNG</p>
          </div>
        </div>
        {image && (
          <div className="file-list">
            <div className="file-list__container">
              <div className="file-item">
                <div className="file-info">
                  <p>{image.name}</p>
                  {/* <p>{file.type}</p> */}
                </div>
                <div className="file-actions">
                  <MdClear onClick={() => handleRemoveFile()} />
                </div>
              </div>
            </div>
          </div>
        )}
        {!image && (
          <>
            <input
              type="file"
              hidden
              id="browse"
              onChange={handleFileChange}
              accept=".png, .jpg, .jpeg"
            />
            <label htmlFor="browse" className="browse-btn">
              Browse Image
            </label>
          </>
        )}
        {/*  <div className="image-preview">
          {imageURLs && (
            <div style={{ backgroundColor: "white" }}>
              <img src={imageURLs} alt={`Uploaded image`} />
            </div>
          )}
        </div> */}
      </div>
    </section>
  );
};

export default UploadImage;
