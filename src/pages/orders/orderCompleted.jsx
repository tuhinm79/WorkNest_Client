import React from "react";
import { useNavigate } from "react-router-dom";
// import "../orderCompl
// import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const OrderCompleted = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const queryClient = useQueryClient();

  // var isbuyer=0;
  // const checkifbuyer=()=>{
  //   // if(currentUser.id==)
  // }
  // checkifbuyer();
  const navigate = useNavigate();
  const { isLoading, error, data } = useQuery({
    queryKey: ["completedorder"],
    queryFn: () =>
      newRequest.get(`/completedorder`).then((res) => {
        return res.data;
      }),
  });
  //////////////////////////////////////////////
  // const orderComplete = async () => {
  //   try {
  //     await newRequest.put("/orders/update", { payment_intent });
  //     setTimeout(() => {
  //       navigate("/orders");
  //     }, 5000);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  // const orderCompleted = async (order) => {
  //   const id = order._id;
  //   console.log(order);
  //   try {
  //     await newRequest.post("/completedorder", {
  //       order,
  //     });
  //   } catch (err) {
  //     console.log(err);
  //   }
  //   handleDelete(id);
  // };
  // const mutation = useMutation({
  //   // console.log("O");
  //   mutationFn: (id) => {
  //     return newRequest.delete(`/orders/${id}`);
  //   },
  //   onSuccess: () => {
  //     queryClient.invalidateQueries(["myGigs"]);
  //   },
  // });

  // const handleDelete = (id) => {
  //   console.log("a" + id);
  //   mutation.mutate(id);
  // };

  //////////////////////////////////
  const handleContact = async (order) => {
    const sellerId = order.sellerId;
    const buyerId = order.buyerId;
    const id = sellerId + buyerId;

    try {
      const res = await newRequest.get(`/conversations/single/${id}`);
      navigate(`/message/${res.data.id}`);
    } catch (err) {
      console.log("1");
      if (err.response.status === 404) {
        console.log("2");
        const res = await newRequest.post(`/conversations/`, {
          to: currentUser.seller ? buyerId : sellerId,
        });
        navigate(`/message/${res.data.id}`);
      }
    }
  };
  return (
    <div className="orders">
      {isLoading ? (
        "loading"
      ) : error ? (
        "error"
      ) : (
        <div className="container">
          <div className="title">
            <h1>Order&apos;s Completed</h1>
          </div>
          <table>
            <thead>
              <tr>
                <th className="ordertd1">Image</th>
                <th className="ordertd3">Gig Name</th>
                <th className="ordertd2">
                  {currentUser.isSeller ? "Buyer Name" : "Seller Name"}
                </th>
                <th className="ordertd7">Completed On</th>
                <th className="ordertd4">Price</th>
                {/* {currentUser.isSeller ? (
                    ""
                  ) : (
                    <th>completed?</th>
                  )} */}
                {/* <th>order</th> */}
              </tr>
            </thead>
            {data.map((completedorder) => {
              return(
              <tr key={completedorder._id}>
                <td>
                  <img className="image" src={completedorder.img} alt="" />
                </td>
                <td>{completedorder.title}</td>
                <td>
                  {currentUser.isSeller ? completedorder.buyerName : completedorder.sellerName}
                </td>
                <td>{completedorder.completedAt.substring(0,10)}</td>
                <td>{completedorder.price}</td>
                {/* order */}
                {/* <td>
                  {currentUser.isSeller ? (
                    ""
                  ) : (
                    <img
                      className="message"
                      src="./img/greencheck.png"
                      alt=""
                      onClick={() => orderCompleted(order)}
                    />
                  )}
                </td> */}
              </tr>
              );
})}
          </table>
        </div>
      )}
    </div>
  );
};

export default OrderCompleted;

// import React from "react";
// import { useNavigate } from "react-router-dom";
// import "./Orders.css";
// import { useQuery } from "@tanstack/react-query";
// import newRequest from "../../utils/newRequest";

