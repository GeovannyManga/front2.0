import axios from "axios";

export const GET_ALL_ROOMS = "GET_ROOMS";
export const GET_TRANSPORTE = "GET_TRANSPORTE";
export const GET_DESAYUNO = "GET_DESAYUNO";
export const GET_COMIDAS = "GET_COMIDAS";
export const GET_ROOM_DETAIL = "GET_ROOM_DETAIL";
export const GET_TYPE = "GET_TYPE";
export const ORDER_BY_PRICE = "ORDER_BY_PRICE";
export const RESET = "RESET";
export const CARRITO_USER = "CARRITO_USER";
export const GET_CAR = "GET_CAR";
export const LOCAL_CARRITO = "LOCAL_CARRITO";
export const RESTORE_CART_FROM_LOCAL_STORAGE =
  "RESTORE_CART_FROM_LOCAL_STORAGE";
export const POST_REVIEW = "POST_REVIEW";
export const GET_ALL_REVIEWS = "GET_ALL_REVIEWS";
export const CHECK_RESERVATION_DATES = "CHECK_RESERVATION_DATES";
export const CARRITO_ADD_USER = "CARRITO_ADD_USER";
export const CAR_ITEMS_NUMBER = "CAR_ITEMS_NUMBER";
export const GET_ALL_USERS = "GET_ALL_USERS";
export const DELETE_USER = "DELETE_USER";
export const DELETE_LOCAL_STORAGE = " DELETE_LOCAL_STORAGE";
export const FILTER_BY_AVAILABLE_DATE = " FILTER_BY_AVAILABLE_DATE";
export const  DESTROY_CAR = " DESTROY_CAR"
export const SET_TOTAL_NOTIF = "SET_TOTAL_NOTIF"

export const getAllRooms = () => {
  return async function (dispatch) {
    const rooms = await axios.get("/room");
    dispatch({ type: GET_ALL_ROOMS, payload: rooms.data });
  };
};

export const getTransporte = () => {
  return async function (dispatch) {
    const transporte = await axios.get("/transporte");
    dispatch({ type: GET_TRANSPORTE, payload: transporte.data });
  };
};

export const getDesayuno = () => {
  return async function (dispatch) {
    const desayuno = await axios.get("/desayuno");
    dispatch({ type: GET_DESAYUNO, payload: desayuno.data });
  };
};

export const getAllUsers = () => {
  return async function (dispatch) {
    const users = await axios.get("usuarios");
    dispatch({ type: GET_ALL_USERS, payload: users.data });
  };
};

export const getAllReviews = () => {
  return async function (dispatch) {
    const allUsers = await axios.get(`/usuarios`);
    dispatch({ type: GET_ALL_REVIEWS, payload: users.allUsers });
  };
};

export const getComidas = () => {
  return async function (dispatch) {
    const comidas = await axios.get("/comidas");
    dispatch({ type: GET_COMIDAS, payload: comidas.data });
  };
};

export const getRoomDetail = (id) => {
  return async function (dispatch) {
    const roomDetail = await axios.get(`/room/${id}`);

    dispatch({ type: GET_ROOM_DETAIL, payload: roomDetail.data });
  };
};

export function orderByPrice(ordering) {
  return {
      type: ORDER_BY_PRICE,
      payload: ordering
  }
}

export const getType = (type) => {
  return {
    type: GET_TYPE,
    payload: type,
  };
};

export function reset() {
  return {
    type: RESET,
  };
}

export const postReview = (payload, id) => {
  return async () => {
    try {
      const response = await axios.patch(
        `/usuarios/${id}/comentarios`,
        payload
      );
      return response;
    } catch (error) {
      alert(error);
    }
  };
};

//PREGUNTAR ANTES DE MANIPULAR ESTA ACCION, LOGICA MUY COMPLEJA
export const carritoUser = (userMail) => {
  return async function (dispatch) {
    const response = await axios.get("/usuarios");
    if (response && response.data) {
      const usuarios = response.data;
      const user = usuarios.filter((usuario) => usuario.email === userMail);
      
      
      // Aquí se añaden los nuevos items al localStorage
      const localStorageItems = JSON.parse(localStorage.getItem("carrito")) || [];
      const userItems = localStorageItems.filter(item => item.userId === "");
      userItems.forEach(item => {
        item.userId = user[0]._id;
        const guardar = []
        guardar.push(item)
        axios.patch("/usuarios/dateRoom", item);
      });
      const loco =[]
      localStorage.setItem("carrito", JSON.stringify(loco));

      const respons = await axios.get("/usuarios");
      const usuario = respons.data;
      const users = usuario.filter((usuario) => usuario.email === userMail);
      
      const carritoItems = users[0].carrito.map((item) => {
        return {
          image: item.image,
          name: item.name,
          price: item.price,
          total: item.total,
          dias: item.dias,
          id: item._id,
        };
      });
      
      dispatch({ type: CARRITO_USER, payload: carritoItems });
    }
  };
};


