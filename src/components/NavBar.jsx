import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/NavBar.scss";
import { useAuth } from "../context/authContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { carItemsNumber, getAllUsers } from "../redux/actions";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  faUserTie,
  faArrowRightFromBracket,
  faArrowRightToBracket,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";

const NavBar = (props) => {
  const dispatch = useDispatch();
  const { user, logout } = useAuth();

  const itemsCartLogin = useSelector((state) => state.carItems);

  const users = useSelector((state) => state.users);
  const adminUsers = users.filter((user) => user.type === "admin");
  const adminUsersAndCurrent = adminUsers.filter(
    (us) => us.email === user?.email
  );
  const notBloquedUsers = users.filter((user) => user.type !== "block");
  const notBloquedUsersAndCurrent = notBloquedUsers.filter(
    (us) => us.email === user?.email
  );

  const [itemsLocal, setItemsLocal] = useState(0);

  const userMail = user;

  useEffect(() => {
    if (user) {
      dispatch(carItemsNumber(userMail));
    }
  }, [dispatch, userMail]);

  useEffect(() => {
    const carritoLocal = localStorage.getItem("carrito");
    const carritoObjeto = JSON.parse(carritoLocal);
    if (carritoObjeto && carritoObjeto.length) {
      const totItems = carritoObjeto.length;
      setItemsLocal(totItems);
    } else {
      setItemsLocal(0);
    }
  }, [itemsLocal]);

  const navigate = useNavigate();
  window.scrollTo(0, 0);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  return (
    <div className="navbar">
      <div className="container-navbar">
        <div className="logo">
          <Link to="/home">
            Mirador <br /> Tayrona Park
          </Link>
        </div>
        <div className="items-menu">
          <Link to="/home">Home</Link>

          <Link to="/rooms">Rooms & Services</Link>

          {adminUsersAndCurrent.length > 0 && (
            <Link to="/dashboard">Dashboard</Link>
          )}

          {user && (
            // Cuando hay un usuario Logueado
            <>
              <p className="user-name">
                {user.displayName
                  ? `Hi ${user.displayName.split(" ")[0]}!`
                  : "Howdy"}
              </p>
              {user.photoURL ? (
                <img className="photo-user" src={user.photoURL} alt="perfil" />
              ) : (
                <FontAwesomeIcon
                  className="profile-incognito"
                  icon={faUserTie}
                />
              )}

              {users && notBloquedUsersAndCurrent.length > 0 && (
                <Link to="/checkout">
                  <FontAwesomeIcon icon={faShoppingCart} />
                  <span className="cart-count">{itemsCartLogin <= 0 ? "" : itemsCartLogin}</span>
                </Link>
              )}

              {/* < CartLink user={user}/> */}
              <a href="#!" onClick={handleLogout}>
                <FontAwesomeIcon
                  className="logout"
                  icon={faArrowRightFromBracket}
                />
              </a>
            </>
          )}
          {!user && (
            // Cuando no hay usuario logueado

            <>
              <FontAwesomeIcon className="login" icon={faArrowRightToBracket} />
              <div className="dropdown">
                <Link to="/login">Sign in</Link>
                <Link to="/loginCreate">Sign Up</Link>
              </div>

              <Link to="/checkout">
                <FontAwesomeIcon icon={faShoppingCart} />
                <span className="cart-count">{itemsLocal}</span>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
