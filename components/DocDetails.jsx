//import React from 'react';
// import { FaUserCog } from 'react-icons/fa';
import PARAMS from './constants';
const DocDetails = ({docInfo}) => {
  
    return(
        
        <div>
        <ul>
          <li><b>{PARAMS.LABELS.childSurname} : </b><em>{docInfo.surname}</em> </li>
          <li><b>{PARAMS.LABELS.childGivenName} : </b><em>{docInfo.givenName}</em> </li>

          <li><b>{PARAMS.LABELS.childDateBirth} :  </b><em>{docInfo.dateBirth}</em></li>
          <li> <b>{PARAMS.LABELS.childPlaceBirth} :  </b><em>{docInfo.placeBirth}</em></li>
          <li> <b>{PARAMS.LABELS.childSex} :  </b><em>{docInfo.gender}</em></li>

          <li> <b>{PARAMS.LABELS.fatherName} : </b><em>{docInfo.fatherName}</em> </li>
          <li> <b>{PARAMS.LABELS.fatherBornAt} : </b><em>{docInfo.fatherBornAt}</em> </li>
          <li><b>{PARAMS.LABELS.fatherBornOn} :  </b><em>{docInfo.fatherBornOn}</em></li>
          <li> <b>{PARAMS.LABELS.fatherResidence} : </b><em>{docInfo.fatherResidence}</em> </li>
          <li> <b>{PARAMS.LABELS.fatherOccupation} : </b><em>{docInfo.fatherOccupation}</em> </li>
          <li>   <b>{PARAMS.LABELS.fatherNationality} : </b><em>{docInfo.fatherNationality}</em> </li>
          <li> <b>{PARAMS.LABELS.fatherDocument} : </b><em>{docInfo.fatherDocument}</em> </li>

          <li><b>{PARAMS.LABELS.motherName} : </b><em>{docInfo.motherName}</em> </li>
          <li> <b>{PARAMS.LABELS.motherBornAt} :  </b><em>{docInfo.motherBornAt}</em></li>
          <li><b>{PARAMS.LABELS.motherBornOn} : </b><em>{docInfo.motherBornOn}</em></li>
          <li><b>{PARAMS.LABELS.motherResidence} : </b><em>{docInfo.motherResidence}</em> </li>
          <li><b>{PARAMS.LABELS.motherOccupation} :  </b><em>{docInfo.motherOccupation}</em></li>
          <li>  <b>{PARAMS.LABELS.motherNationality} : </b><em>{docInfo.motherNationality}</em> </li>
          <li>  <b>{PARAMS.LABELS.motherDocument} : </b><em>{docInfo.motherDocument}</em></li>

          <li><b>{PARAMS.LABELS.declarer} : </b><em>{docInfo.declarer}</em> </li>
          <li><b>{PARAMS.LABELS.registrationDate} </b><em>{docInfo.registrationDate}</em> </li>
          <li> <b>{PARAMS.LABELS.regitrationCenter} </b><em>{docInfo.centre}</em> </li>

          <li> <b>{PARAMS.LABELS.officer} </b><em>{docInfo.officer}</em> </li>
          <li> <b>{PARAMS.LABELS.secretary} </b><em>{docInfo.secretary}</em> </li>
          <hr />
          <li> <b>{PARAMS.LABELS.status} </b><em>{docInfo.status}</em> </li>
          <li> <b>{PARAMS.LABELS.observations} </b><em>{docInfo.observations}</em> </li>
        </ul>
      </div>
       
    );
};

export default DocDetails;