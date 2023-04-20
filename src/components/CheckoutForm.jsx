import "../styles/Checkout.scss";
import { loadStripe } from "@stripe/stripe-js";
import "../styles/Checkout.scss";
import { Elements } from "@stripe/react-stripe-js";
import "../styles/CheckoutForm.scss";
import Payment from "./Payment";

const stripePromise = loadStripe(
  "pk_test_51MtdRJAxd88LZv2eI3ZXSTGWh0VL8z8i799gIye6ke36gZzmc7H73kJvKRmgW7msmfdIhz0VwCql9Koq7WdGo3Zg009lR7Uc3t"
);

const CheckoutForm = () => {
  return (
    <div>
      <Elements stripe={stripePromise}>
        <Payment />
      </Elements>
    </div>
  );
};

export default CheckoutForm;
