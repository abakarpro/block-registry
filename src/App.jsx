import { useState, useEffect } from "react";
import { ToastContainer , toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { jwtDecode } from "jwt-decode";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import AppRoutes from "../components/AppRoutes";
import PropTypes from "prop-types";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [user, setUser] = useState({
    username: "",
    fullname: "",
    centre: "",
    orgName: "",
    role: "",
  });

  useEffect(() => {
    // Fonction pour vérifier et gérer l'expiration du jeton JWT
    const checkTokenExpiration = () => {
      if (token) {
        try {
          const decodedToken = jwtDecode(token);
          if (decodedToken.exp * 1000 < Date.now()) {
            // Si le jeton est expiré, déconnecter automatiquement l'utilisateur
            handleLogout();
            toast.error(`connexion expirée !`);
          } else {
            const Userx = {
              username: decodedToken.username,
              fullname: decodedToken.fullname,
              centre: decodedToken.centre,
              orgName: decodedToken.orgName,
              role: decodedToken.role,
            };
            // setUser(decodedToken.user || '');
            setUser(Userx);
           
          }
        } catch (error) {
           toast.error(`Token invalid  !`);
          handleLogout();
        }
      }
    };

    checkTokenExpiration();
  }, [token]);

  const handleLogin = (token) => {
    setToken(token);
    localStorage.setItem("token", token);
    const decodedToken = jwtDecode(token);

    const User_ = {
      username: decodedToken.username,
      fullname: decodedToken.fullname,
      centre: decodedToken.centre,
      orgName: decodedToken.orgName,
      role: decodedToken.role,
    };
    // setUser(decodedToken.user || '');
    setUser(User_);
    toast.success(`Content de te revoir ${User_.username} !`);
  };

  const handleLogout = () => {
    setToken(null);
    setUser("");
    localStorage.removeItem("token");
    toast.info(`Aurevoir et Revenez vite nous voir !`);
  };

  const isAuthenticated = token !== null;

  return (
    <BrowserRouter>
      <AppRoutes
        isAuthenticated={isAuthenticated}
        user={user}
        handleLogout={handleLogout}
        handleLogin={handleLogin}
      />
       <ToastContainer />
    </BrowserRouter>
  );
}

App.propTypes = {
  isAuthenticated: PropTypes.bool,
  user: PropTypes.object,
};

export default App;
