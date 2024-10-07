import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaHome,  FaFilePdf, FaFileAlt, FaTimesCircle, FaHistory } from "react-icons/fa";
import generatePDF from "./generatePDF";
import constants from "../config/constants.json";

import jsPDF from 'jspdf';
import 'jspdf-autotable';
import DocDetails from './DocDetails';
import ActeHistory from './ActeHistory';

function DocList() {
  const [docNumber, setDocNumber] = useState('');
  const [selectedActe, setSelectedActe] = useState(null);
  const [docHistory, setDocHistory] = useState(null);
  const [showHistoryDialog, setShowHistoryDialog] = useState(false);
  const [actes, setActes] = useState([]);
  const [isLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showDialog, setShowDialog] = useState(false);
  const url = constants.host + constants.port;
  // const navigate = useNavigate();
  const handleHome = () => {
    // navigate('/');
    window.location.href = "/";
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

  const handlePdf = () => {
    const doc = new jsPDF();
    const title = "LISTE DES ACTES DE NAISSANCES";
    const padding = 10;
    const center = (doc.internal.pageSize.width / 2) - (doc.getTextWidth(title) / 2);


    //doc.autoTable({ html: '#my-table' })
    doc.text(title, center, padding);

    doc.autoTable({
      head: [['#', 'Numero', 'Noms de l\'enfant', 'Date et lieu de naissance', 'Nom du Père', 'Nom de la Mère']],
      body: actes.map((val, i) => [i + 1, val.Key, val.Record.surname + ' ' + val.Record.givenName, val.Record.dateBirth + ' à ' + val.Record.placeBirth, val.Record.fatherName, val.Record.motherName])
    })
    doc.save('liste-actes-de-naissance.pdf');

  }

  const getAllDocs = () => {
    const queryParams = {
      peer: 'peer0.org1.example.com',
      fcn: 'queryAllDocs'
    };

    const token = localStorage.getItem('token');
    if (!token) {
      setErrorMessage('Jet de connexion manquant. Veuillez vous connecter d\'abord.');
      return;
    }
    console.log("lecture des donnnees");
    axios.get(`${url}/channels/mychannel/chaincodes/fabdoc`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      params: queryParams
    })
      .then(response => {
        if (response.data.result) {
          setActes(response.data.result);
          // setShowHistoryDialog(true);
          //console.log("resultat", response.data.result);
        } else {
          setErrorMessage('Aucun historique trouvé pour ce numéro du document.');
        }
      })
      .catch(error => {
        setErrorMessage('Une erreur s\'est produite lors de la récupération de l\'historique de ce document.');
        console.error('Une erreur s\'est produite lors de la récupération de l\'historique de ce document:', error);
      });
  };

  // Fonction pour gérer le clic sur une ligne du tableau
  const handleRowClick = (acte) => {
    console.log(acte)
    setDocNumber(acte.Key)
    const myActe = {
      
      docNumber: acte.Key,
      surname: acte.Record.surname,
      givenName: acte.Record.givenName,
      dateBirth: acte.Record.dateBirth,
      placeBirth: acte.Record.placeBirth,
      gender: acte.Record.gender,
  
      fatherName: acte.Record.fatherName,
      fatherBornAt: acte.Record.fatherBornAt,
      fatherBornOn: acte.Record.fatherBornOn,
      fatherResidence: acte.Record.fatherResidence,
      fatherOccupation: acte.Record.fatherOccupation,
      fatherNationality: acte.Record.fatherNationality,
      fatherDocument: acte.Record.fatherDocument,
  
      motherName: acte.Record.motherName,
      motherBornAt: acte.Record.motherBornAt,
      motherBornOn: acte.Record.motherBornOn,
      motherResidence: acte.Record.motherResidence,
      motherOccupation: acte.Record.motherOccupation,
      motherNationality: acte.Record.motherNationality,
      motherDocument: acte.Record.motherDocument, 
  
      declarer: acte.Record.declarer,
      registrationDate: acte.Record.registrationDate,
      centre: acte.Record.centre,
      secretary: acte.Record.secretary,  
      officer: acte.Record.officer,     
  
  }

    console.log(myActe);
    setSelectedActe(myActe); // Stocker l'acte sélectionné dans l'état
    setShowDialog(true);
  };

  const handleActePdf = (searchResult) => {
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
                {actes ?
                  <> <div> <FaFileAlt /> {` Liste des actes de naissances  `}  </div> 
                    <button onClick={handleHome} className='btn btn-outline-secondary rounded-5'> <FaHome   /> Home </button>

                  </>
                  :
                  <> <div> <FaFileAlt /> {` Liste des actes de naissances  `}  </div> 
                  <div>
                    <button   onClick={handleHome}  className="btn btn-secondary rounded-3 m-2" >    <FaHome  /> Home </button>
                    </div> 
                    
                      </>
                }
              </h4>
            </div>
            <div className="card-body bg-secondary-subtle">
              {errorMessage &&
                <div className="alert alert-danger">{errorMessage}
                  <Link to="/login" className="btn btn-outline-primary btn-sm rounded-5">{`Login`}</Link>
                </div>}


              <div className="d-flex justify-content-between ">
                <div className="input-group">
                  <button onClick={getAllDocs} className="btn btn-primary rounded-5"
                  >
                    {isLoading ? 'En cours...' : 'Afficher'}</button>
                </div>
                <div className="input-group">
                  <button onClick={handlePdf} className='btn btn-sm btn-secondary rounded-5'> <FaFilePdf /> {`GENERER LE PDF`}</button>
                </div>
              </div>

              <table className="table table-striped mt-3">
                <thead style={{ backgroundColor: '#343a40', color: '#fff' }}>
                  <tr>
                    <th>Numero</th>
                    <th>{`Nom de l'enfant`}</th>
                    <th>date de naissance</th>
                    <th>Nom du pere</th>
                    <th>Nom de la mere</th>
                    <th>Edition</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {actes && (
                    actes.map((person, index) => (
                      <tr key={index}>
                        <td>{person.Key}</td>
                        <td>{person.Record.surname} {person.Record.givenName}</td>
                        <td>{person.Record.dateBirth}</td>
                        <td>{person.Record.fatherName}</td>
                        <td>{person.Record.motherName}</td>
                        <td>{person.Record.registrationDate}</td>
                        <td>

                          <button type="button" onClick={() => handleRowClick(person)} className='btn btn-sm btn-secondary'>Details</button>
                        </td>
                      </tr>
                    )))}
                </tbody>
              </table>
            </div>
          </div>

        </div>



        {showDialog && (
          <div className="modal" tabIndex="-1" style={{ display: 'block' }} data-bs-backdrop="static" data-bs-keyboard="false" >
         
            <div className="modal-dialog modal-xl" role="document">
              <div className="modal-content">
                <div className="modal-header bg-dark text-light ">
                  <h5 className="modal-title text-center">Acte de naissance {docNumber}</h5>
                  <button type="button" className="btn-close bg-secondary" onClick={() => setShowDialog(false)} aria-label="Close"></button>
                </div>


                <div className="card-body bg-secondary-subtle">
                  <DocDetails docInfo={selectedActe} />
                 </div>
                    
                    <div className="card-footer d-flex justify-content-between bg-dark bg-gradient">
                      <button onClick={() => setShowDialog(false)} className="btn btn-secondary rounded-5 m-1" aria-label='Close'> <FaTimesCircle /> {`Fermer`}</button>
                      <button type="button" onClick={() => getDocHistory()} className="btn btn-outline-primary rounded-5 m-1" > <FaHistory /> {`Obtenir l'historique`}</button>
                      <button type="button" className='btn btn-outline-secondary rounded-5 m-1' onClick={()=>handleActePdf(selectedActe)} > <FaFilePdf /> Generer PDF</button>
                    </div>
                 
              
              </div>
            </div>
            </div>
            )
          }


    {showHistoryDialog && (                  
            <ActeHistory docInfo={docHistory} docNumber={docNumber} setShowHistoryDialog={setShowHistoryDialog} />             
         
    )}



          </div>
       
        </div>
 );
}
export default DocList;
