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
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Pay from "./pages/pay/Pay";
import Success from "./pages/success/Success";
import ProtectedRoute from "./utils/ProtectedRoute";

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

  const routes= [
    { path: "/", element: <Home /> },
    { path: "/gigs", element: <Gigs /> },
    { path: "/register", element: <Register /> },
    { path: "/login", element: <Login /> },
    {
      path: "/myGigs",
      element: (
        <ProtectedRoute>
          <MyGigs />
        </ProtectedRoute>
      ),
    },
    {
      path: "/orders",
      element: (
        <ProtectedRoute>
          <Orders />
        </ProtectedRoute>
      ),
    },
    {
      path: "/message/:id",
      element: (
        <ProtectedRoute>
          <Message />
        </ProtectedRoute>
      ),
    },
    {
      path: "/add",
      element: (
        <ProtectedRoute>
          <Add />
        </ProtectedRoute>
      ),
    },
    {
      path: "/gig/:id",
      element: (
        <ProtectedRoute>
          <Gig />
        </ProtectedRoute>
      ),
    },
    {
      path: "/pay",
      element: (
        <ProtectedRoute>
          <Pay />
        </ProtectedRoute>
      ),
    },
    {
      path: "/success",
      element: (
        <ProtectedRoute>
          <Success />
        </ProtectedRoute>
      ),
    },
    {
      path: "/completedorders",
      element: (
        <ProtectedRoute>
          <OrderCompleted />
        </ProtectedRoute>
      ),
    },
  ];

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: routes,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
