import React from 'react';
import '../App.css';
import { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation, Navigate } from 'react-router-dom'
// import Navigation from "./Navigation";

const getUserValues = () => {
    const storedValues = localStorage.getItem('users');
    if (storedValues) {
        return JSON.parse(storedValues);
    }
    else {
        return []
    }
}

const Login = () => {

    const navigate = useNavigate()
    const location = useLocation()
    const routeToRegister = () => {
        navigate('/signup')
    }
    const routeToHome = () => {
        navigate('/home')
    }

    const [users, setUsers] = useState(getUserValues())
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    }
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    useEffect(() => {
        // Retrieve users data from local storage
        const storedUsers = localStorage.getItem('users');
        if (storedUsers) {
          setUsers(JSON.parse(storedUsers));
        }
      }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate the form inputs
        if (username.trim() === '' || password.trim() === '') {
            setError('Please fill in all fields');
            return;
        }

        // Perform login action
        const users = JSON.parse(localStorage.getItem('users')) || [];
        console.log(username);
        console.log(password);
        let user = users.find(user => username === user.email && password === user.password)
        // let user = users.filter(user=>{
        //     return(
        //         user.email === username
        //     )
        // })
        console.log(user);
        if (user) {
            routeToHome();
        } else {
            setError('Invalid username or password');
        }

        setUsername('');
        setPassword('');
    };

    return (
        <div className='container'>
            <form onSubmit={handleSubmit} className="login-form">
                <h2>Login here</h2>
                {error && <p className="error">{error}</p>}
                <div>
                    <br></br>
                    <input
                        type="text"
                        placeholder='Username'
                        id="username"
                        value={username}
                        onChange={(e) => handleUsernameChange(e)}
                    />
                </div>
                <div>
                    <br></br>
                    <input
                        type="password"
                        placeholder='Password'
                        id="password"
                        value={password}
                        onChange={(e) => handlePasswordChange(e)}
                    />
                </div>
                <br></br>
                <button type="submit">Login</button>
                <p>Do not have an account? Then click the button below!</p>
                <button className='go-to-signup' onClick={routeToRegister}>Register here</button>
            </form>
        </div>
    );
}

export default Login;