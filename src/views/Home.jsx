import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";
import CardRoomContainerHome from "../components/CardRoomContainerHome";
import CardsReviewsContainer from "../components/CardsReviewsContainer";
import "../styles/Home.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUtensils,
  faWarehouse,
  faHotel,
  faWifi,
  faBed,
  faMartiniGlassCitrus,
  faMapLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { carritoUser} from "../redux/actions";


const Home = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();

  const location = useLocation();
  const [isActive, setIsActive] = useState(false);
  console.log(isActive);

  // useEffect(()=>{
  //   if (location.pathname === '/' && user) {
  //     window.location.reload();
  //   }
  // })

  useEffect(() => {
    if (location.pathname === "/" && user) {
      setIsActive(true);
      dispatch(carritoUser(user.email));
    } else {
      if (user) {
        setIsActive(false);
        dispatch(carritoUser(user.email));
      }
    }
  }, [location.pathname, user, dispatch]);

  useEffect(() => {
    if (isActive === true && user) {
      dispatch(carritoUser(user.email));
  
    } else {
      if (user) {
        dispatch(carritoUser(user.email));
      }
    }
  }, [location.pathname, user, dispatch, isActive]);

  return (
    <div className="home">
      <div className="mainImageHome"></div>

      <section className="section">
        <div className="home-row-icons-hotels">
          <div className="fa-icons">
            <FontAwesomeIcon icon={faUtensils} />
            <p>Restorant</p>
          </div>
          <div className="fa-icons">
            <FontAwesomeIcon icon={faWarehouse} />
            <p>Garage</p>
          </div>
          <div className="fa-icons">
            <FontAwesomeIcon icon={faHotel} />
            <p>Resort</p>
          </div>
          <div className="fa-icons">
            <FontAwesomeIcon icon={faWifi} />
            <p>Free Wifi</p>
          </div>
        </div>

        <div className="header-section stayHere">
          <h2>
            Why You Should <span>Stay Here</span>
          </h2>
          <p>
            Discover a unique experience in nature and local culture. We offer
            comfortable accommodation, exciting activities, and tours to learn
            about the ancestral culture of the Sierra Nevada. Book now and live
            an unforgettable stay!
          </p>
        </div>

        <div className="two-columns">
          <div className="stayHereTxt">
            <div className="row-stay-here">
              <div className="circle-icon">1</div>
              <h3>Provide the best choice of Room.</h3>
              <p>
                Find your perfect room with us! Private or shared, sea or
                mountain view, we have all the amenities you need for a
                comfortable stay in Tayrona National Natural Park. Book now and
                enjoy!
              </p>
            </div>

            <div className="row-stay-here">
              <div className="circle-icon">2</div>
              <h3>Low price with Best Quality</h3>
              <p>
                Enjoy the best quality at the lowest price in Tayrona National
                Natural Park. Book now and experience a unique stay without
                compromising your budget!
              </p>
            </div>

            <div className="row-stay-here">
              <div className="circle-icon">3</div>
              <h3>Restaurant Service</h3>
              <p>
                Enjoy delicious local and international dishes prepared with
                fresh and quality ingredients at our restaurant in Tayrona
                National Natural Park. Whether it's for breakfast or dinner
                under the stars, our restaurant is the perfect place to satisfy
                your cravings! Come and try our delicious food.
              </p>
            </div>
          </div>

          <div className="stayHereImg">
            <img
              src="https://res.cloudinary.com/ds8n6d63e/image/upload/v1681423538/Hostel-tayrona/74274b63-61d6fbf1-27_gvlz1i.jpg"
              alt="image review"
            />
          </div>
        </div>
      </section>

      <section className="section rooms">
        <div className="header-section">
          <h3>Take a look</h3>
          <h2>
            At our <span>rooms</span>
          </h2>
          <p>
            We have a variety of options to suit your needs, all equipped with
            the amenities you need for a comfortable and relaxing stay in
            Tayrona National Natural Park. From private rooms with sea views to
            shared dormitories, we have something for everyone's taste and
            budget. Don't wait any longer, book now and come enjoy our amazing
            rooms!
          </p>
        </div>

        <div>
          <CardRoomContainerHome />
        </div>
      </section>

      <section id="About" className="about">
        <div className="aboutContainer">
          <div className="about-content">
            <h2>About us</h2>
            <p>
              Welcome to our website! We are a hostel located in the heart of
              the beautiful Tayrona National Natural Park, surrounded by
              stunning landscapes and exotic flora and fauna. We strive to
              provide our guests with the best possible experience during their
              stay,
            </p>
            <p>
              offering comfortable and cozy rooms, delicious food, and
              exceptional service. Our team is made up of friendly and
              passionate individuals who will ensure you feel right at home
              during your time here. We look forward to seeing you soon at our
              hostel in Tayrona National Natural Park!
            </p>
          </div>
          <div className="about-img">
            <img
              src="https://res.cloudinary.com/ds8n6d63e/image/upload/v1681423538/Hostel-tayrona/74274b63-61d6fbf1-27_gvlz1i.jpg"
              alt="image review"
            />
          </div>
        </div>
      </section>

      <div className="section">
        <div className="home-grid-icons-hotels">
          <div className="fa-icons box-shadow-hover">
            <div className="circle-icon">
              <FontAwesomeIcon icon={faBed} />
            </div>
            <h4>The Best Rooms</h4>
            <p>
              We have options for all tastes and budgets. Book now and enjoy a
              comfortable and relaxing stay!
            </p>
          </div>

          <div className="fa-icons box-shadow-hover">
            <div className="circle-icon">
              <FontAwesomeIcon icon={faMartiniGlassCitrus} />
            </div>
            <h4>Restorant</h4>
            <p>
              Enjoy a delicious culinary experience with stunning views! We
              offer a variety of local and international dishes for you to
              savor. Come and try us out now!
            </p>
          </div>

          <div className="fa-icons box-shadow-hover">
            <div className="circle-icon">
              <FontAwesomeIcon icon={faUtensils} />
            </div>
            <h4>Lounge Bar</h4>
            <p>
              Enjoy a drink while taking in the park. We offer a wide selection
              of drinks and snacks. Join us now!
            </p>
          </div>

          <div className="fa-icons box-shadow-hover">
            <div className="circle-icon">
              <FontAwesomeIcon icon={faMapLocationDot} />
            </div>
            <h4>Touristic Park</h4>
            <p>
              Immerse yourself in the lush tropical jungle and enjoy the dreamy
              beaches. Visit us now and live an unforgettable experience!
            </p>
          </div>
        </div>
      </div>

      <section className="section">
        <CardsReviewsContainer />
      </section>
    </div>
  );
};

export default Home;
