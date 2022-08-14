import { Navigate } from 'react-router-dom';
import './ProtectedRoute.css';

const ProtectedRoute = ({ isLoggedIn, element }) => {
  return isLoggedIn ? element : <Navigate to="/" replace />;
};

export default ProtectedRoute;
