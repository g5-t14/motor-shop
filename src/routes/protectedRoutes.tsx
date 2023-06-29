import { Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const ProtectedRoutes = () => {
  const { tokenLoading } = useAuth();

  if (tokenLoading) {
    return <p>Carregando...</p>;
  }

  return <Outlet />;
};
