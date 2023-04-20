import axios from "axios";
import {
  GET_ALL_ROOMS,
  GET_TRANSPORTE,
  GET_DESAYUNO,
  GET_COMIDAS,
  GET_ROOM_DETAIL,
  GET_TYPE,
  GET_ALL_REVIEWS,
  RESET,
  GET_CAR,
  POST_REVIEW,
  LOCAL_CARRITO,
  RESTORE_CART_FROM_LOCAL_STORAGE,
  CHECK_RESERVATION_DATES,
  CARRITO_USER,
  CAR_ITEMS_NUMBER,
  GET_ALL_USERS,
  DELETE_USER,
  DELETE_LOCAL_STORAGE,
  FILTER_BY_AVAILABLE_DATE,
  ORDER_BY_PRICE,
  DESTROY_CAR,
  SET_TOTAL_NOTIF
} from "./actions";

const initialState = {
  rooms: [],
  roomsCopy: [],
  transporte: [],
  desayuno: [],
  comidas: [],
  detail: [],
  carrito: [],
  users: [],
  reviews: [],
  carItems: [],
  order: "DESCENDING", // por defecto ordena de mayor a menor
  dataConflict: null,
  date: {},
  type: "",
  totalComments : 0
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_ROOMS:
      return {
        ...state,
        rooms: action.payload,
        roomsCopy: action.payload,
      };

    case GET_TRANSPORTE:
      return {
        ...state,
        transporte: action.payload,
      };

    case GET_COMIDAS:
      return {
        ...state,
        comidas: action.payload,
      };

    case GET_ALL_USERS:
      return {
        ...state,
        users: action.payload,
      };

    case POST_REVIEW:
      return {
        ...state,
      };

    case GET_ALL_REVIEWS:
      return {
        ...state,
        reviews: action.payload,
      };

    case GET_DESAYUNO:
      return {
        ...state,
        desayuno: action.payload,
      };

    case GET_ROOM_DETAIL:
      return {
        ...state,
        detail: action.payload,
      };

    case GET_TYPE:
      let filteredRooms = [];
      filteredRooms = [
        //Filtrando las habitaciones por tipo de habitación
        ...state.roomsCopy.filter((room) => roomType(room, action.payload)),
      ];

      //ordernar por fecha
      const filteredByDate = filteredRooms.filter((room) =>
        isRoomAvailable(state.date.start, state.date.end, room)
      );

      // ordenar según la variable order
      const sortedRooms = [...filteredByDate].sort((a, b) =>
        order(a, b, state.order)
      );

      return {
        ...state,
        rooms: sortedRooms,
        type: action.payload,
      };

    case ORDER_BY_PRICE:
      const orderPopulation = [...state.rooms].sort((a, b) =>
        order(a, b, action.payload)
      );
      return {
        ...state,
        rooms: orderPopulation,
        order: action.payload,
      };

    case FILTER_BY_AVAILABLE_DATE:
      // Se revisa si ya hay un type en el state, de ser así se filtran las habitaciones por el state creado y se guarda en rooms, sino, entonces rooms será el estado original de todas las habitaciones
      const rooms = !state.type
        ? [...state.roomsCopy]
        : [
            //Filtrando las habitaciones por tipo de habitación
            ...state.roomsCopy.filter((room) => roomType(room, state.type)),
          ];
      const roomsFilteredByDate = rooms.filter((room) =>
        isRoomAvailable(action.payload.startDate, action.payload.endDate, room)
      );

      // ordenar según la variable order
      const sortedRoomsbyPrice = [...roomsFilteredByDate].sort((a, b) =>
        order(a, b, state.order)
      );

      return {
        ...state,
        rooms: sortedRoomsbyPrice,
        date: {
          start: action.payload.startDate,
          end: action.payload.endDate,
        },
      };

    case RESET:
      return {
        ...state,
        rooms: [...state.roomsCopy],
        date: {},
        type: "",
      };
    case GET_CAR:
      return {
        ...state,
        carrito: [...state.carrito, ...action.payload],
      };

    case LOCAL_CARRITO:
      return {
        ...state,
        carrito: [...action.payload],
      };
    case RESTORE_CART_FROM_LOCAL_STORAGE:
      return {
        ...state,
        carrito: action.payload,
      };
    case CHECK_RESERVATION_DATES:
      return {
        ...state,
        dataConflict: action.payload,
      };

    case CARRITO_USER:
      return {
        ...state,
        carrito: action.payload,
      };
    case CAR_ITEMS_NUMBER:
      return {
        ...state,
        carItems: action.payload,
      };
    case DELETE_USER:
      return {
        ...state,
        carrito: action.payload,
      };
    case DELETE_LOCAL_STORAGE:
      return {
        ...state,
        carrito: action.payload,
      };
      case  DESTROY_CAR:
        return{
          ...state,
          carrito: action.payload
        }

    case SET_TOTAL_NOTIF:
      return {
      ...state, 
      totalComments: action.payload,

    }
      
    

    default:
      return { ...state };
  }
  


 
};

const roomType = (room, type) => room.type === type; // Comprobando que el tipo de habitación coincida con el tipo elegido para filtrar

//con la función order, puedo retornar los datos necesarios para poder ordernar las habitaciones por precio
const order = (a, b, orderType) => {
  if (a.price > b.price) return "ASCENDING" === orderType ? 1 : -1;
  if (a.price < b.price) return "DESCENDING" === orderType ? 1 : -1;
  return 0;
};

// Con esta función se podrá saber si una habitación está disponible o no
const isRoomAvailable = (startDate, endDate, roomDetail) => {
  const bookedDates = roomDetail.bookedDates; //Obteniendo fechas en la que ésta habitación está reservada, ¡sí lo está!

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
  return isAvailable;
};

export default rootReducer;
