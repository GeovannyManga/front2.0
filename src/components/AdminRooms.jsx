import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllRooms } from "../redux/actions";
import "../styles/DashboardAdmin.scss";
import DelRoomSweet from "./DelRoomSweet";
import { Sweet } from "./Sweet";
import EditRoomForm from "./EditRoomForm";
import DeleteUpdateRoom from "./DeleteUpdateRoom";
import CreateRoomForm from "./CreateRoomForm";

const AdminRooms = (props) => {
  const dispatch = useDispatch();

  const allRooms = useSelector((state) => state.rooms);

  useEffect(() => {
    dispatch(getAllRooms());
  }, [dispatch]);

  const [showRoomCreate, setShowRoomCreate] = useState(false);
  const [showEditRoom, setshowEditRoom] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);

  const handleShowRoomCreate = () => {
    setShowRoomCreate(true);
    setshowEditRoom(false);
  };

  const handleShowUpdateRoom = (room) => {
    setSelectedRoom(room);
    setshowEditRoom(true);
    setShowRoomCreate(false);
  };

  const handleClose = () => {
    setSelectedRoom(null);
    setShowRoomCreate(false);
    setshowEditRoom(false);
  };

  return (
    <div className="cont-admin-room" >
      <h2> Create, edit and delete rooms </h2>

      <div>
        <button onClick={handleShowRoomCreate}>Create new room</button>
      </div>

      {showRoomCreate && <CreateRoomForm show={showRoomCreate} handleClose={handleClose} />} {/*  muestra componente para crear room */}
      {showEditRoom && <EditRoomForm show={showEditRoom} handleClose={handleClose} room={selectedRoom} />}  {/*  muestra el componente para actualizar una room */}

      {allRooms.length > 0 ? (
        <DeleteUpdateRoom   allRooms = {allRooms} handleShowEditComponent = {handleShowUpdateRoom} DelRoomSweet ={DelRoomSweet} />
      ) : (
        <p>No rooms found.</p>
      )}
    </div>
  );
};

export default AdminRooms;
