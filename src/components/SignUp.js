
import React from 'react';
import '../App.css';
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const navigate = useNavigate();
    //Retrieve data from local storage
    const getUserValues = () => {
        const storedValues = localStorage.getItem('users');
        if (storedValues) {
            return JSON.parse(storedValues);
        }
        else {
            return []
        }
    }

    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleUserSignUp = (event) => {
        event.preventDefault();

        //Declare an array to store the list of tasks
		var users=JSON.parse(localStorage.getItem('users') || "[]")

        const user = {
            name:name,
            surname:surname,
            email:email,
            password:password
        }

        //Push the new user data into an array "users"
        users.push(user)

        //Store the new user data into local storage
        localStorage.setItem('users', JSON.stringify(users));

        alert("Successfully signed up");
        navigate('/login')
    }

    return (
        <div className="container">
            <h1>Sign Up</h1>
            <form className="signup-form">
                <br></br>
                <input type="text" placeholder="Enter name" onChange={(e) => setName(e.target.value)}></input><br></br>
                <br></br>
                <input type="text" placeholder="Enter surname" onChange={(e) => setSurname(e.target.value)}></input><br></br>
                <br></br>
                <input type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)}></input><br></br>
                <br></br>
                <input type="password" placeholder="Enter password" onChange={(e) => setPassword(e.target.value)}></input><br></br>
                <br></br>
                <button type="submit" onClick={handleUserSignUp}> Sign Up </button>
            </form>

        </div>
    );

}

export default SignUp;