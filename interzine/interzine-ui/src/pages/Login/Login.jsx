import React, {useState} from 'react'
import axios from 'axios'
import apiClient from "../../services/apiClient"
import jwtDecode from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import './Login.css'


function Login({login, client, setClient}) {
    const [formInput, setFormInput] = useState({})
    const navigate= useNavigate()

    function handleFormInput(e) {
        const name= e.target.name
        const value= e.target.value
        setFormInput({...formInput, [name]: value})
    }

    async function handleLogin(e) {
        e.preventDefault()

        try {
            let response
            let menu
            let services

            if (client==='user'){
             response= await apiClient.loginUser(formInput)
             services= await apiClient.fetchServicesByZip()
            } else if (client==='provider'){
              response= await apiClient.loginProvider(formInput)
              // response.data.provider.id
              menu= await apiClient.fetchMenuItems(response.data.provider.id)
            }

            const data = response.data;
            
            if (response.status === 200) {
              const { token } = data;
              localStorage.setItem("interzine_token", token);
              apiClient.setToken(token)
              const decodedToken = jwtDecode(token); //a way to get username from token
              if (client==='user'){
                login((prev) => ({...prev, user: decodedToken, isAuthenticated: true, services: services?.data?.providers}))
              navigate('/shop')

               } else if (client==='provider'){
                if (menu){
                  login((prev) => ({...prev, provider: decodedToken, isAuthenticated: true, menuItems: menu?.data?.menuItems}))
                }else{
                  login((prev) => ({...prev, provider: decodedToken, isAuthenticated: true, menuItems: []}))
                  }
              navigate('/store')

               }

               apiClient.setToken(token)
              
            } else {
            //   //Login failed
            //   setLoginError(data.message);
            }
          } catch (error) {
            console.error("Error:", error);
          }
        // const user= 
        // login({...appState, user: user})
    }

    function changeClient(client){
      if (client==='user'){
        setClient('provider')
      } else if (client==='provider'){
        setClient('user')
      }
    }

    let optionMessage
    if (client==='user'){
      optionMessage= 'Log in as Ziner'
    } else if (client==='provider'){
      optionMessage= 'Log in to order'
    }

    //set appstate from here
    return (
        <div className='login'>
            <form>
            <input onChange= {(e) => handleFormInput(e)} name='email' placeholder='email' required/>
            <input onChange= {(e) => handleFormInput(e)} name='password' placeholder='password' required/>
            <button onClick={async (e) => await handleLogin(e)} > Log in </button>
            </form> 
            <p onClick={() => changeClient(client)}> {optionMessage} </p>

        </div>
    )
}

export default Login
