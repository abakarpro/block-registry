//import React from 'react';
// import { FaUserCog } from 'react-icons/fa';
import PropTypes from "prop-types"; // Import de PropTypes
import PARAMS from './constants';
const ActeHistory = ({docInfo , docNumber , setShowHistoryDialog} ) => {
  
    return(        
        <div>
          <div className="modal" role="dialog" tabIndex="-1" style={{ display: 'block' }}>
          <div className="modal-dialog modal-xl" role="document">
            <div className="modal-content">
              <div className="modal-header bg-dark text-light ">
                <h5 className="modal-title text-center">Historique du document {docNumber}</h5>
                <button type="button" className="btn-close bg-secondary" onClick={() => setShowHistoryDialog(false)} aria-label="Close"></button>
              </div>
              <div className="modal-body">
              <ul>

               {docInfo.map((historyItem, index) => (
                    <li key={index}>
                      <span className="bg-info"> <b>Transaction ID: </b><em>{historyItem.TxId}</em> </span>
                      <ul>                        
                        <li><b>Timestamp: </b><em>{historyItem.Timestamp}</em> </li>
                        <li> <b>{PARAMS.LABELS.childSurname}: </b><em>{historyItem.Value.surname}</em> </li>
                        <li><b>{PARAMS.LABELS.childGivenName}: </b><em>{historyItem.Value.givenName}</em> </li>
                        <li><b>{PARAMS.LABELS.childDateBirth}:  </b><em>{historyItem.Value.dateBirth}</em></li>
                        <li> <b>{PARAMS.LABELS.childPlaceBirth}: </b><em>{historyItem.Value.placeBirth}</em> </li>
                        <li> <b>{PARAMS.LABELS.childSex}: </b><em>{historyItem.Value.gender}</em> </li>

                        <li><b>{PARAMS.LABELS.fatherName}: </b><em>{historyItem.Value.fatherName}</em> </li>
                        <li><b>{PARAMS.LABELS.fatherBornAt}: </b><em>{historyItem.Value.fatherBornAt}</em> </li>
                        <li><b>{PARAMS.LABELS.fatherBornOn}: </b><em>{historyItem.Value.fatherBornOn}</em> </li>
                        <li><b>{PARAMS.LABELS.fatherResidence}: </b><em>{historyItem.Value.fatherResidence}</em> </li>
                        <li> <b>{PARAMS.LABELS.fatherOccupation}: </b><em>{historyItem.Value.fatherOccupation}</em></li>
                        <li> <b>{PARAMS.LABELS.fatherNationality}: </b><em>{historyItem.Value.fatherNationality}</em></li>
                        <li><b>{PARAMS.LABELS.fatherDocument}: </b><em>{historyItem.Value.fatherDocument}</em></li>
                        <li><b>{PARAMS.LABELS.motherName}:  </b><em>{historyItem.Value.motherName}</em></li>
                        <li><b>{PARAMS.LABELS.motherBornAt}: </b><em>{historyItem.Value.motherBornAt}</em> </li>
                        <li><b>{PARAMS.LABELS.motherBornOn}: </b><em>{historyItem.Value.motherBornOn}</em> </li>
                        <li><b>{PARAMS.LABELS.motherResidence}: </b><em>{historyItem.Value.motherResidence}</em> </li>
                        <li> <b>{PARAMS.LABELS.motherOccupation}: </b><em>{historyItem.Value.motherOccupation}</em></li>
                        <li><b>{PARAMS.LABELS.motherNationality}: </b><em>{historyItem.Value.motherNationality}</em></li>
                        <li> <b>{PARAMS.LABELS.motherDocument}: </b><em>{historyItem.Value.motherDocument}</em></li>

                        <li> <b>{PARAMS.LABELS.declarer}: </b><em>{historyItem.Value.declarer}</em> </li>
                        <li><b>{PARAMS.LABELS.registrationDate}: </b><em>{historyItem.Value.registrationDate}</em> </li>
                        <li><b>{PARAMS.LABELS.regitrationCenter}: </b><em>{historyItem.Value.centre}</em> </li>
                        <li><b>{PARAMS.LABELS.secretary}: </b><em>{historyItem.Value.secretary}</em> </li>
                        <li> <b>{PARAMS.LABELS.officer}: </b><em>{historyItem.Value.officer}</em> </li>     
                        <li> <b>{PARAMS.LABELS.status}: </b><em>{historyItem.Value.observations}</em> </li>                    
                      </ul>               
                    </li>
                  ))}

          {/* <h4>   <b>{PARAMS.LABELS.document} : </b><em>{docInfo.Key}</em>  </h4> */}         
          </ul>
          </div>
      </div>
      </div>
          </div>
        </div>
    );
};


ActeHistory.propTypes = {
 // docInfo: PropTypes.shape({}),
 // user: PropTypes.object.isRequired,
  // onLogout: PropTypes.func.isRequired,
};
export default ActeHistory;