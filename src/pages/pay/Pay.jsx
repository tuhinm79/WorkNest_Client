import React, { useEffect, useState } from "react";
import "./Pay.css";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import newRequest from "../../utils/newRequest";
import { useParams } from "react-router-dom";
import CheckoutForm from "../../components/checkoutForm/CheckoutForm";

const stripePromise = loadStripe(
  "pk_test_51P9qbASD60ThZT5uIWxRvxsn3z5rvmcRXVyhpbaobJGFScpBVogkUpsRRZQVwL5WtVtgQFmhQBKkEMHLyFWr6azs00jTAjXMNB"
);

const Pay = () => {

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    // clientSecret,
    appearance,
  };

  return <div className="pay">
    {/* {clientSecret && ( */}
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      {/* )} */}
  </div>;
};

export default Pay;
