import React, { useState } from "react";
import { SweetupdateRoom } from "./Sweet";
import UploadWidgetCloud from "./UploadWidgetCloud";

const EditRoomForm = ({ room, handleClose }) => {
  const [name, setName] = useState(room.name);
  const [description, setDescription] = useState(room.description);
  const [capacity, setCapacity] = useState(room.guests);
  const [price, setPrice] = useState(room.price);
  const [type, setType] = useState(room.type);
  const [status, setStatus] = useState(room.status);
  const [urlImage, setUrlImage] = useState(room.image);
  const [newUrlImg, setNewUrlImage] = useState([]);

  const handleDeleteImage = (imageUrl) => {
    // Eliminar la imagen de la lista de imágenes
    const updatedImages = [...urlImage, ...newUrlImg].filter(
      (img) => img !== imageUrl
    );
    setUrlImage(updatedImages.slice(0, urlImage.length));
    setNewUrlImage(updatedImages.slice(urlImage.length));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedImages = [...urlImage, ...newUrlImg];
    // Actualizar la información de la habitación
    ;

    
    console.log("esta es la room actualizada",  {
      name,
      description,
      image: updatedImages,
      capacity,
      price,
      type,
      status,
    })
    // Aquí deberías enviar la información actualizada al servidor
    // ...falta crear la ruta patch para actualizar
    SweetupdateRoom(room._id,  {
      name,
      description,
      image: updatedImages,
      capacity,
      price,
      type,
      status,
    })
    handleClose();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit room</h2>
      <label htmlFor="name">Name:</label>
      <input
        type="text"
        id="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label htmlFor="description">Description</label>
      <textarea
        id="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <label htmlFor="capacity">Capacity : </label>
      <input
        type="number"
        id="capacity"
        value={capacity}
        onChange={(e) => setCapacity(parseInt(e.target.value))}
      />

      <label htmlFor="price">Price</label>
      <input
        type="number"
        id="price"
        value={price}
        onChange={(e) => setPrice(parseInt(e.target.value))}
      />

      <label htmlFor="type">Type</label>
      <select
        id="type"
        value={type}
        onChange={(e) => setType(e.target.value)}
      >
        <option value="familiar">Familiar</option>
        <option value="individual">Individual</option>
        <option value="matrimonial">Matrimonial</option>
      </select>

      <label htmlFor="image">Image: </label>

      <div>
        <UploadWidgetCloud handleUploadImg={setNewUrlImage} />
        {/* Mostrar las imágenes existentes y las nuevas imágenes */}
        {[...urlImage, ...newUrlImg].map((imageUrl) => (
          <div key={imageUrl}>
            <img
              src={imageUrl}
              alt="image not found"
              style={{ width: "200px", height: "auto" }}
            />
            <button onClick={() => handleDeleteImage(imageUrl)}>
             X
            </button>
          </div>
        ))}
      </div>

      <button type="submit">Save Changes</button>
      <button type="button" onClick={handleClose}>
        Cancel
      </button>
    </form>
  );
};

export default EditRoomForm;
