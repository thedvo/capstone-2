import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './LoginForm.css';

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
			history.push('/');
		} else {
			setFormErrors(res.errors);
		}
	}

	return (
		<div className="LoginForm">
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
						<form onSubmit={handleSubmit} autoComplete="off">
							<div className="mb-3">
								<input
									id="username"
									name="username"
									type="text"
									onChange={handleChange}
									value={formData.username}
									className="form-control"
									placeholder="Username"
									required
								/>
							</div>
							<div className="mb-3">
								<input
									id="password"
									name="password"
									type="password"
									onChange={handleChange}
									value={formData.password}
									className="form-control"
									placeholder="Password"
									required
								/>
							</div>
							<button className="btn btn-primary d-grid gap-2 col-6 mx-auto mt-4 ">
								Log In
							</button>
							<div>
								<p className="LoginForm-rerouteLink">
									Don't have an account?{' '}
									<Link to={'/signup'} style={{ textDecoration: 'none' }}>
										{' '}
										<strong>Sign up.</strong>
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

export default LoginForm;
