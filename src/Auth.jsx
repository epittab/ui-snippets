import {  useNavigate } from "react-router-dom";
import { useFetchToken } from './auth/useFetchToken';
import { useContext, useEffect } from "react";
import  {AuthContext}  from "./context/AuthContext";


function Auth() {
   const navigate =useNavigate();
   let { setToken} = useContext(AuthContext);

   let accessToken = useFetchToken();
   let storedToken = localStorage.getItem("token");

   useEffect(()=>{
   if (accessToken !== null && storedToken !== null) {
         setToken(accessToken);
         console.log("Redirecting...")
         navigate("/");
      }
   }, [navigate, setToken, accessToken, storedToken])
  
   return <div>Auth</div>;
}

export default Auth;