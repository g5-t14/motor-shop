import { Route, Routes } from "react-router-dom";
import { Home } from "../pages/home";
import { Login } from "../pages/login";
import { Product } from "../pages/Product";
import { Register } from "../pages/register";


export const RoutesMain = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/product/:id" element={<Product/>}></Route>
      <Route path="/register" element={<Register/>}></Route>
    </Routes>
  );
};