export const carritoAddUser = (userMail, start, end, id) => {
  return async function (dispatch) {
    try {
      const response = await axios.get("/usuarios");
      if (response && response.data) {
        const usuarios = response.data;
        const user = usuarios.filter((usuario) => usuario.email === userMail);

        function getNumberOfDays(start, end) {
          const oneDay = 24 * 60 * 60 * 1000; // Milisegundos en un día
          const startDate = new Date(start);
          const endDate = new Date(end);
          const diffDays = Math.round(Math.abs((endDate - startDate) / oneDay));
          return diffDays;
        }

        const inicio = new Date(start).toISOString().slice(0, 10);
        const fin = new Date(end).toISOString().slice(0, 10);

        const responseRoom = await axios.get(`/room/${id}`);

        const room = responseRoom.data;
        const image = room.image[0];
        const price = room.price;
        const name = room.name;
        const dias = getNumberOfDays(start, end);
        const totalHabitacion = price * dias;

        const date = {
          start: inicio,
          end: fin,
          userId: user[0]._id,
          idRoom: id,
          image: image,
          price: price,
          name: name,
          dias: dias,
          total: totalHabitacion,
        };

        await axios.patch("/usuarios/dateRoom", date);

        // Obtener los datos de la habitación que acaba de agregarse al carrito
        const roomData = responseRoom.data;

        // Añadir los items del localStorage al carrito del usuario
        const localStorageItems = JSON.parse(localStorage.getItem("carrito")) || [];
        const userItems = localStorageItems.filter(item => item.userId === "");
        userItems.forEach(item => {
          item.userId = user[0]._id;
          axios.patch("/usuarios/dateRoom", item);
        });

        // Devolver los datos de la habitación junto con el mensaje "hola"
        dispatch({
          type: CARRITO_ADD_USER,
          payload: { message: "hola", room: roomData },
        });
      }
    } catch (error) {
      console.log("Hubo un error al obtener los datos:", error);
    }
  };
};


export const localCarrito = (start, end, id) => {
  return async function (dispatch) {
    try {
      const rooms = (await axios.get("/room")).data;
      const room = rooms.filter((room) => room._id === id)[0];
      const cartData = JSON.parse(localStorage.getItem("carrito")) || [];
      const arr = [...cartData]
      const oneDayMs = 24 * 60 * 60 * 1000; // Milisegundos en un día
      const startMs = new Date(start).getTime();
      const endMs = new Date(end).getTime();
      const diffMs = endMs - startMs;
      const dias = Math.round(diffMs / oneDayMs);
      const data = {
        name: room.name,
        start: start,
        end: end,
        userId: "",
        idRoom: id,
        image: room.image[0],
        dias: dias,
        price: room.price,
        total: room.price*dias
      }
      arr.push(data)
      localStorage.setItem("carrito", JSON.stringify(arr));
      const response=JSON.parse(localStorage.getItem("carrito"));
      dispatch({ type: LOCAL_CARRITO, payload: response });
      return Promise.resolve();
    } catch (error) {
      console.error(error);
      return Promise.reject(error);
    }
  };
};



export const restoreCartFromLocalStorage = () => {
  const cartData = JSON.parse(localStorage.getItem("carrito")) || [];
  return {
    type: "RESTORE_CART_FROM_LOCAL_STORAGE",
    payload: cartData,
  };
};

export const checkReservationDates = (endDate, startDate, roomId) => {
  return async function (dispatch) {
    try {
      const roomDetail = await axios.get(`/room/${roomId}`);
      const bookedDates = roomDetail.data.bookedDates;

      // Convertir las fechas a objetos Date
      const checkInDate = new Date(startDate);
      const checkOutDate = new Date(endDate);

      // Validar si las fechas están disponibles
      const isAvailable = !bookedDates.some(({ start, end }) => {
        const bookedStartDate = new Date(start);
        const bookedEndDate = new Date(end);

        return (
          (checkInDate >= bookedStartDate && checkInDate < bookedEndDate) ||
          (checkOutDate > bookedStartDate && checkOutDate <= bookedEndDate)
        );
      });

      dispatch({ type: CHECK_RESERVATION_DATES, payload: isAvailable });
    } catch (error) {
      console.error(error);
    }
  };
};

export const filterByAvailableDate = (startDate, endDate) => {
  return {
    type: FILTER_BY_AVAILABLE_DATE,
    payload: {
      startDate,
      endDate,
    },
  };
};

export const carItemsNumber = (userMail) => {
  return async function (dispatch) {
    const response = await axios.get("/usuarios");

    if (response && response.data) {
      const usuarios = response.data;
      const user = usuarios.filter(
        (usuario) => usuario.email === userMail.email
      );
      // console.log(user);
      const total = user[0].carrito.length;
      // console.log(total);

      dispatch({ type: CAR_ITEMS_NUMBER, payload: total });
    }
  };
};

