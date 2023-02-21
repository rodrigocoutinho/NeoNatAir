import axios from "axios";
import authHeader from "./authHeader";

const API_URL = "https://neonatair-backend.azurewebsites.net/";

const registerUser = (cpf, telefone, name, email, roles, password, confPassword) => {
  return axios.post(API_URL + "register", {
    cpf,
    telefone,
    name,
    email,
    roles,
    password,
    confPassword
  });
};

const login = async (email, password) => {
  const response = await axios
    .post(API_URL + "login", {
      email,
      password,
    });
  if (response.data.accessToken) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const getAllUsers = async () =>{
  return axios.get(API_URL + "users", { headers: authHeader() });
};

const AuthserviceApi = {
  registerUser,
  login,
  logout,
  getCurrentUser,
  getAllUsers
};

export default AuthserviceApi