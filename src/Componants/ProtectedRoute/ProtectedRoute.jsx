import React from 'react'
import { useNavigate } from 'react-router-dom';
import Login from '../Login/Login'


function ProtectedRoute({userData,saveUserData,children}) {
  let navigate = useNavigate();
    if(userData !==null){
        return children ;
    }
    else{
      navigate('/login') ;
        return <Login saveUserData={saveUserData}/>
    }

  
}

export default ProtectedRoute