export const deleteCar = (userMail, id) => {
  return async function (dispatch) {
    try {
      // Obtener la información actualizada del usuario desde el servidor
      const response = await axios.get("/usuarios");

      if (response && response.data) {
        const usuarios = response.data;
        const user = usuarios.find((usuario) => usuario.email === userMail);

        // Encontrar el objeto del carrito con el _id igual al que se pasa como parámetro
        const item = user.carrito.find((item) => item._id === id);
        const userId = user._id;
        const carId = item._id;
        const data = {
          id: carId,
          userId: userId,
        };

        await axios.patch("/usuario/deleteCart", data);

        // Obtener la información actualizada del usuario desde el servidor
        const responseUpdated = await axios.get("/usuarios");
        if (responseUpdated && responseUpdated.data) {
          const usuario = responseUpdated.data.find(
            (usuario) => usuario.email === userMail
          );
          const carritoUser = usuario.carrito;
          // Obtener el array del carrito del usuario desde la respuesta actualizada

          dispatch({
            type: DELETE_USER,
            payload: carritoUser,
          });
        }
      }
    } catch (error) {
      console.error(error);
    }
  };
};

export const deleteLocalStorage = (index, carrito) => {
  return async function (dispatch) {
    const car2 = [...carrito];
    car2.splice(index, 1);
    localStorage.setItem("carrito", JSON.stringify(car2));
    dispatch({ type: DELETE_LOCAL_STORAGE, payload: car2 });
  };
};

export const changeValueType = (id, type) => {
  return async function (dispatch) {
    const typeAdmin = "admin";
    const typeUser = "user";
    const typeBlock = "block";

    const buscar = (await axios.get("/usuarios")).data
    const filtrar = buscar.filter(user=> user._id === id)
    console.log(filtrar)

    let message = ""; // inicializamos la variable message

    if (type === typeAdmin) {
      await axios.patch(`/usuarios/${id}/types/${typeAdmin}`);
      message = `Los permisos del usuario ${filtrar[0].fullName} han sido cambiados a administrador.`;
    }
    if (type === typeBlock) {
      await axios.patch(`/usuarios/${id}/types/${typeBlock}`);
      message = `Los permisos del usuario ${filtrar[0].fullName} han sido bloqueados.`;
    }
    if (type === typeUser) {
      await axios.patch(`/usuarios/${id}/types/${typeUser}`);
      message = `Los permisos del usuario ${filtrar[0].fullName} han sido cambiados a usuario regular.`;
    }

    // dispatch({ type: "CHANGE_USER_TYPE", payload: { id, type } });
    return message; // devolvemos el mensaje apropiado
  };
};

export const getUserCar = (userMail) => {
  return async function (dispatch) {
    try {
      const response = await axios.get("/usuarios");

      if (response && response.data) {
        const usuarios = response.data;
        const user = usuarios.find((usuario) => usuario.email === userMail);
        const carrito = user.carrito;

        const reservas = carrito.map((item) => {
          return {
            idRoom: item.idRoom,
            start: item.start,
            end: item.end,
            userId: user._id,
          };
        });

        const requests = [];
        for (let reserva of reservas) {
          const habitacion = {
            start: reserva.start,
            end: reserva.end,
            userId: reserva.userId
          };
          const request = axios.patch(`/rooms/${reserva.idRoom}/bookings`, habitacion);
          requests.push(request);
          console.log(request)
        }

        await Promise.all(requests);
        console.log("Reservas guardadas en las habitaciones.");
      }
    } catch (error) {
      console.log(error);
    }
  };
};


export const  destroyCar = (userMail)=>{
return async function (dispatch) {
  // /usuario/delete/:userId/carrito
  const response = await axios.get("/usuarios");

  if (response && response.data) {
    const usuarios = response.data;
    const user = usuarios.find((usuario) => usuario.email === userMail);
    const userId = user._id;
    console.log(userId)
   await axios.patch(`/usuario/delete/${userId}/carrito`)

   const newCar = []
   dispatch({type: DESTROY_CAR, payload: newCar })

  }
}
}


// /rooms/:id/enviarTicket


  
export const  sendMail= (userMail)=>{
  return async function (dispatch) {
   
     const response = await axios.get("/usuarios");
  
     if (response && response.data) {
       const usuarios = response.data;
       const user = usuarios.find((usuario) => usuario.email === userMail);
       const userId = user._id;
       console.log(userId)
      await axios.post(`/rooms/${userId}/enviarTicket`)
      const newCar = []
      dispatch({type: DESTROY_CAR, payload: newCar })
     }
  }
  }
  
export default function setTotalNot(totalItems) {
  return { type: SET_TOTAL_NOTIF, payload: totalItems };
}

