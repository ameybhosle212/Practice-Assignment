import { Navigate } from "react-router-dom";
import react from "react"


const ProtectedRoute = ({children }) => {
    if (!localStorage.getItem("user")) {
      return <Navigate to="/login" replace />;
    }
  
    return children;
};

export default ProtectedRoute;