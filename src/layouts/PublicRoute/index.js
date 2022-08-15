import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function PublicRoute({ children }) {
  const isAuthenticated = useSelector((state) => !!state.user);
  if (isAuthenticated) return <Navigate to="/" replace />;

  return children;
}

export default PublicRoute;
