import { useContext } from "react";
import { AuthContext } from "../../Authentication/AuthContext";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
    children: JSX.Element;
};

const ProtectedRoute = ({children}: ProtectedRouteProps) => {
  const authContext = useContext(AuthContext); 
    return (
        authContext?.token ? children : <Navigate to='/login' />
  )
}

export default ProtectedRoute