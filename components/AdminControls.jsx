//import React from 'react';
import { FaUserCog } from 'react-icons/fa';

const AdminControls = ()=>{
    const handleAdmin = () => {
        window.location.href = "/user-list"
    };

    return(
        
        <button className="buttonx m-2" onClick={handleAdmin}>
        <div className="icon"><FaUserCog /></div>
        <span>Utilisateurs</span>
      </button>

                
       
    );
};

export default AdminControls;