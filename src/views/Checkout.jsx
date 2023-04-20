import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CheckoutForm from "../components/CheckoutForm";
import "../styles/Checkout.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  restoreCartFromLocalStorage,
  carritoUser,
  deleteCar,
  deleteLocalStorage,
} from "../redux/actions";
import { useAuth } from "../context/authContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

const checkOut = (props) => {
  const { user } = useAuth();
  const dispatch = useDispatch();

  const carrito = useSelector((state) => state.carrito);

  useEffect(() => {
    dispatch(restoreCartFromLocalStorage("carrito"));
    if (user && user.email) {
      const userMail = user.email;
      dispatch(carritoUser(userMail));
    }
  }, [dispatch, user]);

  const borrarLocal = (id) => {
    dispatch(deleteLocalStorage(id, carrito));
  };

  const deleteData = async (id) => {
    if (user && user.email) {
      const userMail = user.email;

      await dispatch(deleteCar(userMail, id));
      await dispatch(carritoUser(userMail));
    }
  };
  useEffect(() => {
    dispatch(restoreCartFromLocalStorage("carrito"));
    if (user && user.email) {
      const userMail = user.email;
      dispatch(carritoUser(userMail));
    }
  }, [dispatch]);



   const PaymentSuccess = () => {
    const dispatch = useDispatch();
    const { user } = useAuth();
  
    if (user) {
      dispatch(getUserCar(user.email))
    }
  
    window.location.href = "/";
  };

  return (
    <section className="section checkout">
      <div className="header">
        <Link to="/rooms">
          <button className="back">Keep Booking</button>
        </Link>
      </div>
      <div className="detail">
        <h1 className="title">Shopping cart</h1>
        {carrito?.map((carrito, index) => (
          <div className="item-room" key={carrito.id}>
            <img src={carrito.image} alt={carrito.name} width="300em" />
            <div className="description">
              <p>name: {carrito.name}</p>
              <p>precio dia: {carrito.price}</p>
              <p>dias: {carrito.dias}</p>
              <p>total: {carrito.total}</p>
            </div>

            {!user && (
              <button
                className="deleted"
                onClick={() => borrarLocal(index)}
              >
                <FontAwesomeIcon icon={faTrashCan} />
              </button>
            )}
            {user && (
              <button
                className="deleted"
                onClick={() => deleteData(carrito.id)}
              >
                <FontAwesomeIcon icon={faTrashCan} />
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="txt-container">
        <CheckoutForm />
      </div>
    </section>
  );
};

export default checkOut;

//hola