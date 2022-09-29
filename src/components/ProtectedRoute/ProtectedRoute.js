import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ isLoggedIn, element }) =>
  isLoggedIn ? element : <Navigate to='/' replace />;

export default ProtectedRoute;
