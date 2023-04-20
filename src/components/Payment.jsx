import { useEffect, useState} from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { PaymentElement } from "@stripe/react-stripe-js";
import { SweetAprovedPayment, SweetRejectedPayment } from "./Sweet";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useAuth } from "../context/authContext";
import { destroyCar, getUserCar, sendMail } from "../redux/actions";


export function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);


  const dispatch= useDispatch()
  const {user} = useAuth()

const updateUserCar = ()=> {
    if (user) {
        console.log(user)
        dispatch(getUserCar(user.email));
    }
  };

  const send=async()=>{
if (user) {
  console.log(user.email)
  dispatch(sendMail(user.email))
}
const destroy=async()=>{
  if (user) {
    await dispatch(destroyCar(user.email))
     window.location.href = "/";
  }
}
destroy()
  }

  


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    setIsProcessing(true);
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });
    if (error) {
      SweetRejectedPayment(error.message);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      SweetAprovedPayment(paymentIntent.status).then((result) => {
        console.log(result)
        if (result) {
          updateUserCar()
          send()
        }
      });
    } else {
      setMessage("unexpected state");
    }
    setIsProcessing(false);
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement />
      <button disabled={isProcessing} id="submit">
        <span id="button-text">
          {isProcessing ? "Processing ... " : "Pay now"}
        </span>
      </button>
    </form>
  );
}

//

//

function Payment() {
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");

  const carrito = useSelector((state) => state.carrito);

  let totalPrice = 0;

  for (let i = 0; i < carrito.length; i++) {
    totalPrice += carrito[i].total;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/config");
        const { publishableKey } = response.data;
        setStripePromise(loadStripe(publishableKey));
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "/create-payment-intent",
          {
            amount: 1000,
          }
        );
        const { clientSecret } = response.data;
        setClientSecret(clientSecret);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div>
        <h3>Total Price: {totalPrice}$</h3>
      </div>

      <div>
        {setStripePromise && clientSecret && (
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <CheckoutForm />
          </Elements>
        )}
      </div>
    </div>
  );
}

export default Payment;
