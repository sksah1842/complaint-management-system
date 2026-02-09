import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const RoleRoute = ({ children, allowedRole }) => {
  const { role } = useAuth();
  return role === allowedRole ? children : <Navigate to="/" replace />;
};

export default RoleRoute;
