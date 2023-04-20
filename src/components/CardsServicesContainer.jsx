import React from "react";
import CardServices from "./CardServices";
import image1 from "../assets/image1.jpg";
import image2 from "../assets/image2.jpg";
import image3 from "../assets/image3.jpg";
import image4 from "../assets/image4.webp";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";

const CardServicesContainer = (props) => {
  const images = [
    {
      image: image1,
      description:
        "At our hotel, we pride ourselves on providing exceptional room service for our guests. Our room service is available 24 hours a day, so you can enjoy food and drinks in the privacy of your room anytime you want. We offer a full menu that includes local food options as well as international dishes, and our staff is always ready to help you choose the perfect option to satisfy your cravings. Plus, our room service is done quickly and efficiently, so you can enjoy your hot, freshly prepared meal in the comfort of your own. Relax and enjoy an effortless culinary experience at our hotel in Tayrona Park!",
    },
    {
      image: image2,
      description:
        "At our hotel, we offer an exclusive transportation service for our clients, designed to make your travel experience as comfortable and hassle-free as possible. Our transportation service includes transfers to and from the airport, as well as trips to nearby tourist places such as Tayrona Park. Our drivers are professional and knowledgeable about the area, ensuring a safe and enjoyable travel experience. In addition, our transport service is carried out in modern and comfortable vehicles that adapt to your needs, whether you are traveling alone or in a group. Don't worry about transportation during your vacation, let us take care of it and enjoy your stay in Tayrona Park!",
    },
    {
      image: image3,
      description:
        "Enjoy a unique gastronomic experience in our restaurant in Parque Tayrona. We offer a wide variety of dishes that fuse local flavors with innovative culinary techniques. From fresh Caribbean fish to exquisite vegetarian dishes, our menu is perfect to satisfy every palate. All of our dishes are prepared with fresh, high-quality ingredients, and our attentive and professional staff will ensure that your dining experience is unforgettable. Whether you are looking for a romantic dinner for two or a group dinner with friends, our restaurant is the perfect place to enjoy a delicious meal in Tayrona Park.",
    },
    {
      image: image4,
      description:
        "The hostel's bar is the perfect place to relax after a day full of adventures in Tayrona Park. We offer a variety of drinks, from cold beers to tropical cocktails made with fresh fruits from the region. You can also enjoy a selection of sandwiches and light dishes to satisfy your cravings. Our relaxed and welcoming environment is ideal for socializing with other travelers and sharing stories of your adventures. Come and enjoy a unique experience in the heart of Tayrona Park!",
    },
  ];

  return (
    <section className="section">
      <div className="header-section">
        <h3>Take a look</h3>
        <h2>
          At our <span>services</span>
        </h2>
        <p>
          We provide a wide range of services to make your stay as comfortable
          and enjoyable as possible. From room service to a 24-hour front desk,
          we have everything you need to make your visit unforgettable. Book now
          and experience the best that we have to offer.
        </p>
      </div>
      <Swiper spaceBetween={0} slidesPerView={1} loop={true}>
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <CardServices
              backgroundImage={image.image}
              description={image.description}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default CardServicesContainer;
