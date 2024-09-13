import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaHome, FaArrowCircleLeft } from "react-icons/fa";
import { AiOutlineFileSearch } from "react-icons/ai";
//import '../src/index.css'
import generatePDF from "./generatePDF";
import DocDetails from './DocDetails';
import constants from "../config/constants.json";



function DocSearchForm() {
  const [docNumber, setDocNumber] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [docHistory, setDocHistory] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showHistoryDialog, setShowHistoryDialog] = useState(false);
  const url = constants.host + constants.port;

  const handleChange = (e) => {
    setDocNumber(e.target.value);
  };

  const handleReload = () => {
    window.location.reload();
  };
  const navigate = useNavigate();
  const handleHome = () => {
    navigate('/');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    const queryParams = {
      args: JSON.stringify([docNumber]),
      peer: 'peer0.org1.example.com',
      fcn: 'queryDoc'
    };

    const token = localStorage.getItem('token');
    if (!token) {
      setErrorMessage('Token de connexion manquant. Veuillez vous connecter d\'abord.');
      setIsLoading(false);
      return;
    }

    axios.get(`${url}/channels/mychannel/chaincodes/fabdoc`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      params: queryParams
    })
      .then(response => {
        if (response.data.result) {
           setSearchResult(response.data.result);
        } else {
          setErrorMessage('Aucun résultat trouvé pour ce numéro.');
        }
      })
      .catch(error => {
        setErrorMessage('Une erreur s\'est produite lors de la recherche du document.');
        console.error('Une erreur s\'est produite lors de la recherche du document:', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const getDocHistory = () => {
    const queryParams = {
      args: JSON.stringify([docNumber]),
      peer: 'peer0.org1.example.com',
      fcn: 'getHistoryForAsset'
    };

    const token = localStorage.getItem('token');
    if (!token) {
      setErrorMessage('Jet de connexion manquant. Veuillez vous connecter d\'abord.');
      return;
    }

    axios.get(`${url}/channels/mychannel/chaincodes/fabdoc`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      params: queryParams
    })
      .then(response => {
        if (response.data.result) {
          setDocHistory(response.data.result);
          setShowHistoryDialog(true);
        } else {
          setErrorMessage('Aucun historique trouvé pour ce numéro du document.');
        }
      })
      .catch(error => {
        setErrorMessage('Une erreur s\'est produite lors de la récupération de l\'historique de ce document.');
        console.error('Une erreur s\'est produite lors de la récupération de l\'historique de ce document:', error);
      });
  };
  const handlePdf = (searchResult) => {
    //const {jsPDF} = window.jspdf;
    generatePDF({
        data: searchResult,
        id: docNumber
      });
  }
  
  return (
    <div className='d-flex vh-100 justify-content-center align-items-center'>
      <div className="w-75">
        <div className="col-md-12">
          <div className="card bg-dark bg-gradient ">
            <div className="card-header text-light">
              <h4 className="title d-flex justify-content-between ">
                {searchResult ?
                  <> {`Résultat de la recherche [ ` +  docNumber + ` ]` } <button className='btn btn-outline-secondary rounded-5'> <FaArrowCircleLeft onClick={handleReload} />  </button>    </>
                  :
                  <> <div> <AiOutlineFileSearch /> {` Rechercher un Acte` }  </div> <button className='btn btn-outline-secondary rounded-5'> <FaHome onClick={handleHome} /> </button>     </>
                }
              </h4>
            </div>
            <div className="card-body bg-secondary-subtle">
              {errorMessage &&
                <div className="alert alert-danger">{errorMessage}
                  <Link to="/login" className="btn btn-outline-primary rounded-5">{`Login`}</Link>
                </div>}

              {searchResult ? (
                <>
                  {searchResult ?
                  
                      <div>
                           <DocDetails  docInfo={searchResult}  />   

                      <div className="card-footer d-flex justify-content-between bg-dark bg-gradient mt-0">
                        <Link to="/" className="btn btn-secondary rounded-5">{`Retour à l'accueil`}</Link>
                        <button type="button" className="btn btn-outline-primary rounded-5" onClick={getDocHistory}>{`Obtenir l'historique`}</button>
                        <button type="button" className='btn btn-outline-secondary rounded-5' onClick={()=>handlePdf(searchResult)}>Generer PDF</button>
                      </div>
                    </div>
                    :
                    <><div className="alert alert-warning" role="alert">
                      {`Aucun document trouvé pour ce numero : ` + docNumber}
                    </div>
                    </>

                  }

                </>
              ) : (
                <form onSubmit={handleSubmit} className="mb-0">
                  <div className="input-group rounded-5">
                    <input type="text" id="docNumber" name="docNumber" placeholder='saisir le numero' className="form-control" value={docNumber} onChange={handleChange} />
                    <button type="submit" className="btn btn-primary rounded-end-5"
                      disabled={!docNumber || isLoading} // Désactiver le bouton si docNumber est vide ou si le chargement est en cours
                    >
                      {isLoading ? 'En cours...' : 'Rechercher'}</button>
                  </div>
                </form>)
              }

            </div>

          </div>
        </div>
      </div>
      {showHistoryDialog && (
        <div className="modal" role="dialog" tabIndex="-1" style={{ display: 'block' }}>
          <div className="modal-dialog modal-xl" role="document">
            <div className="modal-content">
              <div className="modal-header bg-dark text-light ">
                <h5 className="modal-title text-center">Historique du document {docNumber}</h5>
                <button type="button" className="btn-close" onClick={() => setShowHistoryDialog(false)} aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <ul>
                  {docHistory.map((historyItem, index) => (
                    <li key={index}>
                      <b>Transaction ID: </b><em>{historyItem.TxId}</em>
                      <ul>                        
                        <li><b>Timestamp: </b><em>{historyItem.Timestamp}</em> </li>
                        <li> <b>FirstName: </b><em>{historyItem.Value.firstName}</em> </li>
                        <li><b>LastName: </b><em>{historyItem.Value.lastName}</em> </li>
                        <li><b>Date of Birth:  </b><em>{historyItem.Value.dateBirth}</em></li>
                        <li> <b>PlaceBirth: </b><em>{historyItem.Value.placeBirth}</em> </li>
                        <li> <b>Gender: </b><em>{historyItem.Value.gender}</em> </li>

                        <li><b>{`Father's Name: `} </b><em>{historyItem.Value.fatherName}</em> </li>
                        <li><b>{`Born at: `} </b><em>{historyItem.Value.fatherBornAt}</em> </li>
                        <li><b>{`On the: `} </b><em>{historyItem.Value.fatherBornOn}</em> </li>
                        <li><b>{`Resident at: `} </b><em>{historyItem.Value.fatherResidence}</em> </li>
                        <li> <b>Occupation: </b><em>{historyItem.Value.fatherOccupation}</em></li>
                        <li> <b>Nationality: </b><em>{historyItem.Value.fatherNationality}</em></li>
                        <li><b>Reference document: </b><em>{historyItem.Value.fatherDocument}</em></li>
                        <li><b>{`Mother's Name: `}  </b><em>{historyItem.Value.motherName}</em></li>
                        <li><b>{`Born at: `} </b><em>{historyItem.Value.motherBornAt}</em> </li>
                        <li><b>{`On the: `} </b><em>{historyItem.Value.motherBornOn}</em> </li>
                        <li><b>{`Resident at: `} </b><em>{historyItem.Value.motherResidence}</em> </li>
                        <li> <b>Occupation: </b><em>{historyItem.Value.motherOccupation}</em></li>
                        <li><b>Nationality: </b><em>{historyItem.Value.motherNationality}</em></li>
                        <li> <b>Reference document: </b><em>{historyItem.Value.motherDocument}</em></li>
                        <li> <b>Declant: </b><em>{historyItem.Value.declarer}</em> </li>
                        <li><b>Registration Date: </b><em>{historyItem.Value.registrationDate}</em> </li>
                        <li><b>Registry Center: </b><em>{historyItem.Value.centre}</em> </li>
                        <li> <b>{`Officier d'Etat-Civil: `} </b><em>{historyItem.Value.officer}</em> </li>
                        <li><b>Secretaire: </b><em>{historyItem.Value.secretary}</em> </li>
                      </ul>               
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
      {showHistoryDialog && <div className="modal-backdrop show"></div>}
    </div>
  );
}

export default DocSearchForm;
