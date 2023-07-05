import { Route, Routes } from "react-router-dom";
import { Home } from "../pages/home";
import { AdvertiserProfile } from "../pages/advertiser";
import { Login } from "../pages/login";
import { Product } from "../pages/Product";
import { Register } from "../pages/register";
import { ForgotPassword } from "../pages/ForgotPassword";
import { ResetPassword } from "../pages/ResetPassword";

export const RoutesMain = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/advertiser/:id" element={<AdvertiserProfile />} />
      <Route path="/product/:id" element={<Product />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgotPassword" element={<ForgotPassword />} />
      <Route path="/resetPassword/:token" element={<ResetPassword />} />
    </Routes>
  );
};
