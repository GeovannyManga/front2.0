import React from "react";
import { Link } from "react-router-dom";
import "../styles/DashboardAdmin.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGauge,
  faHotel,
  faUsers,
  faCommentDots,
} from "@fortawesome/free-solid-svg-icons";

const MainListItems = () => {
  return (
    <div className="left-title">
      <div className="logo">
        <Link to="/home">
          <h3>
            Mirador <br /> Tayrona Park
          </h3>
        </Link>
      </div>

      <div className="dashboard-items">
        <div className="items-icons">
          <Link to="/dashboard">
            <FontAwesomeIcon icon={faGauge} />
            Overview
          </Link>
        </div>

        <div className="items-icons">
          <Link to="/dashboard/rooms">
            <FontAwesomeIcon icon={faHotel} />
            Rooms
          </Link>
        </div>

        <div className="items-icons">
          <Link to="/dashboard/users">
            <FontAwesomeIcon icon={faUsers} />
            Users
          </Link>
        </div>

        <div className="items-icons">
          <Link to="/dashboard/reviews">
            <FontAwesomeIcon icon={faCommentDots} />
            Reviews
          </Link>
        </div>
      </div>

      <div>
        <Link to="/home">
          <button>Back Home</button>
        </Link>
      </div>
    </div>
  );
};

export default MainListItems;
