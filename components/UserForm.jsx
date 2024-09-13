import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function UserForm() {
  const [formData, setFormData] = useState({ username: '', orgName: '' });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:4000/users', formData)
      .then(response => {
        if (response.data.success) {
          setSuccessMessage(response.data.message);
          setTimeout(() => {
            setSuccessMessage('');
            // Rediriger vers la page d'authentification après un délai de 2 secondes
            window.location.href = '/login'; // Adapté à votre chemin d'accès réel
          }, 2000);
        } else {
          setErrorMessage(response.data.message);
        }
      })
      .catch(error => {
        setErrorMessage('Une erreur s\'est produite lors de l\'enregistrement de l\'utilisateur.');
        console.error('Une erreur s\'est produite lors de l\'enregistrement de l\'utilisateur:', error);
      });
  };

  
  return (
    // <div className='d-flex vh-100 bg-secondary justify-content-center align-items-center'>

        <div className="col-md-12">
          <div className="card">
            {/* <div className="card-header">
              <h3>Enroller un utilisateur</h3>
            </div> */}
            <div className="card-body bg-primary-subtle">
              {successMessage && <div className="alert alert-success">{successMessage}</div>}
              {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">{`Nom d'utilisateur:`}</label>
                  <input type="text" id="username" name="username" className="form-control" value={formData.username} onChange={handleChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="orgName" className="form-label">{`Nom de l'organisation:`}</label>
                  <select id="orgName" name="orgName" className="form-select" value={formData.orgName} onChange={handleChange}>
                    <option value="">--- Veuillez sélectionner une organisation ---</option>
                    <option value="Org1">Org1</option>
                    <option value="Org2">Org2</option>
                  </select>
                </div>
              </form>
            </div>
            <div className="card-footer d-flex justify-content-between">
              <Link to="/" className="btn btn-secondary rounded-5">{`Retour à l'accueil`}</Link>
              <button type="submit" className="btn btn-primary rounded-5" onClick={handleSubmit} >Enregistrer</button>
            </div>

          </div>
        </div>
  
  );
}

export default UserForm;
