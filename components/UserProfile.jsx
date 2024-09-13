import { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types"; // Import de
//import PROFILS from "./constants";
import AdminControls from "./AdminControls";
import constants from "../config/constants.json";

// import {jsPDF} from "jspdf";

import { FaSignOutAlt, FaUserCircle } from "react-icons/fa";
//import constants from "./constants";

function UserProfile(props) {
  const [userProfile, setUserProfile] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false); // État pour suivre si le formulaire est en cours de chargement
  const url = constants.host + constants.port;
  const username = props.user.username;
  const orgName = props.user.orgName;
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${url}/users/login`, {
        username,
        orgName,
      })
      .then((response) => {
        let token = "";
        if (response.data.success) {
          token = response.data.message.token;
          localStorage.setItem("token", token);
          //console.log("token" + token);
          //console.log(props);
          // setIsLoggedIn(true);
          window.location.href = "/";
        } else {
          setErrorMessage(response.data.message);
        }
      })
      .catch((error) => {
        setErrorMessage("Une erreur s'est produite lors de la connexion.");
        console.error("Une erreur s'est produite lors de la connexion:", error);
      });
  };

  useEffect(() => {
    async function fetchUserProfile() {
      try {
        setIsLoading(true);
        const response = await axios.post(`${url}/user/username`, {
          username,
          orgName
        });

        if (response) {
          setUserProfile(response.data);
        } else {
          setErrorMessage("Aucune information trouvée pour cet Utilisateur.");
        }
      } catch (error) {
        console.error(
          "Erreur lors de la récupération du profil utilisateur :",
          error
        );
      } finally {
        setIsLoading(false);
      }
    }
    // Appel de fetchUserProfile avec les valeurs actuelles de username et orgName
    username && fetchUserProfile();
  }, [username, orgName, url]); // Seulement re-exécuté si username ou orgName changent

  return (
    <div className="d-flex vh-100  justify-content-center align-items-center">
      <div className="card col-md-6 ">
        {userProfile && !isLoading ? (
          <>
            <div className="card-header bg-dark bg-gradient text-light">
              <h3 className="card-title">
                <FaUserCircle /> {userProfile.username}
              </h3>
            </div>
            <div className="card-body container bg-secondary bg-opacity-25 center">
              <div className="ms-5">

<fieldset >
  <legend>Informations personnelles</legend>
  <p className="">
                  <b>Noms: </b> <em> {userProfile.fullname} </em>{" "}
                </p>
                <p className="">
                  <b>Email: </b> <em> {userProfile.email} </em>{" "}
                </p>
</fieldset>


               
                <p className="card-text">
                  <b>{`Nom de l'organisation: `}</b>{" "}
                  <em> {userProfile.orgName}</em>
                </p>
                <p className="card-text">
                  <b>Rôle: </b> <em> {userProfile.role}</em>{" "}
                </p>
                <p className="card-text">
                  {" "}
                  <b>Statut: </b> <em>{userProfile.status} </em>{" "}
                </p>
                <hr />
                {errorMessage && (
                  <div className="alert alert-danger">{errorMessage}</div>
                )}
                <div className="d-flex align-items-center justify-content-center">
                  <form
                    onSubmit={handleSubmit}
                    className="d-flex  align-items-center justify-content-center"
                  >
                    {userProfile.status !== constants.STATUS.ENROLLED ? (
                      <span className="alert alert-danger">
                        {"En attente d'activation de votre compte"}
                      </span>
                    ) : (
                      <button
                        type="submit"
                        onClick={handleSubmit}
                        className="buttonx"
                        disabled={
                          userProfile.status !== constants.STATUS.ENROLLED
                        }
                      >
                        <div className="icon">
                          <img
                            src={"/doc.svg"}
                            alt="logo"
                            style={{ width: "36px", height: "36px" }}
                          />
                        </div>
                        <span>Block-Registry</span>
                      </button>
                    )}
                    {userProfile.role === constants.ROLES.ADMIN && (
                      <AdminControls />
                    )}
                    <button className="buttonx" onClick={props.onLogout}>
                      <div className="icon">
                        <FaSignOutAlt />
                      </div>
                      <span>Deconnexion</span>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="align-items-center">
            <div className="text-center">
              {" "}
              Chargement des informations de profil en cours ...{""}
            </div>
            <div
              className="text-center spinner-border text-primary"
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

UserProfile.propTypes = {
  user: PropTypes.object.isRequired,
  onLogout: PropTypes.func.isRequired,
};

export default UserProfile;
