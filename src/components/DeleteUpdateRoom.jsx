import React, { useState } from "react";
import "../styles/DeleteUpdateRoom.scss";

const DeleteUpdateRoom = ({ allRooms, handleShowEditComponent, DelRoomSweet }) => {
  const [rooms, setRooms] = useState(allRooms);

  const toggleRoomStatus = async (roomId) => {
    const updatedRoom = rooms.find((room) => room._id === roomId);
    updatedRoom.status = !updatedRoom.status;

    const success = await DelRoomSweet(roomId, updatedRoom.status);
    if (success) {
      setRooms([...rooms]);
    }
  };

  return (
    <div className="cont-gral">
      {rooms.map((room) => {
        const buttonClassName = room.status ? "disable" : "enable";
        const buttonText = room.status ? "disable" : "enable";
        return (
          <div className="cont-card" key={room._id}>
            <img src={room.image[0]} alt={`Habitación ${room.name}`} />
            <div>
              <h4>{room.name}</h4>
              <div className="all-btn">
                <button className="btn-update" onClick={() => handleShowEditComponent(room)}>
                  Update
                </button>
                <button className={`btn-${buttonClassName}`} onClick={() => toggleRoomStatus(room._id)}>
                  {buttonText}
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DeleteUpdateRoom;
