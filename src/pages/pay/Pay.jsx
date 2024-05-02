import React from "react";
import "./Pay.css";
import logo from "../../assets/card_img.png";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import newRequest from "../../utils/newRequest";

const Pay = () => {
  const navigate = useNavigate();

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const buyinggigid = JSON.parse(localStorage.getItem("buyinggigid"));
  const buyinggigdata = JSON.parse(localStorage.getItem("buyinggigdata"));

  const paymentsuccess = async () => {
    try {
      const res = await newRequest.post(
        `/orders/create-payment-intent/${buyinggigid}`,
        {
          buyername: currentUser.username,
          deliveryTime: buyinggigdata.deliveryTime,
        }
      );
      const price=buyinggigdata.price.toString();
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
                <input type="text" placeholder="john deo" />
              </div>
              <div class="inputBox">
                <span>email :</span>
                <input type="email" placeholder="example@example.com" />
              </div>
              <div class="inputBox">
                <span>address :</span>
                <input type="text" placeholder="room - street - locality" />
              </div>
              <div class="inputBox">
                <span>city :</span>
                <input type="text" placeholder="mumbai" />
              </div>

              <div class="flex">
                <div class="inputBox">
                  <span>state :</span>
                  <input type="text" placeholder="india" />
                </div>
                <div class="inputBox">
                  <span>zip code :</span>
                  <input type="text" placeholder="123 456" />
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
                <input type="text" placeholder="mr. john deo" />
              </div>
              <div class="inputBox">
                <span>credit card number :</span>
                <input type="number" placeholder="1111-2222-3333-4444" />
              </div>
              <div class="inputBox">
                <span>exp month :</span>
                <input type="text" placeholder="january" />
              </div>

              <div class="flex">
                <div class="inputBox">
                  <span>exp year :</span>
                  <input type="number" placeholder="2022" />
                </div>
                <div class="inputBox">
                  <span>CVV :</span>
                  <input type="text" placeholder="1234" />
                </div>
              </div>
            </div>
          </div>

          <input
            className="paymentsuccessbutt"
            style={{ textAlign: "center" }}
            value="proceed to checkout"
            class="submit-btn"
            onClick={paymentsuccess}
          />
        </form>
      </div>
    </div>
  );
};

export default Pay;
