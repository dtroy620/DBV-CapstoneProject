import React from 'react'
import './Navbar.css'
import { useNavigate } from 'react-router-dom'

function Navbar() {
    const navigate= useNavigate()

    function routeToLogin() {
        navigate('/login')
    }

    function routeToLogout() {
        navigate('/')
    }

    function routeToRegister() {
        navigate('/register')
    }

    return (
        <nav>
            <div className='logo-and-location'>
                <h2> InterZine </h2>
                
                <form>
                    <input placeholder='Zip Code'/>
                </form>
            </div>

            <div className='access-buttons'>
                <button onClick={routeToLogin} > Log in </button>
                <button onClick={routeToRegister}> Sign up </button>
            </div>
            

        </nav>
    )
}

export default Navbar
