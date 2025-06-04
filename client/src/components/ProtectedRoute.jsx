import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, requiredRole }) => {
  const token = sessionStorage.getItem('accessToken');
  
  if (!token) {
    return <Navigate to="/login" />;
  }

  // Decode the JWT token to get the role
  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  };

  const decodedToken = parseJwt(token);
  if (requiredRole && decodedToken.Role !== requiredRole) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;