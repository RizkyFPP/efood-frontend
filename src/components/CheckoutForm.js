import React, { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import "../styles/CheckoutForm.css"; // Ensure this path is correct

const CheckoutForm = ({ amount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    axios
      .post("/api/checkout", { amount })
      .then((response) => setClientSecret(response.data.clientSecret))
      .catch((error) => console.error(error));
  }, [amount]);

  const handleChange = async (event) => {
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setProcessing(true);

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      setError(null);
      setProcessing(false);
      setSucceeded(true);
    }
  };

  return (
    <div className="checkout-container">
      <form id="payment-form" onSubmit={handleSubmit}>
        <h2 className="checkout-title">Checkout</h2>
        <CardElement
          id="card-element"
          onChange={handleChange}
          className="card-element"
        />
        <button
          className="checkout-button"
          disabled={processing || disabled || succeeded}
          id="submit"
        >
          <span id="button-text">
            {processing ? <div className="spinner" id="spinner"></div> : "Pay"}
          </span>
        </button>
        {error && (
          <div className="card-error" role="alert">
            {error}
          </div>
        )}
        {succeeded && <p className="result-message">Payment succeeded!</p>}
      </form>
    </div>
  );
};

export default CheckoutForm;
