import { useState, useEffect } from 'react'

import { client_id, getTokenUrl } from './cognito';

import axios from "axios";

export function useRefreshToken(){

    const [accessToken, setAccessToken] = useState("");

    useEffect(() => {

        let old_refresh = localStorage.getItem("refresh_token");
        let old_token = localStorage.getItem("token");
        
        if (old_refresh !== null && old_token ===  null) {
           const params = new URLSearchParams();
           params.append('grant_type', 'refresh_token');
           params.append('client_id', client_id);
           params.append('refresh_token', old_refresh);
  
           const options = {
              method: 'POST',
              url: getTokenUrl(),
              headers: {'content-type': 'application/x-www-form-urlencoded'},
              data: params
           };
           axios.request(options)
            .then((res) => {
              console.log("Refreshed!")
                setAccessToken(res.data.access_token);

              localStorage.setItem("token", res.data.access_token);
              localStorage.setItem("refresh_token", res.data.refresh_token);

              localStorage.setItem("logged", true);
            })
            .catch(err => {
              console.log("Error fetching refresh token: ", err)
           })
        }
        }, [])

    return accessToken;
}

