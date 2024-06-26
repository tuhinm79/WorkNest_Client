import React, { useState } from "react";
import "./Gig.css";
// import { Slider } from "infinite-react-carousel/lib";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import Reviews from "../../components/reviews/Reviews";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import swal from 'sweetalert';

{
  /* <Slider {...settings} className="slider">
              {data.images.map((img) => (
                <img key={img} src={img} alt="" />
              ))}
            </Slider> */
}

function Gig() {
  // const settings = {
  //   // customPaging: function(i) {
  //   //   return (
  //   //     <a>
  //   //       {/* <img src={`${baseUrl}/abstract0${i + 1}.jpg`} /> */}
  //   //     </a>
  //   //   );
  //   // },
  //   dots: true,
  //   dotsClass: "slick-dots slick-thumb",
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 1,
  //   slidesToScroll: 1
  // };
  const { id } = useParams();
  const navigate = useNavigate();
  // var t=1;
  const [t, setT] = useState(1);
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const { isLoading, error, data } = useQuery({
    queryKey: ["gig"],
    queryFn: () =>
      newRequest.get(`/gigs/single/${id}`).then((res) => {
        // console.log(res.data);
        return res.data;
      }),
  });
  const payment_karo = async () => {
    if (currentUser.isSeller) {
        swal({
          title: "Seller can't Use Services!",
          text: "To place order please create a New Account",
          // icon: "success",
          button: "OK", 
        })
      }
     else {
      localStorage.setItem("buyinggigid", JSON.stringify(id));
      localStorage.setItem("buyinggigdata", JSON.stringify(data));
        navigate(`/pay`);

      // try {
      //   const res = await newRequest.post(
      //     `/orders/create-payment-intent/${id}`,
      //     {
      //       buyername: currentUser.username,
      //       deliveryTime: data.deliveryTime,
      //     }
      //   );
      //   // setClientSecret(res.data.clientSecret);
      //   navigate(`/pay`);
      // } catch (err) {
      //   console.log(err);
      // }
    }
  };
  const showcontact = () => {
    // Toggle between 0 and 1 when the button is clicked
    setT((prevT) => (prevT === 0 ? 1 : 0));
  };

  const userId = data?.userId;

  const {
    isLoading: isLoadingUser,
    error: errorUser,
    data: dataUser,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () =>
      newRequest.get(`/users/${userId}`).then((res) => {
        return res.data;
      }),
    enabled: !!userId,
  });

  return (
    <div className="gig">
      {isLoading ? (
        "loading"
      ) : error ? (
        "Something went wrong!"
      ) : (
        <div className="container">
          <div className="left">
            <span className="breadcrumbs">
              WorkNest {">"} Graphics & Design {">"}
            </span>
            <h1>{data.title}</h1>
            {isLoadingUser ? (
              "loading"
            ) : errorUser ? (
              "Something went wrong!"
            ) : (
              <div className="user">
                <img
                  className="pp"
                  src={dataUser.img || "/img/noavatar.jpg"}
                  alt=""
                />
                <span>{dataUser.username}</span>
                {!isNaN(data.totalStars / data.starNumber) && (
                  <div className="stars">
                    {Array(Math.round(data.totalStars / data.starNumber))
                      .fill()
                      .map((item, i) => (
                        <img src="/img/star.png" alt="" key={i} />
                      ))}
                    <span>{Math.round(data.totalStars / data.starNumber)}</span>
                  </div>
                )}
              </div>
            )}
            {/* <img  src={data.images[0]} alt="" /> */}
            {/* <Slider {...settings} className="slider">
              {data.images.map((img) => (
                <img key={img} src={img} alt="" style={{width:"100px"}}/>
              ))}
            </Slider> */}
            <Carousel>
              {data.images.map((img) => (
                <img key={img} src={img} alt="" />
              ))}
            </Carousel>
            <h2>About This Gig</h2>
            <p>{data.desc}</p>
            {isLoadingUser ? (
              "loading"
            ) : errorUser ? (
              "Something went wrong!"
            ) : (
              <div className="seller">
                <h2>About The Seller</h2>
                <div className="user">
                  <img src={dataUser.img || "/img/noavatar.jpg"} alt="" />
                  <div className="info">
                    <span>{dataUser.username}</span>
                    {!isNaN(data.totalStars / data.starNumber) && (
                      <div className="stars">
                        {Array(Math.round(data.totalStars / data.starNumber))
                          .fill()
                          .map((item, i) => (
                            <img src="/img/star.png" alt="" key={i} />
                          ))}
                        <span>
                          {Math.round(data.totalStars / data.starNumber)}
                        </span>
                      </div>
                    )}
                    <button onClick={showcontact}>Contact Me</button>
                    <div>
                      {t === 1 ? "" : "Email Id:  " + dataUser.email + " "}
                    </div>
                    <div>
                      {t === 1 ? "" : "Mobile No.: " + dataUser.dataUser}
                    </div>
                  </div>
                </div>
                <div className="box">
                  <div className="items">
                    <div className="item">
                      <span className="title">From</span>
                      <span className="desc">{dataUser.country}</span>
                    </div>
                    <div className="item">
                      <span className="title">Member since</span>
                      <span className="desc">Aug 2022</span>
                    </div>
                    <div className="item">
                      <span className="title">Avg. response time</span>
                      <span className="desc">4 hours</span>
                    </div>
                    <div className="item">
                      <span className="title">Last delivery</span>
                      <span className="desc">1 day</span>
                    </div>
                    <div className="item">
                      <span className="title">Languages</span>
                      <span className="desc">English</span>
                    </div>
                  </div>
                  <hr />
                  <p>{dataUser.desc}</p>
                </div>
              </div>
            )}
            <Reviews gigId={id} />
          </div>
          <div className="right">
            <div className="price">
              <h3>{data.shortTitle}</h3>
              <h2>₹ {data.price}</h2>
            </div>
            <p>{data.shortDesc}</p>
            <div className="details">
              <div className="item">
                <img src="/img/clock.png" alt="" />
                <span>{data.deliveryTime} Day Delivery</span>
              </div>
              <div className="item">
                <img src="/img/recycle.png" alt="" />
                <span>{data.revisionNumber} Revisions</span>
              </div>
            </div>
            <div className="features">
              <span className="featuresspan">features:</span>
              {data.features.map((feature) => (
                <div className="item" key={feature}>
                  <img src="/img/greencheck.png" alt="" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
            {/* <Link to={`/pay/${id}`}> */}
            <button onClick={payment_karo}>Continue</button>
            {/* </Link> */}
          </div>
        </div>
      )}
    </div>
  );
}

export default Gig;
