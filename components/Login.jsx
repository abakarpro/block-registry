import { useState } from 'react';
//import { useNavigate } from 'react-router-dom';
import {  toast } from 'react-toastify';
import axios from 'axios';
import constants from "../config/constants.json";

function Login() {
    const [formData, setFormData] = useState({ username: '', password: '', orgName: '' });
    const [errorMessage, setErrorMessage] = useState('');
    const url = constants.host + constants.port;
    // const [role, setRole] = useState('');    //const navigate = useNavigate();
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };


    // Rendre la fonction asynchrone
    async function handleSubmit(e) {
        // Vérifier si les champs sont vides
        if (!formData.username || !formData.orgName) {
            setErrorMessage('Veuillez remplir tous les champs');
            return;
        }
        e.preventDefault();  //// Empêche le comportement par défaut du formulaire
        // console.log("envoi des data au serveur ...");
        try {
            const response = await axios.post(`${url}/login`, formData); // Attendre la réponse de la requête POST

            if (response.data.success) {
                toast.success(`Content de te revoir ${formData.username} !`);
                const token = response.data.message.token;
                localStorage.setItem('token', token); // Enregistrer le token d'authentification dans le stockage local
                window.location.href = "/profil"; // Redirection vers la page d'accueil après une connexion réussie
                //navigate("/profil"); // Redirection vers la page d'accueil après une connexion réussie
               
            } else {
                setErrorMessage(response.data.message);
                toast.error(response.data.message);
               // console.log("Réponse non success :", response.data.message);
            }
        } catch (error) {
            setErrorMessage('Une erreur s\'est produite lors de la connexion :', error.message);
            console.error('Une erreur s\'est produite lors de la connexion :', error);        }
    }

    return (
        <div className='d-flex vh-100  justify-content-center align-items-center'>
        
            <div className="">
                <div className="card">
                    <form onSubmit={handleSubmit}>
                        <div className="card-header text-center bg-dark bg-gradient text-light">
                            <h3 className="title "> Block-Registry  {`>`} Connexion</h3>
                        </div>
                        <div className="card-body bg-primary-subtle">
                            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

                            <div className="form-floating mb-3">
                                <input type="text" id="username" name="username" className="form-control" value={formData.username} onChange={handleChange} />
                                <label htmlFor="username">{`Nom d'utilisateur`}</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input required type="password" id="password" name="password" className="form-control" value={formData.password} onChange={handleChange} />
                                <label htmlFor="password">{`Mot de passe`}</label>
                            </div>

                            <div className="form-floating mb-3">
                                <select id="orgName" name="orgName" className="form-select" value={formData.orgName} onChange={handleChange}>
                                    <option value="">--- Veuillez sélectionner une organisation ---</option>
                                    <option value="Org1">Org1</option>
                                    <option value="Org2">Org2</option>
                                </select>
                                <label htmlFor="orgName" className="form-label">{`Nom de l'organisation:`}</label>
                            </div>

                        </div>
                        <div className="card-footer bg-dark bg-gradient text-center"> {/* Centrer le bouton */}
                            <button type="submit" className="btn btn-outline-primary rounded-5" disabled={!formData.username || !formData.password}> {`  Se connecter  `} </button> {/* Désactiver le bouton si les champs sont vides */}
                        </div>
                    </form>
                </div>               
            </div>
        </div>
    );
}

export default Login;