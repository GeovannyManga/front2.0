import { React, useEffect, useState } from "react";
import CardRoomContainerDetail from "../components/CardRoomContainerDetail";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate, Await } from "react-router-dom";
import {
  getRoomDetail,
  localCarrito,
  checkReservationDates,
  carritoUser,
  carritoAddUser,
} from "../redux/actions";
import "../styles/Detail.scss";
import { useAuth } from "../context/authContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faHotel,
  faSackDollar,
} from "@fortawesome/free-solid-svg-icons";

const Detail = (props) => {
  const detail = useSelector((state) => state.detail);
  const dispatch = useDispatch();
  const id = useParams().id;
  const images = detail && detail.image;
  const featuredImage = images && detail.image[0];
  const lengthImages = detail.image ? images.length : 0;
  const { user } = useAuth();
  // const verified = user && user.emailVerified; // Comprobando que sea un usuario verificado
  // Emitiendo un alert para usuarios que no estén verificados o si no a iniciado sesión
  const carrito = useSelector((state) => state.carrito);
  const navigate = useNavigate();

  const [startDate, setStartDate] = useState(null);

  const conflict = useSelector((state) => state.dataConflict);

  const comprobacion = (date, startDate, id) => {
    setEndDate(date);
    dispatch(checkReservationDates(date, startDate, id));
  };

  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    dispatch(getRoomDetail(id));
  }, [dispatch, id, startDate, endDate]);

  const localCar = (start, end, idRoom) => {
    if (!user && conflict === true) {
      dispatch(localCarrito(start, end,idRoom));
      navigate("/checkout");
      return;
    }
  };

  //NO TOCAR ESTA MONDA, LOGICA MUY COMPLICADA
  const enviarCarrito = async () => {
    if (user && conflict === true) {
      const userMail = user.email;

      dispatch(carritoAddUser(userMail, startDate, endDate, id));
      dispatch(carritoUser(userMail));
      navigate("/checkout");
    } else {
      localCar(startDate, endDate, id);
    }
  };

  return (
    <div className="detail">
      {detail ? (
        <>
          <div className="overlay">
            <h1>{detail.name}</h1>
          </div>
          <div
            className="mainImageRoom"
            style={{ backgroundImage: `url(${featuredImage})` }}
          ></div>
          <div className="section">
            <div className="box-content">
              <div className="decription">
                <div className="metadatos">
                  <div className="fa-icons">
                    <FontAwesomeIcon icon={faHotel} />
                    <p>{detail.type}</p>
                  </div>
                  <div className="fa-icons">
                    <FontAwesomeIcon icon={faUsers} />
                    <p>{detail.guests}</p>
                  </div>
                  <div className="fa-icons">
                    <FontAwesomeIcon icon={faSackDollar} />
                    <p>${detail.price}</p>
                  </div>
                </div>
                <p>{detail.desctiption}</p>
                {lengthImages > 1 ? (
                  <div className="gallery">
                    {images.map(
                      (url, index) =>
                        index >= 1 && <img src={url} key={index} />
                    )}
                  </div>
                ) : (
                  ""
                )}
              </div>
              {!user ? (
                <div className="booking">
                  <div className="row">
                    <div className="input">
                      <p>From:</p>
                      <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        minDate={new Date()}
                        maxDate={
                          new Date(
                            new Date().setMonth(new Date().getMonth() + 6)
                          )
                        }
                        dateFormat="dd/MM/yyyy"
                        showYearDropdown
                        yearDropdownItemNumber={15}
                        placeholderText="Date of admission"
                        isClearable
                      />
                    </div>
                    <div className="input">
                      <p>To:</p>
                      <DatePicker
                        selected={endDate}
                        onChange={(date) => comprobacion(date, startDate, id)}
                        minDate={
                          startDate
                            ? new Date(startDate.getTime() + 86400000)
                            : new Date(new Date().getTime() + 86400000)
                        }
                        maxDate={
                          new Date(
                            new Date().setMonth(new Date().getMonth() + 6)
                          )
                        }
                        dateFormat="dd/MM/yyyy"
                        showYearDropdown
                        scrollableYearDropdown
                        yearDropdownItemNumber={15}
                        placeholderText="Return date"
                        isClearable
                      />
                    </div>
                  </div>
                  {conflict === false ? (
                    <p>La habitacion no esta disponible en estas fechas.</p>
                  ) : (
                    ""
                  )}
                  <button className="btn" onClick={() => localCar(startDate, endDate,id)}>Book this room!</button>
                </div>
              ) : (
                <div className="booking">
                  <div className="row">
                    <div className="input">
                      <p>From:</p>
                      <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        minDate={new Date()}
                        maxDate={
                          new Date(
                            new Date().setMonth(new Date().getMonth() + 6)
                          )
                        }
                        dateFormat="dd/MM/yyyy"
                        showYearDropdown
                        yearDropdownItemNumber={15}
                        placeholderText="Date of admission"
                        isClearable
                      />
                    </div>
                    <div className="input">
                      <p>To:</p>
                      <DatePicker
                        selected={endDate}
                        onChange={(date) => comprobacion(date, startDate, id)}
                        minDate={
                          startDate
                            ? new Date(startDate.getTime() + 86400000)
                            : new Date(new Date().getTime() + 86400000)
                        }
                        maxDate={
                          new Date(
                            new Date().setMonth(new Date().getMonth() + 6)
                          )
                        }
                        dateFormat="dd/MM/yyyy"
                        showYearDropdown
                        scrollableYearDropdown
                        yearDropdownItemNumber={15}
                        placeholderText="Return date"
                        isClearable
                      />
                    </div>
                  </div>
                  {conflict === false ? (
                    <p>La habitacion no esta disponible en estas fechas.</p>
                  ) : (
                    ""
                  )}
                  <button className="btn" onClick={() => enviarCarrito()}>
                    Book this room!
                  </button>
                </div>
              )}
            </div>

            <h1>More rooms</h1>
            <CardRoomContainerDetail type={detail.type} />
          </div>
        </>
      ) : (
        <>
          <div className="mainImageRooms">
            <div className="section">
              <p>Cargando información...</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Detail;
