import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { IState } from "../Interfaces";

interface AuthmiddlewareProps {
  children?: React.ReactNode;
  
}

  const Authmiddleware: React.FC<AuthmiddlewareProps> = (props) => {

    const {status} = useSelector((state:IState) => state.auth);
    if (status !== 'authenticated') {
      
      return <Navigate to="/login" /> ;
    }
    return props.children;
  };

  export default Authmiddleware;

