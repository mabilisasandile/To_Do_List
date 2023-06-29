
import React from "react";
import '../App.css';
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

const Display = () => {

    const navigate = useNavigate()

    const [dataArray, setDataArray] = useState([]);

    useEffect(() => {
        // Retrieve the array data from local storage
        const localStorageData = localStorage.getItem('tasks');
        if (localStorageData) {
            setDataArray(JSON.parse(localStorageData));
        }
    }, []);

    const handleDeleteTask = (index) => {
        // Remove the desired element from the array
        const updatedArray = [...dataArray];
        updatedArray.splice(index, 1);
    
        // Store the updated array back into local storage
        localStorage.setItem('tasks', JSON.stringify(updatedArray));
    
        setDataArray(updatedArray);
    };

    //return to home page function
	const handleHomePage = () => {
		navigate('/home')
		window.location.reload()
	};

    return (
        <div>
            <h2>Data Table</h2>
            <p className='return-home-p' onClick={handleHomePage}> Return Home</p>
            <table className="display-table">
                <thead>
                    <tr>
                        <th>Task ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Priority</th>
                    </tr>
                </thead>
                <tbody>
                    {dataArray.map((item,index) => (
                        <tr key={index}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td >{item.description}</td>
                            <td>{item.priority}</td>
                            <button className="btn-delete" onClick={() => handleDeleteTask(index)}>delete</button>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

}
export default Display;