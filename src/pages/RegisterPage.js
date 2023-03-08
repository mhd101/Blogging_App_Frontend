import { useState } from "react"
import { Navigate } from 'react-router-dom'

export const RegisterPage = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [redirect, setRedirect] = useState(false)

    const signup = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:4000/register', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'content-type': 'application/json' },
        })

        if (response.status === 200) {
            alert("Registration Successfull")
            setRedirect(true)

        } else {
            alert('Registration Failed!!')
        }
    }

    if (redirect) {
        return <Navigate to={'/login'} />
    }

    return (

        <div className="register-container">
            
            <form className="register-div" onSubmit={signup}>
            
                <h1 className="register-heading">Create a new account</h1>
                <input type='text'
                    placeholder="Enter Username"
                    value={username}
                    onChange={e => setUsername(e.target.value)} />
                <input type='password'
                    placeholder="Enter Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)} />
                <button className="register-btn">Signup</button>
            </form>
        </div>

    )
}

export default RegisterPage