
import React from 'react';
import '../App.css';
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

const Update = () => {

	const navigate = useNavigate();
	let tempData = [];

	const [searcheData, setSearcheData] = useState({
		description: '',
		id: '',
		name: '',
		priority: ''
	})

	const [taskName, setTaskName] = useState('');
	const [description, setDescription] = useState('');
	const [priority, setPriority] = useState('');
	const [task_id, setTaskID] = useState('');
	const [dataArray, setDataArray] = useState([]);

	//Search saved tasks
	const Search = () => {
		const [searchTerm, setSearchTerm] = useState('');

		const handleInputTerm = (event) => {
			setSearchTerm(event.target.value);
		};

		const handleSearch = () => {
			const data = JSON.parse(localStorage.getItem('tasks'));

			tempData = data.filter(index => {
				return index.name === searchTerm;
			})

			if (tempData.length === 0) {
				// Handle no matching data found exception
				console.log('No matching data found.');
				alert('No matching data found, re-enter task name...');
			} else {
				console.log('Searched task:', tempData);
				setSearcheData({
					description: tempData[0].description,
					id: tempData[0].id,
					name: tempData[0].name,
					priority: tempData[0].priority
				})

				setTaskName(tempData[0].name);
				setDescription(tempData[0].description);
				setPriority(tempData[0].priority);
				setTaskID(tempData[0].id);
			}
		}

		return (
			<div>
				<table>
					<tr>
						<td>
							<input
								className='search-input'
								type="text"
								placeholder="Search task to edit..."
								value={searchTerm}
								onChange={handleInputTerm}
							/>
							<button className='Btn-search' onClick={handleSearch} >
								Search
							</button>
						</td>
					</tr>
				</table>
			</div>
		);
	};

	useEffect(() => {
		// Retrieve existing array data from local storage
		const storedData = JSON.parse(localStorage.getItem('tasks')) || [];
		setDataArray(storedData);
	}, []);

	//Update 
	const handleInputChange = (index) => {

		// Modify the desired element in the array
		const updatedArray = dataArray.map(element => {
			if (element.id === task_id) {
				return { ...element, name: taskName, description: description, priority: priority }

			}
			return element
		})

		// Store the updated array back into local storage
		localStorage.setItem('tasks', JSON.stringify(updatedArray));

		setDataArray(updatedArray);
	};

	//return to home page function
	const handleHomePage = () => {
		navigate('/home')
		window.location.reload()
	};

	//Logout function
	const HandleLogout = () => {
		navigate('/login')
		window.location.reload()
	};

	return (
		<div className="container">
			<p className='return-home-p' onClick={handleHomePage}> Return Home</p>
			<h1>Update</h1>
			<h2>TO-DO-LIST</h2>
			<Search />
			<form className='task-form'>
				<br></br>
				<input
					type="text"
					value={taskName}
					placeholder={searcheData.name || "Task name"}
					onChange={(e) => setTaskName(e.target.value)}
				/>
				<br></br>
				<br></br>
				<input
					type="text"
					value={description}
					placeholder={searcheData.description || "Task description"}
					onChange={(e) => setDescription(e.target.value)}
				/>
				<br></br>
				<br></br>
				<input
					type="text"
					value={task_id}
					placeholder={searcheData.id || "Task ID"}
					onChange={(e) => setTaskID(e.target.value)}
				/>
				<br></br>
				<br></br>
				<input
					type="text"
					value={priority}
					placeholder={searcheData.priority || "Task Priority"}
					onChange={(e) => setPriority(e.target.value)}
				/>
				<br></br>
				<br></br>
				<button type="submit" onClick={handleInputChange}>Update Task</button>
				<br></br>
				<br></br>
				<button onClick={HandleLogout} className="logout">Log Out</button> <br />
			</form>
		</div>
	);

}
export default Update;