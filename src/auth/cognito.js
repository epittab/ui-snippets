import {CognitoJwtVerifier} from 'aws-jwt-verify';

const randomSuffix = "j27jy"
const base_url = `https://example-domain-${randomSuffix}.auth.us-east-1.amazoncognito.com/oauth2/`;
export const client_id = "5li8b7hsf9n8763enldpcmf7ng";
export const redirect_uri = "http://localhost:5173/auth/token";
const pool_id = "us-east-1_hj9JlhnEi";

export const getAuthorizeUrl = (challenge = "") => {
    const login_url = `${base_url}authorize?response_type=code&client_id=${client_id}&redirect_uri=${redirect_uri}`
    const PKCE = `&code_challenge=${challenge}&code_challenge_method=S256`;
    const cognitoHostedUI = new URL(login_url+PKCE);
    return cognitoHostedUI
}

export const getTokenUrl = () => {
    return `${base_url}token`;
}

export const jwtVerifier = CognitoJwtVerifier.create({
    userPoolId: pool_id,
    tokenUse: "access",
    clientId: client_id,
  });