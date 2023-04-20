import React, { useState } from "react";
import CardRoomContainer from "../components/CardsRoomContainer";
import CardServicesContainer from "../components/CardsServicesContainer";
import "../styles/Rooms.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  filterByAvailableDate,
  getType,
  orderByPrice,
  reset,
} from "../redux/actions";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// Filter by Room Type
const rooms = (props) => {
  const dispatch = useDispatch();
  const handlermaxType = (e) => {
    const type = e.target.value;
    paged(1);
    dispatch(getType(type));
  };

  // Order by price
  const handlerMaxPrce = (e) => {
    const price = e.target.value;
    paged(1);
    dispatch(orderByPrice(price));
  };

  //Filter by available date
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const comprobacion = (startDate, endDateInput) => {
    setEndDate(endDateInput);
    paged(1);
    dispatch(filterByAvailableDate(startDate, endDateInput));
  };

  //Control del paginado
  const [currentPage, setCurentPage] = useState(1);
  const roomsPerPage = 4;
  const indexOfLastRoom = currentPage * roomsPerPage;
  const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;

  const paged = (pageNumber) => {
    setCurentPage(pageNumber);
  };

  return (
    <div>
      <div className="mainImageRooms"></div>
      <section className="section rooms">
        <div className="header-section">
          <h3>Take a look</h3>
          <h2>
            At our <span>services</span>
          </h2>
          <p>
            We offer a unique lodging experience with all the amenities you need
            to enjoy an unforgettable stay. Book now and live a unique
            experience!
          </p>
        </div>

        <section className="roomsFilters">
          <div className="content-filter">
            <select defaultValue={"Price"} onChange={(e) => handlerMaxPrce(e)}>
              <option disabled value="Price">
                Price
              </option>
              <option value="DESCENDING">Price maximo</option>
              <option value="ASCENDING">Price minimo</option>
            </select>

            <select defaultValue={"Type"} onChange={handlermaxType}>
              <option disabled value="Type">
                Types
              </option>
              <option value="matrimonial">Matrimonial</option>
              <option value="individual">Individual</option>
              <option value="familiar">Familiar</option>
            </select>
            <div className="filterDate">
              <p>Available Date:</p>
              <div>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  minDate={new Date()}
                  maxDate={
                    new Date(new Date().setMonth(new Date().getMonth() + 6))
                  }
                  dateFormat="dd/MM/yyyy"
                  showYearDropdown
                  yearDropdownItemNumber={15}
                  placeholderText="From"
                  isClearable
                />
              </div>
              <div>
                <DatePicker
                  selected={endDate}
                  onChange={(date) => comprobacion(startDate, date)}
                  minDate={
                    startDate
                      ? new Date(startDate.getTime() + 86400000)
                      : new Date(new Date().getTime() + 86400000)
                  }
                  maxDate={
                    new Date(new Date().setMonth(new Date().getMonth() + 6))
                  }
                  dateFormat="dd/MM/yyyy"
                  showYearDropdown
                  scrollableYearDropdown
                  yearDropdownItemNumber={15}
                  placeholderText={"To"}
                  isClearable
                />
              </div>
            </div>
            <button onClick={() => dispatch(reset())}>Reset</button>
          </div>
        </section>

        <CardRoomContainer
          indexOfFirstRoom={indexOfFirstRoom}
          indexOfLastRoom={indexOfLastRoom}
          paged={paged}
          roomsPerPage={roomsPerPage}
          currentPage={currentPage}
        />
        <CardServicesContainer />
      </section>
    </div>
  );
};

export default rooms;
