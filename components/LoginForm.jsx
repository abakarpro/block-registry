import { useState } from 'react';
//import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function LoginForm() {
    const [formData, setFormData] = useState({ username: '', orgName: '' });
    const [errorMessage, setErrorMessage] = useState('');
    const PORT = 4000;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    //const navigate = useNavigate();
    const handleSubmit = (e) => {
        // Vérifier si les champs sont vides
        if (!formData.username || !formData.orgName) {
            setErrorMessage('Veuillez remplir tous les champs');
            return;
        }
        e.preventDefault();
        axios.post('http://localhost:'+PORT+'/users/login', formData)
            .then(response => {
                if (response.data.success) {
                    const token = response.data.message.token;
                    localStorage.setItem('token', token);   // Enregistrer le token d'authentification dans le stockage local
                    console.log('token' + token);// Vérification de la valeur du token après l'enregistrement
                    window.location.href = "/"; // Redirection vers la page d'accueil après une connexion réussie

                    //navigate("/"); // Redirection vers la page d'accueil après une connexion réussie

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
        // <div className='d-flex bg-secondary justify-content-center align-items-center'>

        <div className="card">
            <form onSubmit={handleSubmit}>
                <div className="card-header text-center bg-dark-subtle">
                    <h3 className="title ">Connexion</h3>
                </div>
                <div className="card-body bg-secondary">
                    {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                    <div className="form-floating mb-3">
                        <input type="text" id="username" name="username" className="form-control" value={formData.username} onChange={handleChange} />
                        <label htmlFor="username">{`Nom d'utilisateur:`}</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="password" className="form-control" id="password" value={formData.password} onChange={handleChange} />
                        <label htmlFor="password">Password</label>
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
                <div className="card-footer bg-dark-subtle text-center"> {/* Centrer le bouton */}
                    <button type="submit" className="btn btn-outline-primary rounded-5" disabled={!formData.username || !formData.orgName}> {`  Se connecter  `} </button> {/* Désactiver le bouton si les champs sont vides */}
                </div>
            </form>
         </div>
     
    );
}

export default LoginForm;
