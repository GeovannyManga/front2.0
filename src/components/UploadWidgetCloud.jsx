import { useEffect, useRef } from "react";

const UploadWidgetCloud = ({ handleUploadImg }) => {
  const CloudinaryRef = useRef();
  const widgetRef = useRef();

  useEffect(() => {
    CloudinaryRef.current = window.cloudinary;

    widgetRef.current = CloudinaryRef.current.createUploadWidget(
      {
        cloudName: "hoteltayronapruebas",
        uploadPreset: "hotelTayronaPrubas",
        multiple: true // Permite subir varias imágenes
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          console.log("Uploaded in Cloudinary!");
          console.log(result.info);
          const urlImgUplo = result.info.secure_url;
          handleUploadImg(prevState => [...prevState, urlImgUplo]); // Agregar la URL al array del estado del componente contenedor
        }
      }
    );
  }, [handleUploadImg]);

  const handleUploadClick = (e) => {
    e.preventDefault();
    if (widgetRef.current) {
      widgetRef.current.open();
    }
  };

  return (
    <div>
      <button onClick={(e) => handleUploadClick(e)}>Upload image</button>
    </div>
  );
};

export default UploadWidgetCloud;
