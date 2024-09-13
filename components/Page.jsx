//import React from 'react'
import UserProfile from './UserProfile';
//import Navbar from './Navbar';
import AppRoutes from './AppRoutes';

function Page() {
  console.log(AppRoutes.username);
  return (
    <div className="container py-5 bg-secondary-subtle rounded-3">Welcome  to Home 
    
    <div>Afficher les infos de son profil</div>
    
    <UserProfile  />
    <div>
       <button>Block-Registry</button>
    </div>
    <div>
    <button>Modifier mon profil</button>
    </div>
    <div>
       <button>se deconnecter</button>
    </div>
    
   
    </div>
  )
}

export default Page