// AuthWrapper.js
import { Navigate, useLocation } from "react-router-dom";
import PropTypes from 'prop-types';

const AuthWrapper = ({ isAuthenticated, children }) => {
  const location = useLocation();
  
  return isAuthenticated ? (
    children
  ) :  (<><Navigate to="/login" state={{ from: location }}  />
  </>   
  )
  ;
};

AuthWrapper.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};

export default AuthWrapper;
