import { Route, Routes, Navigate } from "react-router-dom";
import { Home } from "../pages/home";
import { Login } from "../pages/login";
import { Register } from "../pages/register";
import { RegisterProvider } from "../Context/RegisterContext";
import { ProtectedRoutes } from "./protectedRoutes";

export const RoutesMain = () => {
  return (
    <Routes>
        <Route
          path="/register"
          element={
            <RegisterProvider>
              <Register />
            </RegisterProvider>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
