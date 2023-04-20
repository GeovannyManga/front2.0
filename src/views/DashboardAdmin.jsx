import React from "react";
import { useLocation } from "react-router-dom";
import "../styles/DashboardAdmin.scss";
import MainListItems from "../components/AdminNavBar";
import TopBarAdmin from "../components/AdminTopBar";
import AdminUsers from "../components/AdminUsers";
import AdminReview from "../components/AdminReviews";
import AdminRooms from "../components/AdminRooms";
import AdminOverview from "../components/AdminOverview";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import setTotalNot from "../redux/actions"
import axios from "axios";


const DashboardAdmin = () => {
  const location = useLocation();
  const count = useSelector(state => state.totalComments);
  const [numReviews, setNumReviews] = useState(count);  "aca guardo el numero de reviews en estado pending"

  const totreviewpending = async () => {
    const allUsers = (await axios.get(`/usuarios`)).data;
    const newReviews = [];
    allUsers.forEach((user) => {
      if (user.coments.length > 0) {
        user.coments.forEach((comment) => {
          if (comment.type && comment.type === "pending") {
            newReviews.push({
              ...comment,
              name: user.fullName,
              photoURL: user.image,
            });
          }
        });
      }
    });
    setNumReviews(newReviews.length);
    
 
  }
  totreviewpending()

const dispatch = useDispatch()
  dispatch(setTotalNot(numReviews))
  
  
  let locationFunction = (path) => {
    if (path === "/dashboard") return <AdminOverview />;
    if (path === "/dashboard/rooms") return <AdminRooms />;
    if (path === "/dashboard/users") return <AdminUsers />;
    if (path === "/dashboard/reviews") return <AdminReview totRevPending = {setNumReviews}/>;
  };

  let name = (path) => {
    if (path === "/dashboard/rooms") return "Room management";
    if (path === "/dashboard/users") return "Users";
    if (path === "/dashboard/reviews") return "Reviews";
    if (path === "/dashboard") return "Overview";
  };

  return (
    <div className="main-container-admin">
      <div className="left-container">
        <MainListItems />
      </div>

      <div className="rg-main-container">
        <div className="rgd-container">
          <TopBarAdmin   totPendRev={numReviews}  place={name(location.pathname)   } />
        </div>

        <div className="dashboard">{locationFunction(location.pathname)}</div>
      </div>
    </div>
  );
};

export default DashboardAdmin;
