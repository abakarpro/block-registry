import { useState, useEffect } from "react";
import PropTypes from "prop-types"; // Import de PropTypes
import constants from "../config/constants.json";
import generateActePDF from "./generatePDF";

//import { Link } from "react-router-dom";
import axios from "axios";
import { FaHome,  FaTasks, FaList, FaExclamationTriangle, FaCheckDouble, FaRegEdit } from "react-icons/fa";
//import generatePDF from "./generatePDF";

import jsPDF from "jspdf";
import "jspdf-autotable";

import TaskDetails from "./TaskDetails";
import TaskList from "./TaskList";
import { Link } from "react-router-dom";


function DocTaskList(props) {
  const instance= constants.role[props.user.role]?.instance;
  let done = constants.role[props.user.role]?.done;
  let notes = constants.role[props.user.role]?.notes.done;
  let reject = constants.role[props.user.role]?.reject;
  let  signed = constants.role[props.user.role]?.signed;
  // const [docNumber, setDocNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false); // État pour suivre si le formulaire est en cours de chargement
  // const [message, setMessge] = useState('');
  //const [selectedActe, setSelectedActe] = useState(null);
  const [actes, setActes] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  //const [showDialog, setShowDialog] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [filteredActes, setFilteredActes] = useState([]);
  const [filteredValue, setFilteredValue] = useState(
    constants.role[props.user.role]?.instance
  );
  const [title, setTitle] = useState("");
  const centre = props.user.centre;

  const url = constants.host + constants.port;

  const handleTask = (value, title) => {
    if (value) {
      setFilteredValue(value);
      setTitle(title);
    }
  };

  const handlePdf = () => {
    const doc = new jsPDF();
    const titles = "LISTE DES ACTES DE NAISSANCES - " + title;
    const padding = 10;
    const center =
      doc.internal.pageSize.width / 2 - doc.getTextWidth(titles) / 2;

    //doc.autoTable({ html: '#my-table' })
    doc.text(titles, center, padding);

    doc.autoTable({
      head: [
        [
          "#",
          "Numero",
          "Noms de l'enfant",
          "Date et lieu de naissance",
          "Nom du Père",
          "Nom de la Mère",
        ],
      ],
      body: filteredActes.map((val, i) => [
        i + 1,
        val.Key,
        val.Record.surname + " " + val.Record.givenName,
        val.Record.dateBirth + " à " + val.Record.placeBirth,
        val.Record.fatherName,
        val.Record.motherName,
      ]),
    });
    doc.save(title+".pdf");
  };

  const handleActePdf = (myActe) => {
    //const {jsPDF} = window.jspdf;
    //console.log(myActe.Key);
    generateActePDF({
        data: myActe.Record,
        id: myActe.Key
      });
  }

  useEffect(() => {
    async function getDocsByCentre() {
     
        setIsLoading(true);
        const queryParams = {
          args: JSON.stringify([centre]),
          peer: "peer0.org1.example.com",
          fcn: "queryDocsByCentre",
        };
        
        const token = localStorage.getItem("token");
        if (!token) {
          setErrorMessage(
            "Jet de connexion manquant. Veuillez vous connecter d'abord."
          );
          return;
        }
      

        try {
          const response = await axios.get(`${url}/channels/mychannel/chaincodes/fabdoc`, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            params: queryParams,
          });

          if (response.data.result) {
            setActes(response.data.result);           
           // console.log("Résultat", response.data.result);           
          } else {
            setErrorMessage("Aucun document trouvé pour ce Centre.");
          }
        } catch (error) {
          setErrorMessage("Une erreur s'est produite lors de la récupération des documents de ce Centre.");
          console.error("Erreur de récupération des données:", error);
        } finally {
          setIsLoading(false);
        }       
      }
      if (filteredValue ) {
    getDocsByCentre(); 
     //console.log(props.user);   
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredValue, url, props.user.role]);

  // Utilisation de useEffect pour mettre à jour filteredActes après avoir reçu des données
  useEffect(() => {
    setFilteredActes(filterActesByStatus(filteredValue));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actes, filteredValue]);

  const filterActesByStatus = (status) => {
    if (!status) return [];
    return actes ? actes.filter(a => a.Record.status === status) : [];
  };  

    // Utilisation de useEffect pour appeler handleTask au chargement de la page
    useEffect(() => {
      if(!instance) return;
      handleTask(instance, constants.task.instance.title);
      //console.log("instance : " + instance);
    }, [instance]);
  // // const navigate = useNavigate();
  const handleHome = () => {
    // navigate('/');
    window.location.href = "/";
  };

  // Fonction pour gérer le clic sur une ligne du tableau
  // const handleRowClick = (acte) => {
  //   setDocNumber(acte.Key);
  //   const myActe = {
  //     docNumber: acte.Key,
  //     lastName: acte.lastName,
  //     firstName: acte.firstName,
  //     dateBirth: acte.dateBirth,
  //     placeBirth: acte.placeBirth,
  //     gender: acte.gender,

  //     fatherName: acte.fatherName,
  //     fatherBornAt: acte.fatherBornAt,
  //     fatherBornOn: acte.fatherBornOn,
  //     fatherResidence: acte.fatherResidence,
  //     fatherOccupation: acte.fatherOccupation,
  //     fatherNationality: acte.fatherNationality,
  //     fatherDocument: acte.fatherDocument,

  //     motherName: acte.motherName,
  //     motherBornAt: acte.motherBornAt,
  //     motherBornOn: acte.motherBornOn,
  //     motherResidence: acte.motherResidence,
  //     motherOccupation: acte.motherOccupation,
  //     motherNationality: acte.motherNationality,
  //     motherDocument: acte.motherDocument,

  //     declarer: acte.declarer,
  //     registrationDate: acte.registrationDate,
  //     centre: acte.centre,
  //     officer: acte.officer,
  //     secretary: acte.secretary,
  //   };

  //   console.log(myActe);
  //   setSelectedActe(myActe); // Stocker l'acte sélectionné dans l'état
  //   setShowDialog(true);
  // };

  // const handleActePdf = (searchResult) => {
  //   //const {jsPDF} = window.jspdf;
  //   generatePDF({
  //     data: searchResult,
  //     id: docNumber,
  //   });
  // };

  // useEffect(() => {
  //   function initParam(){

  //  if(instance){
  //   console.log("initParam ...");
  //   setFilteredValue(instance);
  //   handleTask(constants.role[props.role]?.instance, constants.task.instance);
  //     console.log("instance : " + instance);   
  //  }        
  //   }
  //  initParam();
    
  // // },[instance, props.role,setFilteredValue]);
  // const handleReject = (docNumber) => {
  //   const job ="3";
  //   handleSubmit(docNumber, job);
  // }

  // Transmission de la tache; mise a jour du STATUS = 1
  const handleSubmit = (docNumber, job) => {
    // e.preventDefault();
    let operator = ""
     // Définir isLoading à true lors de la soumission du formulaire   // setDivVisible(false);
    setIsLoading(true); 
    if(props.user.role===constants.ROLES.OFFICER){
       operator = props.user.fullname;
    }
   
    //alert("Voulez vous effectuer ce traitement :" + notes);
 
    if(job){
       done = constants.role[props.user.role]?.reject;
       notes = constants.role[props.user.role]?.notes.instance;      
    }
   // console.log("statuts :", done);
    const requestData = {
      fcn: "changeDocStatus",
      peers: ["peer0.org1.example.com", "peer0.org2.example.com"],
      chaincodeName: "fabdoc",
      channelName: "mychannel",
      args: [docNumber, operator, done, notes],
    };

    const token = localStorage.getItem("token");
    if (!token) {
      setErrorMessage(
        "Jet de connexion manquant. Veuillez vous connecter d'abord."
      );
      setIsLoading(false); // Définir isLoading à false en cas d'erreur
      return;
    }
   
    axios
      .post(`${url}/channels/mychannel/chaincodes/fabdoc`, requestData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json", // Spécifier le Content-Type comme application/json
        },
      })
      .then((response) => {
        if (response.data.result && response.data.result.message) {
          // setSuccessMessage(response.data.result.message);
          <div
            className="spinner-border text-primary align-items-center"
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </div>;
          console.log("changememt status : ", response.data.result);
        } else {
          setErrorMessage(
            "Une erreur s'est produite lors de la mise a jour de ce document."
          );
        }
      })
      .catch((error) => {
        setErrorMessage(
          "Une erreur s'est produite lors de la mise a jour de ce document."
        );
        console.error(
          "Une erreur s'est produite lors de la mise a jour de ce document :",
          error
        );
      })
      .finally(() => {
        setIsLoading(false); // Définir isLoading à false une fois que la requête est terminée, qu'elle soit réussie ou non
        //window.location.reload();  //Recharger la page
        window.location.href = "/tasklist";
      });
    //  console.log("docNumber :", docNumber);    console.log();
  };
  

  return (
    <>  
      <div className="row gx-0  nav bg-info-subtle bg-gradient bg-opacity-50">

      <div className="col  m-0">
          <button
            onClick={() => handleTask(instance, constants.task.instance.title)}
            className="btn btn-outline-primary btn-sm rounded-5 m-1"
          >
            {" "}
            <FaList /> {constants.task.instance.item} 
            <span className="badge rounded-pill bg-primary " >   {filterActesByStatus(instance).length}</span>           
          </button>
          <button
            onClick={() => handleTask(done, constants.task.done[props.user.role].title)}
            className="btn btn-outline-success btn-sm rounded-5 m-1"
          >
            {" "}
            <FaTasks /> {props.user.role && constants.task.done[props.user.role].item}
            <span className="badge rounded-pill bg-success " >   {filterActesByStatus(done).length}</span>
          </button>
          {props.user.role==constants.ROLES.SECRETARY && (
             //if role == secretary  
             <button
             onClick={() => handleTask(signed, constants.task.signed[props.user.role].title)}
             className="btn btn-outline-dark btn-sm rounded-5 m-1"
           >
             {" "}
             <FaCheckDouble /> {constants.task.signed[props.user.role].item} 
             <span className="badge rounded-pill bg-dark " >   {filterActesByStatus(signed).length}</span>            
           </button>
            )}
          <button
            onClick={() => handleTask(reject, constants.task.reject.title)}
            className="btn btn-outline-danger btn-sm rounded-5 m-1"
          >
            {" "}
            <FaExclamationTriangle /> {constants.task.reject.item} 
            <span className="badge rounded-pill bg-danger " >   {filterActesByStatus(reject).length}</span>              
          </button>
        </div>

      <div className="col row">
      <div className="col text-end">
          {" "}


          {props.user.role !== constants.ROLES.OFFICER && (
                    <Link to="/add-doc" className="btn btn-sm btn-outline-dark rounded-3 m-2">
                      
                        <FaRegEdit />
                     
                      <span> Nouvel Acte </span>
                    </Link>
                  )}        
        
          {" "}
          <button
            onClick={handleHome}
            className="btn btn-sm btn-outline-dark rounded-3 m-2"
          >
            {" "}
            <FaHome /> Home 
          </button>
        </div>          
      </div>    
       
      </div>
     
      <div className="task-manager">
        <TaskList
          tasks={filteredActes}
          onSelectTask={setSelectedTask}
          title={title}   
          handlePdf={handlePdf}       
        />
        <TaskDetails
          task={selectedTask}
          handleSubmit={handleSubmit}
          handleActePdf={handleActePdf}
          role={props.user.role}         
        />
        {/* 
        <div className="d-flex vh-100 justify-content-center align-items-center">
          <div className="container m-0">
           

            {showDialog && (
              <div
                className="modal"
                tabIndex="-1"
                style={{ display: "block" }}
                data-bs-backdrop="static"
                data-bs-keyboard="false"
              >
                <div className="modal-dialog modal-xl" role="document">
                  <div className="modal-content">
                    <div className="modal-header bg-dark text-light ">
                      <h5 className="modal-title text-center">
                        Acte de naissance {docNumber}
                      </h5>
                      <button
                        type="button"
                        className="btn-close"
                        onClick={() => setShowDialog(false)}
                        aria-label="Close"
                      ></button>
                    </div>

                    {/* <div className="card-body bg-secondary-subtle">
                      <DocDetails docInfo={selectedActe} />

                      <div>
                        <div className="card-footer d-flex justify-content-between bg-dark bg-gradient mt-0">
                          <button
                            onClick={() => setShowDialog(false)}
                            className="btn btn-secondary rounded-5"
                            aria-label="Close"
                          >{`Fermer`}</button>
                          <button
                            type="button"
                            className="btn btn-outline-primary rounded-5"
                          >{`Obtenir l'historique`}</button>
                          <button
                            type="button"
                            className="btn btn-outline-secondary rounded-5"
                            onClick={() => handleActePdf(selectedActe)}
                          >
                            Generer PDF
                          </button>
                        </div>
                      </div>
                    </div> */}
        {/* </div> */}
        {/* </div> */}
        {/* </div> */}
        {/* )} */}
        {/* </div> */}
        {/* </div> */}
      </div>
    </>
  );
}



DocTaskList.propTypes = {
  user: PropTypes.object.isRequired,
  // onLogout: PropTypes.func.isRequired,
};

export default DocTaskList;
