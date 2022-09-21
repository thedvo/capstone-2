import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';

import UserContext from '../UserContext';
import igCloneApi from '../Api';
import 'bootstrap/dist/css/bootstrap.min.css';

/**  
 Form to Edit Profile for a logged in user.

 	- Displays a form with inputs to change details of a user's profile (password, firstName, lastName, email, profileImage, bio). 
 
 	- Includes a password input to confirm changes. 

*/
const UserEditForm = () => {
	const { currentUser, setCurrentUser } = useContext(UserContext);
	// import currentUser so that we can use the logged in user's info as the default placeholders for the form.
	// import setCurrentUser to update currentUser once the form is submitted

	const history = useHistory();
	const INITIAL_STATE = {
		username: currentUser.username,
		first_name: currentUser.firstName,
		last_name: currentUser.lastName,
		email: currentUser.email,
		profile_image: currentUser.profileImage,
		bio: currentUser.bio,
		password: '',
		// leave password empty because the user will enter it themselves to confirm changes at submission
	};

	const [formData, setFormData] = useState(INITIAL_STATE);
	const [formErrors, setFormErrors] = useState([]);

	console.debug(
		'ProfileForm',
		'currentUser=',
		currentUser,
		'formData=',
		formData,
		'formErrors=',
		formErrors
	);

	function handleChange(e) {
		const { name, value } = e.target;

		setFormData((formData) => ({
			...formData,
			[name]: value,
		}));
		setFormErrors([]);
		// empties formErrors since use is making new input
	}

	async function handleSubmit(e) {
		e.preventDefault();

		// create separate variables for profile form data and username so that we can pass it to the API request (saveProfile)
		let profileData = {
			first_name: formData.first_name,
			last_name: formData.last_name,
			email: formData.email,
			profile_image: formData.profile_image,
			bio: formData.bio,
			password: formData.password,
		};

		let username = formData.username;
		let updatedUser;

		try {
			updatedUser = await igCloneApi.saveProfile(username, profileData);
		} catch (err) {
			setFormErrors(err);
			console.log('action failed. try again!');
			return;
		}

		// sets formData to the new updated user information
		// sets formErrors to empty array to reset
		// set currentUser to be the updated user
		setFormData((formData) => ({ ...formData, password: '' }));
		setFormErrors([]);
		setCurrentUser(updatedUser);
		history.push('/profile'); //redirect to user profile once edits are complete
		console.log('SUCCESS!', updatedUser);
	}

	return (
		<div className="col-mb-6 col-lg-4 offset-md-3 offset-lg-4 mt-4">
			<h2>Profile</h2>

			<div className="card">
				<div className="card-body">
					<form onSubmit={handleSubmit} autoComplete="off">
						<div className="mb-3">
							<label className="form-label fw-bold">Username</label>
							<p className="form-control-plaintext">@{formData.username}</p>
						</div>
						<div className="mb-3">
							<label className="form-label fw-bold" htmlFor="first_name">
								First Name
							</label>
							<input
								name="first_name"
								type="text"
								value={formData.first_name}
								onChange={handleChange}
								className="form-control"
							/>
						</div>
						<div className="mb-3">
							<label className="form-label fw-bold" htmlFor="last_name">
								Last Name
							</label>
							<input
								name="last_name"
								type="text"
								value={formData.last_name}
								onChange={handleChange}
								className="form-control"
							/>
						</div>
						<div className="mb-3">
							<label className="form-label fw-bold" htmlFor="email">
								Email
							</label>
							<input
								name="email"
								type="text"
								value={formData.email}
								onChange={handleChange}
								className="form-control"
							/>
						</div>
						<div className="mb-3">
							<label className="form-label fw-bold" htmlFor="profile_image">
								Profile Image
							</label>
							<input
								name="profile_image"
								type="text"
								value={formData.profile_image}
								onChange={handleChange}
								className="form-control"
							/>
						</div>
						<div className="mb-3">
							<label className="form-label fw-bold" htmlFor="bio">
								Bio
							</label>
							<textarea
								name="bio"
								type="text"
								value={formData.bio}
								onChange={handleChange}
								className="form-control"
								rows="2"
							></textarea>
						</div>
						<div className="mb-1">
							<label className="form-label fw-bold" htmlFor="password">
								Confirm password to make changes:{' '}
							</label>
							<input
								name="password"
								type="password"
								value={formData.password}
								onChange={handleChange}
								className="form-control"
								required
							/>
						</div>
						<div className="d-grid gap-2">
							<button className="btn btn-primary mt-4">Save Changes</button>
						</div>
					</form>
				</div>
			</div>
			<div>
				<Link to={'/profile'}>
					<button className="btn btn-light mt-4">Back to Profile</button>
				</Link>
			</div>
		</div>
	);
};

export default UserEditForm;
