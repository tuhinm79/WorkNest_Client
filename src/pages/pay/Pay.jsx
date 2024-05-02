// import React from "react";
import React, { useState } from "react";
import "./Pay.css";
import logo from "../../assets/card_img.png";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import newRequest from "../../utils/newRequest";

const Pay = () => {
  const navigate = useNavigate();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const [user, setUser] = useState({
    username: "",
    email: "",
    address: "",
    city: "",
    country: "",
    zip: "",
    cname: "",
    cnumber: "",
    em: "",
    ey: "",
    cvv: "",
  });

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const buyinggigid = JSON.parse(localStorage.getItem("buyinggigid"));
  const buyinggigdata = JSON.parse(localStorage.getItem("buyinggigdata"));

  const handleChange = (e) => {
    setUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const registervalidation = async (e) => {
    e.preventDefault();
    if (user.username === "") {
      swal({
        title: "Empty Full Name",
        // text: "Correct OTP!",
        icon: "error",
        button: "Try Again",
      });
    } else if (user.email === "") {
      swal({
        title: "Enter Email ID",
        // text: "Correct OTP!",
        icon: "error",
        button: "Try Again",
      });
    } else if (!emailRegex.test(user.email)) {
      swal({
        title: "Not a Valid Email ID",
        // text: "Correct OTP!",
        icon: "error",
        button: "Try Again",
      });
    } else if (user.address === "") {
      swal({
        title: "Empty Address",
        // text: "Correct OTP!",
        icon: "error",
        button: "Try Again",
      });
    } else if (user.city === "") {
      swal({
        title: "Empty City",
        icon: "error",
        button: "Try Again",
      });
    } else if (user.country === "") {
      swal({
        title: "Empty State",
        icon: "error",
        button: "Try Again",
      });
    } else if (user.cname === "") {
      swal({
        title: "Empty Card Name",
        icon: "error",
        button: "Try Again",
      });
    } else if (user.cnumber === "") {
      swal({
        title: "Empty card Number",
        icon: "error",
        button: "Try Again",
      });
    } else if (user.cnumber.length !== 16) {
      swal({
        title: "Not a valid Card Number",
        // text: "Correct OTP!",
        icon: "error",
        button: "Try Again",
      });
    } else if (user.em === "") {
      swal({
        title: "Empty expiry month",
        // text: "Correct OTP!",
        icon: "error",
        button: "Try Again",
      });
    } else if (user.ey === "") {
      swal({
        title: "Empty expiry year",
        icon: "error",
        button: "Try Again",
      });
    } else if (user.cvv === "") {
      swal({
        title: "Empty CVV Number",
        icon: "error",
        button: "Try Again",
      });
    } else if (user.cvv.length !== 3) {
      swal({
        title: "Not a valid CVV",
        icon: "error",
        button: "Try Again",
      });
    } else {
      paymentsuccess();
    }
  };

  const paymentsuccess = async () => {
    try {
      const res = await newRequest.post(
        `/orders/create-payment-intent/${buyinggigid}`,
        {
          buyername: currentUser.username,
          deliveryTime: buyinggigdata.deliveryTime,
        }
      );
      const price = buyinggigdata.price.toString();
      swal({
        title: "Payment Successful!",
        text: "Payment done of ₹ " + price,
        icon: "success",
        button: "OK",
      }).then(() => {
        localStorage.removeItem("buyinggigdata");
        localStorage.removeItem("buyinggigid");
        navigate("/orders");
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="pay">
      <div class="container">
        <form action="">
          <div class="row">
            <div class="col">
              <h3 class="title">billing address</h3>

              <div class="inputBox">
                <span>full name :</span>
                <input
                  name="username"
                  type="text"
                  placeholder="john deo"
                  onChange={handleChange}
                />
              </div>
              <div class="inputBox">
                <span>email :</span>
                <input
                  name="email"
                  type="email"
                  placeholder="example@example.com"
                  onChange={handleChange}
                />
              </div>
              <div class="inputBox">
                <span>address :</span>
                <input
                  name="address"
                  type="text"
                  placeholder="room - street - locality"
                  onChange={handleChange}
                />
              </div>
              <div class="inputBox">
                <span>city :</span>
                <input
                  name="city"
                  type="text"
                  placeholder="mumbai"
                  onChange={handleChange}
                />
              </div>

              <div class="flex">
                <div class="inputBox">
                  <span>state :</span>
                  <input
                    name="country"
                    type="text"
                    placeholder="india"
                    onChange={handleChange}
                  />
                </div>
                <div class="inputBox">
                  <span>zip code :</span>
                  <input
                    name="zip"
                    type="number"
                    placeholder="123 456"
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <div class="col">
              <h3 class="title">payment</h3>

              <div class="inputBox">
                <span>cards accepted :</span>
                <img src={logo} alt="" />
              </div>
              <div class="inputBox">
                <span>name on card :</span>
                <input
                  name="cname"
                  type="text"
                  placeholder="mr. john deo"
                  onChange={handleChange}
                />
              </div>
              <div class="inputBox">
                <span>credit card number :</span>
                <input
                  name="cnumber"
                  type="number"
                  placeholder="1111-2222-3333-4444"
                  onChange={handleChange}
                />
              </div>
              <div class="inputBox">
                <span>exp month :</span>
                <input
                  name="em"
                  type="text"
                  placeholder="january"
                  onChange={handleChange}
                />
              </div>

              <div class="flex">
                <div class="inputBox">
                  <span>exp year :</span>
                  <input
                    name="ey"
                    type="number"
                    placeholder="2022"
                    onChange={handleChange}
                  />
                </div>
                <div class="inputBox">
                  <span>CVV :</span>
                  <input
                    name="cvv"
                    type="number"
                    placeholder="123"
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </div>

          <input
            className="paymentsuccessbutt"
            style={{ textAlign: "center" }}
            value="proceed to checkout"
            class="submit-btn"
            onClick={registervalidation}
          />
        </form>
      </div>
    </div>
  );
};

export default Pay;
