import React from 'react';
import '../App.css';
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

function Home() {

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
	const [dataArray, setDataArray] = useState([]);

	useEffect(() => {
		// Retrieve the array data from local storage
		const storedData = JSON.parse(localStorage.getItem('tasks')) || [];
		setDataArray(storedData);
	}, []);

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
								placeholder="Search a task..."
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

	//Declare the checkboxes
	const [checkboxes, setCheckboxes] = useState({
		checkbox1: false,
		checkbox2: false,
		checkbox3: false,
	});

	//Checkbox function
	const handleCheckboxChange = (e) => {
		const newPriority = e.target.value;
		const { name, checked } = e.target;
		setCheckboxes((prevCheckboxes) => ({
			...prevCheckboxes,
			[name]: checked,
		}));
		setPriority(newPriority);
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		//Declare an array to store the list of tasks
		const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');

		const tasksArray = Array.isArray(storedTasks) ? storedTasks : [];

		const newTask = {
			id: new Date().getTime(),
			name: taskName,
			description: description,
			priority: priority
		};


		//Push the new task into the array
		tasksArray.push(newTask);

		//Store the new task into local storage
		localStorage.setItem('tasks', JSON.stringify(tasksArray));

		console.log("New task: ", newTask.name);

		alert("Successfully added the task");

		// Refresh the page to reflect the updated data
		window.location.reload();

	};

	//Logout function
	const handleLogout = () => {
		navigate('/login');
		window.location.reload();
	}

	//Display saved tasks
	const handleDisplay = () => {
		navigate('/display');
		window.location.reload();
	}

	//Update a task
	const HandleEdit = () => {
		navigate('/update');
	}


	//Delete all local storage data
	const handleDeleteAllTasks = () => {
		// Clear array data in React component state
		setDataArray([]);

		// Remove array data from local storage
		localStorage.removeItem('tasks');
		window.location.reload();
	}

	return (
		<div className="container">
			<h1>Home Page</h1>
			<h2>TO-DO-LIST</h2>
			<Search />
			<p>Add a new task</p>
			<form className='task-form'>
				<br></br>
				<input
					type="text"
					// placeholder= "Enter task name"
					placeholder={searcheData.name === '' ? "Enter task name" : searcheData.name}
					value={taskName}
					onChange={(e) => setTaskName(e.target.value)}
				/>
				<br></br>
				<br></br>
				<input
					type="text"
					placeholder={searcheData.description === '' ? "Enter task description" : searcheData.description}
					value={description}
					onChange={(e) => setDescription(e.target.value)}
				/>
				<div>
					<h2>Select Priority:</h2>
					<label>
						<input
							type="checkbox"
							name="checkbox1"
							checked={checkboxes.checkbox1}
							onChange={handleCheckboxChange}
							value={"Low"}
							className='low-priority'
						/>
						Low
					</label>
					<label>
						<input
							type="checkbox"
							name="checkbox2"
							checked={checkboxes.checkbox2}
							onChange={handleCheckboxChange}
							value={"Medium"}
							className='medium-priority'

						/>
						Medium
					</label>
					<label>
						<input
							type="checkbox"
							name="checkbox3"
							checked={checkboxes.checkbox3}
							onChange={handleCheckboxChange}
							value={"High"}
							className='high-priority'
						/>
						High
					</label>
				</div>
				<br></br>
				<button type="submit" onClick={handleSubmit}>Add Task</button>
				<br></br>
				<br></br>
				<button onClick={handleDisplay} className="btn-display-tasks">Display Tasks</button>
				<br></br>
				<br></br>
				<button onClick={HandleEdit} className="btn-display-tasks">Edit a task</button>
				<br></br>
				<br></br>
				<button onClick={handleDeleteAllTasks} className="delete">Delete Tasks</button>
				<br></br>
				<br></br>
				<button onClick={handleLogout} className="logout">Log Out</button> <br />
			</form>
		</div>
	);

}
export default Home;