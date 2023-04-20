import Swal from "sweetalert2";
import axios from "axios";

const DelRoomSweet = async (roomId, status) => {
  try {
    let message;
    let confirmButtonText;

    if (status) { // Si status es true
      message = "Are you sure you want to disable the room? Guests won't be able to see it published on the page.";
      confirmButtonText = "Yes, disable it!";
    } else { // Si status es false
      message = "Are you sure you want to enable the room? It will be available for users on the page.";
      confirmButtonText = "Yes, enable it!";
    }

    const result = await Swal.fire({
      title: "Are you sure?",
      text: message,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#fd3131",
      confirmButtonText: confirmButtonText,
    });
    if (result.isConfirmed) {
      console.log(roomId)
      const response = await axios.put(`/update/room/${roomId}/status`, {
        baseURL: "http://localhost:8080" // Establece la URL base del servidor aquí
      });
      if (response.status === 200) { // verifica el estado de la respuesta HTTP
        await Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Room updated",
        });
        return true;
      } else {
        throw new Error("Something went wrong");
      }
    } else {
      return false;
    }
  } catch (error) {
    console.error(error); // agrega console.error para mostrar el error en la consola
    await Swal.fire({
      icon: "error",
      title: "Error!",
      text: "Room not updated",
    });
    return false;
  }
};

export default DelRoomSweet;
