import { Navigate } from "react-router-dom";
import { useUser } from "../../context/CurrentUserContext";

/* eslint-disable react/prop-types */ // TODO: upgrade to latest eslint tooling
const ProtectedRouteElement = ({ element: Component, ...props }) => {
  const {isLogged} = useUser()
    return isLogged ? (
      <Component {...props} />
    ) : (
      <Navigate to="/" replace />
    );
  };

export default ProtectedRouteElement;