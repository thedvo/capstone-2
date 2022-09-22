import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './SignUpForm.css';

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
			history.push('/');
		} else {
			setFormErrors(res.errors);
		}
	}

	return (
		<div className="SignupForm">
			<div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4 mt-4">
				<div className="card">
					<div className="card-body">
						<h2 className="mb-3">
							<img
								className="insta-logo"
								src="https://logos-download.com/wp-content/uploads/2016/03/Instagram_Logo_2016.png"
								alt="instagram-logo"
							></img>
						</h2>

						<h5 className="SignUpForm-lead">
							Sign up to see moments from around the world.
						</h5>
						<form onSubmit={handleSubmit}>
							<div className="mb-3">
								<input
									id="username"
									name="username"
									type="text"
									onChange={handleChange}
									value={formData.username}
									autoComplete="off"
									className="form-control"
									placeholder="Username"
									required
								/>
							</div>
							<div className="mb-3">
								<input
									id="password"
									name="password"
									type="text"
									onChange={handleChange}
									value={formData.password}
									autoComplete="off"
									className="form-control"
									placeholder="Password"
									required
								/>
							</div>
							<div className="mb-3">
								<input
									id="firstName"
									name="firstName"
									type="text"
									onChange={handleChange}
									value={formData.firstName}
									autoComplete="off"
									className="form-control"
									placeholder="First Name"
									required
								/>
							</div>
							<div className="mb-3">
								<input
									id="lastName"
									name="lastName"
									type="text"
									onChange={handleChange}
									value={formData.lastName}
									autoComplete="off"
									className="form-control"
									placeholder="Last Name"
									required
								/>
							</div>
							<div className="mb-3">
								<input
									id="email"
									name="email"
									type="text"
									onChange={handleChange}
									value={formData.email}
									autoComplete="off"
									className="form-control"
									placeholder="Email"
									required
								/>
							</div>
							<button className="btn btn-primary d-grid gap-2 col-6 mx-auto mt-4">
								Sign Up
							</button>

							<div>
								<p className="SignUpForm-rerouteLink">
									Have an account?{' '}
									<Link to={'/login'} style={{ textDecoration: 'none' }}>
										{' '}
										<strong>Login.</strong>
									</Link>
								</p>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SignUpForm;
