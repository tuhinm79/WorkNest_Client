import axios from "axios";

const newRequest = axios.create({
  baseURL: "http://localhost:8888/api",
  withCredentials: true,
});
// const newRequest = axios.create({
//   baseURL: "https://worknest-backend.onrender.com/api",
//   withCredentials: true,
// });

export default newRequest;
