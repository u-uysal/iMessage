import React from 'react'
import "./Login.css"
import { auth, provider } from "../firebase"




function Login() {
    const signIn = () => {

        auth.signInWithPopup(provider).catch((error) => alert(error.message))


    }
    return (
        <div className="login">
            <button onClick={signIn}>Sign In</button>
        </div>

    )
}

export default Login
