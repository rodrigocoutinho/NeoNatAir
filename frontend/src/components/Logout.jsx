import React, { useEffect } from "react";
import api from "../services/api";

//Componente para logout
const Logout = () => {

    
        console.log(localStorage.getItem("token"));
        //localStorage.clear();
        localStorage.removeItem('token');
        //sessionStorage.removeItem("token");

        setTimeout(() => {
            window.location.href = "/";
        }, 100);

    return (
    <>
    Saindo...
    </>
    );
}

export default Logout;