// const Orders = () => {
//   const currentUser = JSON.parse(localStorage.getItem("currentUser"));

//   const navigate = useNavigate();
//   const { isLoading, error, data } = useQuery({
//     queryKey: ["orders"],
//     queryFn: () =>
//       newRequest.get(`/orders`).then((res) => {
//         return res.data;
//       }),
//   });

//   const handleContact = async (order) => {
//     const sellerId = order.sellerId;
//     const buyerId = order.buyerId;
//     const id = sellerId + buyerId;

//     try {
//       const res = await newRequest.get(`/conversations/single/${id}`);
//       navigate(`/message/${res.data.id}`);
//     } catch (err) {
//       if (err.response.status === 404) {
//         const res = await newRequest.post(`/conversations/`, {
//           to: currentUser.seller ? buyerId : sellerId,
//         });
//         navigate(`/message/${res.data.id}`);
//       }
//     }
//   };
//   return (
//     <div className="orders">
//       {isLoading ? (
//         "loading"
//       ) : error ? (
//         "error"
//       ) : (
//         <div className="container">
//           <div className="title">
//             <h1>Orders</h1>
//           </div>
//           <table>
//             <thead>
//               <tr>
//                 <th>Image</th>
//                 <th>Title</th>
//                 <th>Price</th>
//                 <th>Contact</th>
//               </tr>
//             </thead>
//             {data.map((order) => (
//               // console.log(order._id)
//               <tr key={order._id}>
//                 <td>
//                   <img className="image" src={order.img} alt="" />
//                 </td>
//                 <td>{order.title}</td>
//                 <td>{order.price}</td>
//                 <td>
//                   <img
//                     className="message"
//                     src="./img/message.png"
//                     alt=""
//                     onClick={() => handleContact(order)}
//                   />
//                 </td>
//               </tr>
//             ))}
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Orders;

// import React from "react";
// import { Link, useNavigate } from "react-router-dom";
// import "./Orders.css";
// import { useQuery } from "@tanstack/react-query";
// import newRequest from "../../utils/newRequest";

// const Orders = () => {
//   const currentUser = JSON.parse(localStorage.getItem("currentUser"));

//   const navigate = useNavigate();
//   const { isLoading, error, data } = useQuery({
//     queryKey: ["orders"],
//     queryFn: () =>
//       newRequest.get(`/orders`).then((res) => {
//         return res.data;
//       }),
//   });

//   const handleContact = async (order) => {
//     const sellerId = order.sellerId;
//     const buyerId = order.buyerId;
//     const id = sellerId + buyerId;

//     try {
//       const res = await newRequest.get(`/conversations/single/${id}`);
//       navigate(`/message/${res.data.id}`);
//     } catch (err) {
//       if (err.response.status === 404) {
//         const res = await newRequest.post(`/conversations/`, {
//           seller: currentUser.isSeller ? buyerId : sellerId,
//           buyer: currentUser.isSeller ? sellerId : buyerId,
//           isSeller:currentUser.isSeller,

//         });
//         navigate(`/message/${res.data.id}`);
//       }
//     }
//   };
//   return (
//     <div className="orders">
//       {isLoading ? (
//         "loading"
//       ) : error ? (
//         "error"
//       ) : (
//         <div className="container">
//           <div className="title">
//             <h1>Orders</h1>
//           </div>
//           <table>
//             <tr>
//               <th>Image</th>
//               <th>Title</th>
//               <th>Price</th>
//               <th>Contact</th>
//             </tr>
//             {data.map((order) => (
//               <tr key={order._id}>
//                 <td>
//                   <img className="image" src={order.img} alt="" />
//                 </td>
//                 <td>{order.title}</td>
//                 <td>{order.price}</td>
//                 <td>
//                   <img
//                     className="message"
//                     src="./img/message.png"
//                     alt=""
//                     onClick={() => handleContact(order)}
//                   />
//                 </td>
//               </tr>
//             ))}
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Orders;
