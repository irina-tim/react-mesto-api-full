import { Navigate } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...props }) => {
  return (
    <>
      {props.loggedIn ? <Component {...props} /> : <Navigate to="/sign-in" />}
    </>
  );
};

export default PrivateRoute;
