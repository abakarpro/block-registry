//import React from 'react';
// import { FaUserCog } from 'react-icons/fa';
import PropTypes from "prop-types"; // Import de PropTypes
import PARAMS from './constants';
const ActeDetails = ({docInfo}) => {
  
    return(
        
        <div>
          <h4>   <b>{PARAMS.LABELS.document} : </b><em>{docInfo.Key}</em>  </h4>
    
       <ul>
        
          <li><b>{PARAMS.LABELS.childSurname} : </b><em>{docInfo.Record.surname}</em> </li>
          <li><b>{PARAMS.LABELS.childGivenName} : </b><em>{docInfo.Record.givenName}</em> </li>

          <li><b>{PARAMS.LABELS.childDateBirth} :  </b><em>{docInfo.Record.dateBirth}</em></li>
          <li> <b>{PARAMS.LABELS.childPlaceBirth} :  </b><em>{docInfo.Record.placeBirth}</em></li>
          <li> <b>{PARAMS.LABELS.childSex} :  </b><em>{docInfo.Record.gender}</em></li>

          <li> <b>{PARAMS.LABELS.fatherName} : </b><em>{docInfo.Record.fatherName}</em> </li>
          <li> <b>{PARAMS.LABELS.fatherBornAt} : </b><em>{docInfo.Record.fatherBornAt}</em> </li>
          <li><b>{PARAMS.LABELS.fatherBornOn} :  </b><em>{docInfo.Record.fatherBornOn}</em></li>
          <li> <b>{PARAMS.LABELS.fatherResidence} : </b><em>{docInfo.Record.fatherResidence}</em> </li>
          <li> <b>{PARAMS.LABELS.fatherOccupation} : </b><em>{docInfo.Record.fatherOccupation}</em> </li>
          <li>   <b>{PARAMS.LABELS.fatherNationality} : </b><em>{docInfo.Record.fatherNationality}</em> </li>
          <li> <b>{PARAMS.LABELS.fatherDocument} : </b><em>{docInfo.Record.fatherDocument}</em> </li>

          <li><b>{PARAMS.LABELS.motherName} : </b><em>{docInfo.Record.motherName}</em> </li>
          <li> <b>{PARAMS.LABELS.motherBornAt} :  </b><em>{docInfo.Record.motherBornAt}</em></li>
          <li><b>{PARAMS.LABELS.motherBornOn} : </b><em>{docInfo.Record.motherBornOn}</em></li>
          <li><b>{PARAMS.LABELS.motherResidence} : </b><em>{docInfo.Record.motherResidence}</em> </li>
          <li><b>{PARAMS.LABELS.motherOccupation} :  </b><em>{docInfo.Record.motherOccupation}</em></li>
          <li>  <b>{PARAMS.LABELS.motherNationality} : </b><em>{docInfo.Record.motherNationality}</em> </li>
          <li>  <b>{PARAMS.LABELS.motherDocument} : </b><em>{docInfo.Record.motherDocument}</em></li>

          <li><b>{PARAMS.LABELS.declarer} : </b><em>{docInfo.Record.declarer}</em> </li>
          <li><b>{PARAMS.LABELS.registrationDate} : </b><em>{docInfo.Record.registrationDate}</em> </li>
          <li> <b>{PARAMS.LABELS.regitrationCenter} : </b><em>{docInfo.Record.centre}</em> </li>

          <li> <b>{PARAMS.LABELS.officer} : </b><em>{docInfo.Record.officer}</em> </li>
          <li> <b>{PARAMS.LABELS.secretary} : </b><em>{docInfo.Record.secretary}</em> </li>

          {/* <hr />
          <li> <b>{PARAMS.LABELS.status} : </b><em>{docInfo.Record.status}</em> </li>
          <li> <b>{PARAMS.LABELS.observations} : </b><em>{docInfo.Record.observations}</em> </li> */}
        </ul>
      </div>
       
    );
};


ActeDetails.propTypes = {
 // docInfo: PropTypes.shape({}),
 // user: PropTypes.object.isRequired,
  // onLogout: PropTypes.func.isRequired,
};
export default ActeDetails;