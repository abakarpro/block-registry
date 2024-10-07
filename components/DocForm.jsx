import PropTypes from 'prop-types'; // Import 
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { FaRegEdit } from "react-icons/fa";
import Col from 'react-bootstrap/Col';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import DocDetails from './DocDetails';
import constants from "../config/constants.json";

function DocForm(props) {
  
  // var today = date.getFullYear +'-'+date.getMonth+'-'+date.getDay;
 const instance= constants.role[props.user.role]?.instance;
 const notes= constants.role[props.user.role]?.notes.instance;
  const[currentDate, setCurrentDate]= useState('');
  const [centre, setCentre] = useState(props.user.centre);
  const [secretary, setSecretary] = useState(props.user.fullname);
  const [docInfo, setDocInfo] = useState({ docNumber: '', surname: '', givenName: '', dateBirth: '', placeBirth: '', gender: '', nationality: '', fatherName: '', motherName: '', motherBornOn: '', motherBornAt: '', motherOccupation: '', motherDocument: '', motherNationality: '', declarer: '', registrationDate: '', centre: '', secretary: '', officer: '', status: instance, observations: notes });
  const [isLoading, setIsLoading] = useState(false); // État pour suivre si le formulaire est en cours de chargement
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showDialog, setShowDialog] = useState(false);
  const [divVisible, setDivVisible] = useState(true);
  const url = constants.host + constants.port;
 
  const handleChange = (e) => {
    setDocInfo({ ...docInfo, [e.target.name]: e.target.value });
  };

  useEffect(()=>{
    const today = new Date().toISOString().split('T')[0];
    //setCurrentDate(formattedDate);
    setCentre(props.user.centre);
    setSecretary(props.user.fullname);
    setDocInfo(prevDocInfo => ({
      ...prevDocInfo,registrationDate: today, 
      secretary: props.user.fullname,
      centre: props.user.centre,
      status: instance,
      observations: notes
    }));
  },[props.user.fullname, instance, notes, props.user.centre]);


  //gestion access a la page
  if (props.user.role === constants.ROLES.VISITOR) {
    window.location.href = "/";
    return;
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true); // Définir isLoading à true lors de la soumission du formulaire
    setDivVisible(false);

    const requestData = {
      fcn: 'createDoc',
      peers: ['peer0.org1.example.com', 'peer0.org2.example.com'],
      chaincodeName: 'fabdoc',
      channelName: 'mychannel',
      args: [docInfo.docNumber, docInfo.surname, docInfo.givenName, docInfo.dateBirth, docInfo.placeBirth, docInfo.gender,
      docInfo.fatherName, docInfo.fatherBornOn, docInfo.fatherBornAt, docInfo.fatherOccupation, docInfo.fatherResidence, docInfo.fatherNationality, docInfo.fatherDocument,
      docInfo.motherName, docInfo.motherBornOn, docInfo.motherBornAt, docInfo.motherOccupation, docInfo.motherResidence, docInfo.motherNationality, docInfo.motherDocument,
      docInfo.declarer, docInfo.registrationDate, docInfo.centre=props.user.centre, docInfo.officer, docInfo.secretary, docInfo.status, docInfo.observations]

    };

    const token = localStorage.getItem('token');
    if (!token) {
      setErrorMessage('Jet de connexion manquant. Veuillez vous connecter d\'abord.');
      setIsLoading(false); // Définir isLoading à false en cas d'erreur

      return;
    }

    axios.post(`${url}/channels/mychannel/chaincodes/fabdoc`, requestData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json' // Spécifier le Content-Type comme application/json
      }
    })
      .then(response => {
        if (response.data.result && response.data.result.message) {
          setSuccessMessage(response.data.result.message);
          setDocInfo({
            docNumber: '', surname: '', givenName: '', dateBirth: '', placeBirth: '', gender: '',
            fatherName: '', fatherBornOn: '', fatherBornAt: '', fatherOccupation: '', fatherResidence: '', fatherNationality: '', fatherDocument: '',
            motherName: '', motherBornOn: '', motherBornAt: '', motherOccupation: '', motherResidence: '', motherNationality: '', motherDocument: '',
            declarer: '', registrationDate: '', centre: '', secretary: '', officer: '', status:'', observations: '',
          });
        } else {
          setErrorMessage('Une erreur s\'est produite lors de l\'enregistrement de ce document.');
        }
      })
      .catch(error => {
        setErrorMessage('Une erreur s\'est produite lors de l\'enregistrement de ce document.');
        console.error('Une erreur s\'est produite lors de l\'enregistrement de ce document :', error);
      })
      .finally(() => {
        setIsLoading(false); // Définir isLoading à false une fois que la requête est terminée, qu'elle soit réussie ou non
      });
    console.log()
  };

  const handleShowDialog = () => setShowDialog(true)

  const handleReload = () => {
    window.location.reload();
  };



  return (
    (props.user.role !== constants.ROLES.VISITOR) &&
    <div className='d-flex  justify-content-center align-items-center'>
      <form onSubmit={handleSubmit} className="w-75">
        <div className="card">
          <div className="card-header bg-dark bg-gradient text-light ">
          <Row className="g-1">
          <div  className='col-9' ><h3 className="title "> <FaRegEdit />{`   Enregistrement d'un Acte de Naissance`}</h3></div>
            <div  className='col-3 text-dark' >
                    <FloatingLabel label="Numéro de l'acte">
                      <Form.Control type="text" id="docNumber" name="docNumber" value={docInfo.docNumber} onChange={handleChange} placeholder="Numero de l'acte" />
                    </FloatingLabel>
            </div>
          </Row> </div>
          <div className="card-body " style={{backgroundColor:'#E6E8FA'}}>

            <div className="card border-primary">
            <div className="card-header border-primary text-primary lead fw-bold">              
                  <div  className='col-12'>{`RENSEIGNEMENTS RELATIFS À L'ENFANT`}  /  INFORMATIONS RELATING TO THE CHILD </div>                
              </div>

              <div className="card-body">
              <div className='p-1'>
                  <Row className="g-2">
                    <Col md>
                      <FloatingLabel label={constants.LABELS.childSurname}>
                        <Form.Control type="text" id="surname" name="surname" value={docInfo.surname} onChange={handleChange} placeholder="surname" />
                      </FloatingLabel>
                    </Col>
                    <Col md>
                      <FloatingLabel label={constants.LABELS.childGivenName}>
                        <Form.Control type="text" id="givenName" name="givenName" value={docInfo.givenName} onChange={handleChange} placeholder="given-name" />
                      </FloatingLabel>
                    </Col>
                  </Row>
                </div>
                <div className='p-1'>
                <Row className="g-2">
                  <Col md={2}>
                    <FloatingLabel label={constants.LABELS.childDateBirth} >
                      <Form.Control type="date" id="dateBirth" name="dateBirth" placeholder="" value={docInfo.dateBirth} onChange={handleChange} required />
                    </FloatingLabel>
                  </Col>
                  <Col md>
                    <FloatingLabel label={constants.LABELS.childPlaceBirth}>
                      <Form.Control type="text" id="placeBirth" name="placeBirth" placeholder="" value={docInfo.placeBirth} onChange={handleChange} required />
                    </FloatingLabel>
                  </Col>
                  <Col md={2}>
                    <FloatingLabel
                      controlId="floatingSelectGrid"
                      label={constants.LABELS.childSex}
                    >
                      <Form.Select aria-label="Sexe" id="gender" name="gender" value={docInfo.gender} onChange={handleChange}>
                        <option value="">--- sélectionner  ---</option>
                        <option value="male">Masculin</option>
                        <option value="female">Féminin</option>

                      </Form.Select>
                    </FloatingLabel>
                  </Col>
                </Row>
                </div>
              </div>
            </div>
            <hr />
            <div className="card border-secondary">
              <div className="card-header border-secondary text-primary lead fw-bold">
                {`PERE DE L'ENFANT | FATHER OF THE CHILD`}
              </div>
              <div className="card-body">
                <div className='p-1'>
                  <Row className="g-2">
                    <Col md>
                      <FloatingLabel label={constants.LABELS.fatherName}>
                        <Form.Control type="text" id="fatherName" name="fatherName" value={docInfo.fatherName} onChange={handleChange} />
                      </FloatingLabel>
                    </Col>

                    <Col md>
                      <FloatingLabel label={constants.LABELS.fatherBornAt}>
                        <Form.Control type="text" id="fatherBornAt" name="fatherBornAt" value={docInfo.fatherBornAt} onChange={handleChange} />
                      </FloatingLabel>
                    </Col>
                    <Col md={2}>
                      <FloatingLabel label={constants.LABELS.fatherBornOn}>
                        <Form.Control type="date" id="fatherBornOn" name="fatherBornOn" value={docInfo.fatherBornOn} onChange={handleChange} />
                      </FloatingLabel>
                    </Col>
                  </Row>
                </div>
                <div className='p-1'>
                  <Row className="g-2">
                    <Col md>
                      <FloatingLabel label={constants.LABELS.fatherResidence}>
                        <Form.Control type="text" id="fatherResidence" name="fatherResidence" value={docInfo.fatherResidence} onChange={handleChange} />
                      </FloatingLabel>
                    </Col>
                    <Col md>
                      <FloatingLabel label={constants.LABELS.fatherOccupation}>
                        <Form.Control type="text" id="fatherOccupation" name="fatherOccupation" value={docInfo.fatherOccupation} onChange={handleChange} />
                      </FloatingLabel>
                    </Col>
                    <Col md>
                      <FloatingLabel label={constants.LABELS.fatherNationality}>
                        <Form.Control type="text" id="fatherNationality" name="fatherNationality" value={docInfo.fatherNationality} onChange={handleChange} />
                      </FloatingLabel>
                    </Col>
                  </Row>
                </div>
                <div  className='p-1'>
                 <Row className="g-2">
                  <Col md>
                    <FloatingLabel label={constants.LABELS.fatherDocument}>
                      <Form.Control type="text" id="fatherDocument" name="fatherDocument" value={docInfo.fatherDocument} onChange={handleChange} />
                    </FloatingLabel>
                  </Col>
                </Row>  
                </div>
               
              </div>
            </div>
            <hr />
            <div className="card border-primary">
            <div className="card-header border-primary text-primary lead fw-bold">
                {`MERE DE L'ENFANT | MOTHER OF THE CHILD`}
              </div>
              <div className="card-body ">
              <div className='p-1'>
                  <Row className="g-2">
                    <Col md>
                      <FloatingLabel label={constants.LABELS.motherName}>
                        <Form.Control type="text" id="motherName" name="motherName" value={docInfo.motherName} onChange={handleChange} />
                      </FloatingLabel>
                    </Col>
                    <Col md>
                      <FloatingLabel label={constants.LABELS.motherBornAt}>
                        <Form.Control type="text" id="motherBornAt" name="motherBornAt" value={docInfo.motherBornAt} onChange={handleChange} />
                      </FloatingLabel>
                    </Col>
                    <Col md={2}>
                      <FloatingLabel label={constants.LABELS.motherBornOn}>
                        <Form.Control type="date" id="motherBornOn" name="motherBornOn" value={docInfo.motherBornOn} onChange={handleChange} />
                      </FloatingLabel>
                    </Col>

                  </Row>
                </div>
                <div className='p-1'>
                  <Row className="g-2">
                    <Col md>
                      <FloatingLabel label={constants.LABELS.motherResidence}>
                        <Form.Control type="text" id="motherResidence" name="motherResidence" value={docInfo.motherResidence} onChange={handleChange} />
                      </FloatingLabel>
                    </Col>
                    <Col md>
                      <FloatingLabel label={constants.LABELS.motherOccupation}>
                        <Form.Control type="text" id="motherOccupation" name="motherOccupation" value={docInfo.motherOccupation} onChange={handleChange} />
                      </FloatingLabel>
                    </Col>
                    <Col md>
                      <FloatingLabel label={constants.LABELS.motherNationality}>
                        <Form.Control type="text" id="motherNationality" name="motherNationality" value={docInfo.motherNationality} onChange={handleChange} />
                      </FloatingLabel>
                    </Col>
                  </Row>
                </div>
                <div className='p-1'>
                 <Row className="g-2">
                  <Col md>
                    <FloatingLabel label={constants.LABELS.motherDocument}>
                      <Form.Control type="text" id="motherDocument" name="motherDocument" value={docInfo.motherDocument} onChange={handleChange} />
                    </FloatingLabel>
                  </Col>
                </Row>  
                </div>               
              </div>
            </div>

            <hr />
            <div className="card border-dark">
            <div className="card-header border-dark text-primary lead fw-bold">
                DECLARANT, SECRETAIRE & OFFICIER
              </div>
              <div className="card-body">
              <div className='p-1'>
                  <Row className="g-2">
                    <Col md>
                      <FloatingLabel label={constants.LABELS.declarer}>
                        <Form.Control type="text" id="declarer" name="declarer" value={docInfo.declarer} onChange={handleChange} />
                      </FloatingLabel>
                    </Col>
                  </Row>
                </div>
                <div className='p-1'>
                  <Row className="g-2">
                    <Col md={3}>
                      <FloatingLabel label={constants.LABELS.registrationDate}>
                        <Form.Control readOnly type="date" id="registrationDate" name="registrationDate" value={docInfo.registrationDate} onChange={handleChange}  />
                      </FloatingLabel>
                    </Col>
                    <Col md>
                      <FloatingLabel label={constants.LABELS.regitrationCenter}>
                        <Form.Control type="text" id="centre" name="centre" value={docInfo.centre} onChange={handleChange} readOnly/>
                      </FloatingLabel>
                    </Col>
                  </Row>
                </div>
                <div className='p-1'>
                  <Row className="g-2">
                    <Col md>
                      <FloatingLabel label="Secrétaire">
                        <Form.Control type="text" id="secretary" name="secretary" value={docInfo.secretary} onChange={handleChange} readOnly/>
                      </FloatingLabel>
                    </Col>
                    <Col md>
                      <FloatingLabel label="Officier d'Etat-Civil">
                        <Form.Control type="text" id="officer" name="officer" value={docInfo.officer} onChange={handleChange} disabled/>
                      </FloatingLabel>
                    </Col>
                  </Row>
                </div>
              </div>
            </div>
          </div>

          {showDialog && (
            <div className="modal" tabIndex="-1" style={{ display: 'block' }} data-bs-backdrop="static" data-bs-keyboard="false" >
              <div className="modal-dialog modal-lg" >
                <div className="modal-content">
                  <div className="modal-header bg-dark bg-gradient text-light">
                    <h5 className="modal-title">ACTE DE NAISSANCE / BIRTH CERTIFICATE N° :  {docInfo.docNumber}</h5>
                    <button type="button" className="btn-close" onClick={() => setShowDialog(false)} aria-label="Close"></button>
                  </div>
                  <div className="modal-body text-dark">
                    {successMessage && <div className="alert alert-success">{successMessage}</div>}
                    {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                    {divVisible ?
                      <>
                        <DocDetails docInfo={docInfo} />
                      </>
                      :
                      <>                      
                      {isLoading && (                     
                        <div className="spinner-border text-primary center" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>   
                     )
                      }</>
                     
                    }

                  </div>
                  <div className="modal-footer bg-dark bg-gradient text-light">
                    {!successMessage && <>
                      <Button variant="secondary rounded-5" onClick={() => setShowDialog(false)}>
                        Close
                      </Button>
                      <Button type="submit" className="btn btn-primary rounded-5" disabled={isLoading}>
                        {isLoading ? 'En cours...' : 'Enregistrer'}
                      </Button>
                    </>}
                    {successMessage && <>
                      <Link to="/" className="btn btn-secondary rounded-5">{`Retour à l'accueil`}</Link>
                      <Button variant="primary rounded-5" onClick={handleReload}>
                        {`Enregistrer un Acte de Naissance`}
                      </Button>
                    </>}
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="card-footer d-flex justify-content-between bg-dark">
            <Link to="/" className="btn btn-secondary rounded-5">{`Retour à l'accueil`}</Link>
            <Button variant="primary rounded-5 " disabled={!docInfo.docNumber || !docInfo.surname || !docInfo.givenName || !docInfo.dateBirth || !docInfo.placeBirth || !docInfo.gender || !docInfo.motherNationality || !docInfo.motherBornOn || !docInfo.motherBornAt || !docInfo.motherName || !docInfo.declarer || !docInfo.registrationDate}
              onClick={handleShowDialog}>
              Suivant
            </Button>
          </div>
        </div>

        {showDialog && <div className="modal-backdrop show"></div>}

      </form>
    </div>

  );
}

DocForm.propTypes = {
  user: PropTypes.object,
  // onLogout: PropTypes.func.isRequired,
};

export default DocForm;
