import "./App.css";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import React from "react";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import Gigs from "./pages/gigs/Gigs";
import Gig from "./pages/gig/Gig";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Add from "./pages/add/Add";
import Orders from "./pages/orders/Orders";
import Messages from "./pages/messages/Messages";
import Message from "./pages/message/Message";
import OrderCompleted from "./pages/orders/orderCompleted";
import MyGigs from "./pages/myGigs/MyGigs";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import Pay from "./pages/pay/Pay";
import Success from "./pages/success/Success";
function App() {
  const queryClient = new QueryClient();

  const Layout = () => {
    return (
      <div className="app">
        <QueryClientProvider client={queryClient}>
          <Navbar />
          <Outlet />
          <Footer />
        </QueryClientProvider>
      </div>
    );
  };

  const r = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [],
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/gigs",
          element: <Gigs />,
        },
        // {
        //   path: "/myGigs",
        //   element: <MyGigs />,
        // },
        // {
        //   path: "/orders",
        //   element: <Orders />,
        // },
        // {
        //   path: "/messages",
        //   element: <Messages />,
        // },
        // {
        //   path: "/message/:id",
        //   element: <Message />,
        // },
        // {
        //   path: "/add",
        //   element: <Add />,
        // },
        // {
        //   path: "/gig/:id",
        //   element: <Gig />,
        // },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        // {
        //   path: "/pay",
        //   element: <Pay />,
        // },
        // {
        //   path: "/success",
        //   element: <Success />,
        // },
        // {
        //   path: "/completedorders",
        //   element: <OrderCompleted />,
        // },
      ],
    },
  ]);
  const bbb=createBrowserRouter([
      {
      path: "/",
      element: <Layout />,
      children: [],
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/gigs",
          element: <Gigs />,
        },
        {
          path: "/myGigs",
          element: <MyGigs />,
        },
        {
          path: "/orders",
          element: <Orders />,
        },
        // {
        //   path: "/messages",
        //   element: <Messages />,
        // },
        {
          path: "/message/:id",
          element: <Message />,
        },
        {
          path: "/add",
          element: <Add />,
        },
        {
          path: "/gig/:id",
          element: <Gig />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/pay",
          element: <Pay />,
        },
        {
          path: "/success",
          element: <Success />,
        },
        {
          path: "/completedorders",
          element: <OrderCompleted />,
        },
      ],
    },
  ]);
  //  {!localStorage.getItem("data") ? (
  //           router
  //         ) : (console.log(2))};
  return (
    <div>
      {!localStorage.getItem("currentUser") ? (
        <RouterProvider router={r} />
      ) : (
        <RouterProvider router={bbb} />
      )}
    </div>
  );
}

export default App;




// import "./App.css";
// import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
// import React from "react";
// import Navbar from "./components/navbar/Navbar";
// import Footer from "./components/footer/Footer";
// import Home from "./pages/home/Home";
// import Gigs from "./pages/gigs/Gigs";
// import Gig from "./pages/gig/Gig";
// import Login from "./pages/login/Login";
// import Register from "./pages/register/Register";
// import Add from "./pages/add/Add";
// import Orders from "./pages/orders/Orders";
// import Messages from "./pages/messages/Messages";
// import Message from "./pages/message/Message";
// import OrderCompleted from "./pages/orders/orderCompleted";
// import MyGigs from "./pages/myGigs/MyGigs";
// import {
//   QueryClient,
//   QueryClientProvider,
// } from "@tanstack/react-query";
// import Pay from "./pages/pay/Pay";
// import Success from "./pages/success/Success";
// function App() {
//   const queryClient = new QueryClient();

//   const Layout = () => {
//     return (
//       <div className="app">
//         <QueryClientProvider client={queryClient}>
//           <Navbar />
//           <Outlet />
//           <Footer />
//         </QueryClientProvider>
//       </div>
//     );
//   };

//   const router = createBrowserRouter([
//     {
//       path: "/",
//       element: <Layout />,
//       children: [
//         {
//           path: "/",
//           element: <Home />,
//         },
//         {
//           path: "/gigs",
//           element: <Gigs />,
//         },
//         {
//           path: "/myGigs",
//           element: <MyGigs />,
//         },
//         {
//           path: "/orders",
//           element: <Orders />,
//         },
//         // {
//         //   path: "/messages",
//         //   element: <Messages />,
//         // },
//         {
//           path: "/message/:id",
//           element: <Message />,
//         },
//         {
//           path: "/add",
//           element: <Add />,
//         },
//         {
//           path: "/gig/:id",
//           element: <Gig />,
//         },
//         {
//           path: "/register",
//           element: <Register />,
//         },
//         {
//           path: "/login",
//           element: <Login />,
//         },
//         {
//           path: "/pay",
//           element: <Pay />,
//         },
//         {
//           path: "/success",
//           element: <Success />,
//         },
//         {
//           path: "/completedorders",
//           element: <OrderCompleted />,
//         },
//       ],
//     },
//   ]);

//   return <RouterProvider router={router} />;
// }

// export default App;



