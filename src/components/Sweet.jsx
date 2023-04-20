import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import axios from "axios";

export const Sweet = () => {
  return new Promise((resolve, reject) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#fd3131",
      confirmButtonText: "Yes, block it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "User blocked",
        });
        resolve(true);
      } else {
        resolve(false);
      }
    });
  });
};

export const SweetAprovedPayment = (props) => {
  return new Promise((resolve, reject) => {
    Swal.fire({
      title: "Payment Success",
      text: props,
      icon: "success",
    }).then((result) => {
      if (result.isConfirmed) {
        // window.location.href = "/";
        resolve(true);
      } else {
        resolve(false);
      }
    });
  });
};

export const SweetFailedReview = (props1, props2) => {
  return new Promise((resolve, reject) => {
    Swal.fire({
      title: "Review failed",
      text: `Incomplete information`,
      icon: "error",
    });
  });
};

export const SweetFailedLogin = (props1, props2) => {
  return new Promise((resolve, reject) => {
    Swal.fire({
      title: "Login failed",
      text: `Incomplete information`,
      icon: "error",
    });
  });
};

export const SweetFailedCreate = (props1, props2) => {
  return new Promise((resolve, reject) => {
    Swal.fire({
      title: "Account creation failed",
      text: `Incomplete information`,
      icon: "error",
    });
  });
};

export const SweetRejectedPayment = (props) => {
  return new Promise((resolve, reject) => {
    Swal.fire({
      title: "Payment failed",
      text: props,
      icon: "error",
    });
  });
};



export const SweetupdateRoom = async (roomId,updatedData) => {
  try {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to save changes?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel"
    });

    if (result.isConfirmed) {
      const response = await axios.put(`/update/roomData/${roomId}`, updatedData);

      if (response.status === 200) {
        await Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Room updated. The changes are now available.",
        });
        return true;
      } else {
        throw new Error("Something went wrong");
      }
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
    await Swal.fire({
      icon: "error",
      title: "Error!",
      text: "An error occurred while updating the room.",
    });
    return false;
  }
}

export const SweetCreatedReview = (props) => {
  return new Promise((resolve, reject) => {
    Swal.fire({
      title: "Review created!",
      text: "Success",
      icon: "success",
    }).then((result) => {
      if (result.isConfirmed) {
         window.location.href = "/";
        resolve(true);
      } else {
        resolve(false);
      }
    });
  });
};
