import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/userAuth";

export const ProtectedRoutes = ()=>{
  const { tokenLoading, userExists } = useAuth();

  if (tokenLoading) {
    return <p>Carregando...</p>;
  }

  return userExists ? <Outlet /> : <Navigate to="/login" />;
}