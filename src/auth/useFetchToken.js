import { useState, useEffect } from 'react'

import { client_id, getTokenUrl, redirect_uri } from './cognito';
import { useLocation } from "react-router-dom";

import axios from "axios";

export function useFetchToken(){

    const getQueryString = (qs = "") => {
        if (!qs.includes("?")) return null;
        let params = new URLSearchParams(qs);
        return params.get("code");
    }

    const [accessToken, setAccessToken] = useState("")
    const qs = useLocation();

    useEffect(() => {

        const mycode = getQueryString(qs.search);
        const challenge = sessionStorage.getItem("verifier")
        
        if (mycode !== null && localStorage.getItem("token") ===  null && challenge !== null) {
           const params = new URLSearchParams();
           params.append('grant_type', 'authorization_code');
           params.append('code', mycode);
           params.append('code_verifier', challenge);
           params.append('client_id', client_id)
           params.append('redirect_uri', redirect_uri)
  
           const options = {
              method: 'POST',
              url: getTokenUrl(),
              headers: {'content-type': 'application/x-www-form-urlencoded'},
              data: params
           };
           axios.request(options)
            .then((res) => {
              console.log(res.data)
              setAccessToken(res.data.access_token);
              localStorage.setItem("token", res.data.access_token);
              localStorage.setItem("refresh_token", res.data.refresh_token);
              localStorage.setItem("logged", true);
            })
            .catch(err => {
              console.log("Error fetching token: ", err)
           })
        }
        }, [qs.search])

    return accessToken;
}

