import React, { useState } from "react";
import "./Login.css";
import newRequest from "../../utils/newRequest";
import { useNavigate,Link } from "react-router-dom";
import swal from 'sweetalert';

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(username===""){
      swal({
        title: "Empty Email",
        // text: "Correct OTP!",
        icon: "error",
        button: "Try Again", 
      })
    }
    // else if(!emailRegex.test(username)){
    //   swal({
    //     title: "Not a Valid Email ID",
    //     // text: "Correct OTP!",
    //     icon: "error",
    //     button: "Try Again", 
    //   })
    // }
    else if(password===""){
      swal({
        title: "Empty Passwaord",
        // text: "Correct OTP!",
        icon: "error",
        button: "Try Again", 
      })
    }
    else{
      try {
        const res = await newRequest.post("/auth/login", { username, password });
        localStorage.setItem("currentUser", JSON.stringify(res.data));
        navigate("/")
      } catch (err) {
        // console.log(err.response.data);
        swal({
          title: err.response.data,
          // text: "Correct OTP!",
          icon: "error",
          button: "Try Again", 
        })
      }
    }
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <h1>Sign in</h1>
        <label htmlFor="">Email ID</label>
        <input
          name="username"
          type="text"
          placeholder="johndoe"
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="">Password</label>
        <input
          name="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="loginbuttononhover" type="submit">Login</button>
        {/* {error && error} */}
        <div style={{textAlign:"center"}}><Link to="/register" ><h4>Don't have an account click here</h4></Link></div>
      </form>
    </div>
  );
}

export default Login;
