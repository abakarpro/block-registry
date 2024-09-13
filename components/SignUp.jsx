import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import constants from "../config/constants.json";

const url = constants.host + constants.port;

function SignUp() {
    const [formData, setFormData] = useState({ username: '', fullname: '', password: '', email: '' , role: '' , orgName: '', centre: ''  });
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
   
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        // Vérifier si les champs sont vides
        if (!formData.username || !formData.fullname || !formData.email || !formData.password || !formData.role || !formData.orgName || !formData.centre) {
            setErrorMessage('Veuillez remplir tous les champs');
            return;
        }
        e.preventDefault();
        axios.post(`${url}/signup`, formData)
            .then(response => {
                if (response.data.success) {

                    //Prevoir notification
                    navigate("/login");
                    //  const token = response.data.message.token;
                    // localStorage.setItem('token', token);   // Enregistrer le token d'authentification dans le stockage local
                    // console.log('token' + token);// Vérification de la valeur du token après l'enregistrement

                    // window.location.href = '/'; // Redirection vers la page d'accueil après une connexion réussie

                } else {
                    setErrorMessage(response.data.message);
                }
            })
            .catch(error => {
                setErrorMessage('Une erreur s\'est produite lors de la connexion.');
                console.error('Une erreur s\'est produite lors de la connexion:', error);
            });
    };

    return (
        <div className='d-flex vh-100 justify-content-center align-items-center'>
            <div className="">
                <div className="card">
                    <form onSubmit={handleSubmit}>
                        <div className="card-header text-center bg-dark bg-gradient text-light">
                            <h3 className="title ">Sign Up</h3>
                        </div>
                        <div className="card-body bg-primary bg-opacity-25">
                            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                            <div className="form-floating mb-3">
                                <input type="text" id="fullname" name="fullname" className="form-control" value={formData.fullname} onChange={handleChange} />
                                <label htmlFor="fullname">{`Nom complet`}</label>
                            </div>

                            <div className="form-floating mb-3">
                                <input type="text" id="username" name="username" className="form-control" value={formData.username} onChange={handleChange} />
                                <label htmlFor="username">{`Login`}</label>
                            </div>
                          
                            <div className="form-floating mb-3">
                                <input type="email" id="email" name="email" className="form-control" value={formData.email} onChange={handleChange} />
                                <label htmlFor="email">{`Email`}</label>
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

                            <div className="form-floating mb-3">
                                <select id="centre" name="centre" className="form-select" value={formData.centre} onChange={handleChange}>
                                    <option value="">--- {`Choisir un Centre d'Etat-Civil` }---</option>
                                    <option value="YAOUNDE I">YAOUNDE I</option>
                                    <option value="YAOUNDE II">YAOUNDE II</option>
                                </select>
                                <label htmlFor="orgName" className="form-label">{`Nom du Centre d'Etat-Civil:`}</label>
                            </div>

                            <div className="form-floating mb-3">
                                <select id="role" name="role" className="form-select" value={formData.role} onChange={handleChange}>
                                    <option value="">--- Sélectionner un role ---</option>
                                    <option value={constants.role.ARCHIVIST}>{constants.ROLES.ARCHIVIST}</option>
                                    <option value={constants.ROLES.OFFICER}>{constants.ROLES.OFFICER}</option>
                                    <option value={constants.ROLES.SECRETARY}>{constants.ROLES.SECRETARY}</option>
                                    <option value={constants.ROLES.VISITOR}>{constants.ROLES.VISITOR}</option>
                                </select>
                                <label htmlFor="orgName" className="form-label">{`Role :`}</label>
                            </div>
                           
                          
                        </div>
                        <div className="card-footer card-header text-center bg-dark bg-gradient text-light"> {/* Centrer le bouton */}
                            <button type="submit" className="btn btn-outline-primary rounded-5" disabled={!formData.username || !formData.email || !formData.role || !formData.password || !formData.orgName}> 
                            {`  Register  `} </button> {/* Désactiver le bouton si les champs sont vides */}
                        </div>
                    </form>
                </div>
            </div>

        </div>
    );
}

export default SignUp