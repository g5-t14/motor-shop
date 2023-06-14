import { Route, Routes } from "react-router-dom";
import { Home } from "../pages/home";
import { AdvertiserProfile } from "../pages/advertiser";
import { Login } from "../pages/login";

export const RoutesMain = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/advertiser" element={<AdvertiserProfile />} />
    </Routes>
  );
};
