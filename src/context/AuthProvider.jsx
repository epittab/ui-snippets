import {useState} from "react"
import PropTypes from 'prop-types';
import {AuthContext}  from "./AuthContext";


export const AuthProvider = (props) => {
  const [token, setToken] = useState();
  const [code, setCode] = useState();
  const [logged, setLogged] = useState();

  return <AuthContext.Provider value={{
    token, setToken,
    code, setCode,
    logged, setLogged
  }}> {props.children} </AuthContext.Provider>
}

AuthProvider.propTypes = {
  children: PropTypes.object
}