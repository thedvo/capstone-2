import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const LoginForm = ({ login }) => {
	const INITIAL_STATE = {
		username: '',
		password: '',
	};

	const [formData, setFormData] = useState(INITIAL_STATE);
	const [formErrors, setFormErrors] = useState([]);
	const history = useHistory();

	console.debug(
		'LoginForm',
		'login=',
		typeof login,
		'formData=',
		formData,
		'formErrors',
		formErrors
	);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((formData) => ({ ...formData, [name]: value }));
	};

	async function handleSubmit(e) {
		e.preventDefault();
		let res = await login(formData);
		if (res.success) {
			history.push('/companies');
		} else {
			setFormErrors(res.errors);
		}
	}

	return (
		<div className="LoginForm">
			<div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4 mt-4">
				<h2 className="mb-3">Log In</h2>
				<div className="card">
					<div className="card-body">
						<form onSubmit={handleSubmit}>
							<div className="mb-3">
								<label className="form-label fw-bold" htmlFor="name">
									Username
								</label>
								<input
									id="username"
									name="username"
									type="text"
									onChange={handleChange}
									value={formData.username}
									className="form-control"
									required
								/>
							</div>
							<div className="mb-3">
								<label className="form-label fw-bold" htmlFor="password">
									Password
								</label>
								<input
									id="password"
									name="password"
									type="text"
									onChange={handleChange}
									value={formData.password}
									className="form-control"
									required
								/>
							</div>
							<button className="btn btn-primary float-end">Submit</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LoginForm;
