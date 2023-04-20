import { useDispatch } from "react-redux";
import { useAuth } from "../context/authContext";
import { getUserCar } from "../redux/actions";

export const updateUserCar = ()=> {
    const dispatch= useDispatch()
    const {user} = useAuth()
    if (user) {
        console.log(user)
        dispatch(getUserCar(user.email));
        // window.location.href = "/";
    }
  };
  