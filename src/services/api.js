import axios from "axios";

// const apiUrl = "http://localhost:3333/";
const apiUrl = "https://tcc-lumni-backend-c51874ccfe49.herokuapp.com/";

const api = axios.create({
  baseURL: apiUrl,
});

export default api;
