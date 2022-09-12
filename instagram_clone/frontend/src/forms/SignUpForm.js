import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const SignUpForm = ({ signup }) => {
	const INITIAL_STATE = {
		username: '',
		password: '',
		firstName: '',
		lastName: '',
		email: '',
	};

	const [formData, setFormData] = useState(INITIAL_STATE);
	const [formErrors, setFormErrors] = useState([]);
	const history = useHistory();

	console.debug(
		'SignupForm',
		'signup=',
		typeof signup,
		'formData=',
		formData,
		'formErrors=',
		formErrors
	);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((formData) => ({ ...formData, [name]: value }));
	};

	async function handleSubmit(e) {
		e.preventDefault();
		let res = await signup(formData);
		if (res.success) {
			history.push('/companies');
		} else {
			setFormErrors(res.errors);
		}
	}

	return (
		<div className="SignupForm">
			<div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4 mt-4">
				<h2 className="mb-3">Sign Up</h2>
				<div className="card">
					<div className="card-body">
						<form onSubmit={handleSubmit}>
							<div className="mb-3">
								<label className="form-label fw-bold" htmlFor="username">
									Username
								</label>
								<input
									id="username"
									name="username"
									type="text"
									onChange={handleChange}
									value={formData.username}
									autoComplete="off"
									className="form-control"
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
									autoComplete="off"
									className="form-control"
								/>
							</div>
							<div className="mb-3">
								<label className="form-label fw-bold" htmlFor="firstName">
									First Name
								</label>
								<input
									id="firstName"
									name="firstName"
									type="text"
									onChange={handleChange}
									value={formData.firstName}
									autoComplete="off"
									className="form-control"
								/>
							</div>
							<div className="mb-3">
								<label className="form-label fw-bold" htmlFor="lastName">
									Last Name
								</label>
								<input
									id="lastName"
									name="lastName"
									type="text"
									onChange={handleChange}
									value={formData.lastName}
									autoComplete="off"
									className="form-control"
								/>
							</div>
							<div className="mb-3">
								<label className="form-label fw-bold" htmlFor="email">
									Email
								</label>
								<input
									id="email"
									name="email"
									type="text"
									onChange={handleChange}
									value={formData.email}
									autoComplete="off"
									className="form-control"
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

export default SignUpForm;
