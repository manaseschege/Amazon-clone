import React, { useEffect, useState } from "react";
import Header from "./Header";
import "./Payment.css";
import { useStateValue } from "./StateProvider";
import CheckoutProduct from "./CheckoutProduct";
import { Link, useNavigate } from "react-router-dom";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "./reducer";
import axios from "./axios";
import { db } from "./firebase";

function Payment() {
  const navigate = useNavigate();
  const [{ basket, user }, dispatch] = useStateValue();
  const stripe = useStripe();
  const elements = useElements();

  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState(true);
  // useEffect(() => {
  //   const getClientSecret = async () => {
  //     const response = await axios({
  //       method: "post",
  //       url: `/payments/create?total=${getBasketTotal(basket) * 100}`,
  //     });
  //     setClientSecret(response.data.clientSecret);
  //   };
  //   getClientSecret();
  // }, [basket]);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setProcessing(true);
  //   const payload = await stripe
  //     .confirmCardPayment(clientSecret, {
  //       payment_method: {
  //         card: elements.getElement(CardElement),
  //       },
  //     })
  //     .then(({ paymentIntent }) => {
  //       setSucceeded(true);
  //       setError(false);
  //       setProcessing(false);
  //       navigate("./orders", { replace: true });
  //     });
  // };
  // const  = (e) => {
  //   setDisabled(e.empty);
  //   setError(e.error ? e.error.message : "");
  // };

  const buyHandler = () =>
    alert(`Thankyou ${user?.email}  your order was placed`);

  return (
    <>
      <Header />
      <div className="payment">
        <div className="payment__container">
          <h1>
            Checkout (<Link to="/checkout">{basket?.length} items</Link>)
          </h1>
          <div className="payment__section">
            <div className="payment__title">
              <h3>Delivery Address</h3>
            </div>
            <div className="payment__address">
              <p>{user?.email}</p>
              <p>123 React Lane</p>
              <p>Los Angeles, CA</p>
            </div>
          </div>
          <div className="payment__section">
            <div className="payment__title">
              <h3>Review items and delivery</h3>
            </div>
            <div className="payment__items">
              {basket.map((item) => (
                <CheckoutProduct
                  id={item.id}
                  title={item.title}
                  image={item.image}
                  price={item.price}
                  rating={item.rating}
                />
              ))}
            </div>
          </div>
          <div className="payment__section">
            <div className="payment__title">
              <h3>Payment Method</h3>
            </div>
            <div className="payment__details">
              <form onSubmit={(e) => e.preventDefault()}>
                <CardElement />
                <div className="payment__priceContainer">
                  <CurrencyFormat
                    renderText={(value) => (
                      <>
                        <h3>Order Total :{value}</h3>
                      </>
                    )}
                    decimalScale={2}
                    value={getBasketTotal(basket)}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                  <button onClick={buyHandler}>Buy Now</button>
                </div>
                {error && <div>{error}</div>}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Payment;
