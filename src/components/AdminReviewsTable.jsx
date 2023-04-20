import React from "react";
import "../styles/CardReview.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

export default function CardReviewTable({ review }) {
  let stars = [];
  for (let i = 0; i < 5; i++) {
    if (review.rating > i)
      stars.push(
        <FontAwesomeIcon key={i} className="icon-star-gold" icon={faStar} />
      );
    else stars.push(<FontAwesomeIcon key={i} icon={faStar} />);
  }

  const imgURL = review.photoURL
    ? review.photoURL
    : "https://res.cloudinary.com/ds8n6d63e/image/upload/v1681423351/Hostel-tayrona/blank-profile-picture-973460__340_uk32g7.png";

  return (
    <>
      <td>
        <img src={imgURL} alt="imagen de la reseña" />
      </td>
      <td>{stars}</td>
      <td>{review.name}</td>
      <td>{review.text}</td>
    </>
  );
}
