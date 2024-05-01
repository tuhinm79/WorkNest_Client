import React from "react";
import "./GigCard.css";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { IoStar } from "react-icons/io5";

const GigCard = ({ item }) => {
  const { isLoading , error, data } = useQuery({
    queryKey: [item.userId],
    queryFn: () =>
      newRequest.get(`/users/${item.userId}`).then((res) => {
        // console.log(res.data);
        return res.data;
      }),
  });
  // console.log(item)
  return (
    <Link to={`/gig/${item._id}`} className="link">
      <div className="gigCard">
        <img className="gigcardimg"  src={item.cover} alt="" />
        <div className="giginfo">
          {isLoading ? (
            "loading"
          ) : error ? (
            "Something went wrong!"
          ) : (
            <div className="giguser">
              <img className="gigppimg" src={data.img || "/img/noavatar.jpg"} alt="" />
              <span>{data.username}</span>
            </div>
          )}
          {/* {c?.lastMessage?.substring(0, 100)}... */}
          <div className="gigcardabout">{item.desc.length<100 ? item.desc : item.desc.substring(0, 100)+" ..." } </div>
          <div className="gigstar">
            <IoStar className="gigstarimg" />
            <span className="gigstarspan">
              {!isNaN(item.totalStars / item.starNumber) &&
                Math.round(item.totalStars / item.starNumber)}</span>
          </div>
        </div>
        <hr />
        <div className="gigdetail" style={{ padding: "10px, 20px" }}>
        <div className="gigprice">
            <span className="gigpricespan">STARTING AT</span>
            <h2 className="gigpriceh2"style={{ margin: "0px" }}>
              ₹ {item.price}
              {/* <sup>99</sup> */}
            </h2>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default GigCard;
