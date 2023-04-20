import { useEffect } from "react";
import CardRoom from "./CardRoom";
import "../styles/CardsRoomContainer.scss";
import { useDispatch, useSelector } from "react-redux";

import { getAllRooms } from "../redux/actions";

const CardRoomContainerDetail = ({ type }) => {
  const dispatch = useDispatch();
  const allRooms = useSelector((state) => state.rooms);
  const filteredRooms = allRooms.filter((room) => room.type === type);
  const approvedRooms = filteredRooms.filter((room) => room.status === true);

  useEffect(() => {
    dispatch(getAllRooms());
  }, [dispatch]);

  return (
    <div>
      <div className="container">
        {approvedRooms?.map((room, index) => {
          return (
            index < 2 && (
              <CardRoom
                key={index}
                id={room._id}
                image={room.image}
                guests={room.guests}
                name={room.name}
                price={room.price}
                type={room.type}
              />
            )
          );
        })}
      </div>
    </div>
  );
};

export default CardRoomContainerDetail;
