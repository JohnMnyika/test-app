import { useState } from 'react';
import axios from 'axios';

function CreateUser({ baseUrl }) {
	const [state, setState] = useState({
		name: "",
		email: "",
		password: "",
	});
	const [error, setError] = useState(null)

	const handleName = (event) => {
		setState(prevState => {
			return {...prevState, name: event.target.value}
		})
	}

	const handleEmail = (event) => {
		setState(prevState => {
			return {...prevState, email: event.target.value}
		})
	}

	const handlePassword = (event) => {
		setState(prevState => {
			return { ...prevState, password: event.target.value}
		})
	}

	const handleSubmit = async event => {
		event.preventDefault();
		
		try {
			const response = await axios({
				method: 'POST',
				url: `${baseUrl}/test/create-user`,
				data: state,
			});

			// switch to login form
		} catch(e) {
			if (e.response.status === 409) {
				setError(e.response.data.error);
			}
		}
	}

	const { name, email, password } = state;
	return (
		<form className="signUpForm" onSubmit={handleSubmit}>
			<div style={{color: 'red'}}>{error}</div>
			<h2>Sign Up</h2>
			<div className="inputField">
				<label htmlFor="name">Name</label>
				<input type="text" id="name" onChange={handleName} value={name} required />
			</div>
			<div className="inputField">
				<label htmlFor="email">Email</label>
				<input type="email" id="email" onChange={handleEmail} value={email} required/>
			</div>
			<div className="inputField">
				<label htmlFor="password">Password</label>
				<input type="password" id="password" required onChange={handlePassword} value={password} />
			</div>
			<button className="submit-btn">Submit</button>
		</form>
	)
}

export default CreateUser;