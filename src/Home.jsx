import { Link } from "react-router-dom";
//import { useState, useEffect } from 'react';import axios from 'axios';
import { FaRegEdit, FaSignOutAlt } from "react-icons/fa";
import {
  AiOutlineFilePdf,
  AiOutlineFileSearch,
  AiOutlineOrderedList,
} from "react-icons/ai";
import PropTypes from "prop-types"; // Import de PropTypes
import constants from "../config/constants.json";

function Home(props) {
  return (
    <div className="d-flex vh-100  justify-content-center align-items-center">
      <div className="w-50 text-center">
        <div className="card md-12 bg-dark bg-gradient">
          <div className="card-header">
            <h3 className="title text-light">Accueil</h3>
          </div>

          <div className="card-body  bg-secondary-subtle ">
            <p>Menu </p>
            {props.user ? (
              props.user.role !== constants.ROLES.VISITOR && (
                <>
                  <Link to="/add-doc" className="buttonx">
                    <div className="icon">
                      <FaRegEdit />
                    </div>
                    <span> Nouvel Acte </span>
                  </Link>

                  <Link to="/tasklist" className="buttonx">
                    <div className="icon">
                      <AiOutlineOrderedList />
                    </div>
                    <span>Taches</span>
                  </Link>

                  <Link to="/list-doc" className="buttonx">
                    <div className="icon">
                      <AiOutlineFilePdf />
                    </div>
                    <span> Rapport </span>
                  </Link>
                </>
              )
            ) : (
              <p> Chargement des informations de profil en cours ...</p>
            )}

            <Link to="/search-doc" className="buttonx">
              <div className="icon">
                <AiOutlineFileSearch />
              </div>
              <span>Recherche</span>
            </Link>

            <button className="buttonx" onClick={props.onLogout}>
              <div className="icon">
                <FaSignOutAlt />
              </div>
              <span>Deconnexion</span>
            </button>

            <div
              style={{
                width: "1px",
                height: "50px",
                backgroundColor: "#ccc",
                margin: "0 20px",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}



Home.propTypes = {
  user: PropTypes.object.isRequired,   
  onLogout: PropTypes.func.isRequired,
};





export default Home;
