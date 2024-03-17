import { useState, useEffect, useContext } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { generatePKCE } from './auth/pkce'
import { getAuthorizeUrl } from './auth/cognito'
import { AuthContext } from './context/AuthContext'
import { jwtVerifier } from './auth/cognito'

function App() {
  const {token, setToken} = useContext(AuthContext);
  const [count, setCount] = useState(0)
  
  const isTrue = (value) => (value !== null && value !== undefined && value !== "");

  const check = async (storedToken) => {
    try {
      await jwtVerifier.verify(storedToken);
      console.log("Token is valid.");
      setToken(storedToken);
    } catch {
      console.log("Token not valid!");
    }   
  }

  if (!isTrue(token)) {
    console.log("No State Token")
    console.log("Checking for existing Stored token")
    let storedToken = localStorage.getItem("token")
    if (isTrue(storedToken)) {
      console.log("Validating Stored Token...")
      check(storedToken);
    }
  }

  const logout = () => {
    console.log("Cleared")
    localStorage.removeItem("token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("logged");
  }

  console.log("Context Token: ", token);

  useEffect( ()=>{
    let storedToken = localStorage.getItem("token")
    let logged = localStorage.getItem("logged")
    if (!isTrue(storedToken) && !isTrue(logged)) {
      console.log("getting new token")
    generatePKCE().then(
      challenge => {
          window.location.replace(getAuthorizeUrl(challenge));
        } )
      }
    }, []);
  
  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <div onClick={()=> {
        logout();
      }}>
        Log out
      </div>
    </>
  )
}

export default App
