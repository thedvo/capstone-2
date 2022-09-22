import React, { useState, useContext } from 'react';
import UserContext from '../UserContext';
import { useHistory } from 'react-router';
import igCloneApi from '../Api';

const PostForm = () => {
	const { currentUser } = useContext(UserContext);

	const INITIAL_STATE = {
		image_file: '',
		caption: '',
	};

	const [formData, setFormData] = useState(INITIAL_STATE);
	const [formErrors, setFormErrors] = useState([]);
	const history = useHistory();

	console.debug('PostForm', 'formData=', formData, 'formErrors=', formErrors);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((formData) => ({ ...formData, [name]: value }));
	};

	async function handleSubmit(e) {
		e.preventDefault();
		let res = await igCloneApi.createPost(currentUser.username, formData);

		history.push('/posts');
		setFormErrors(res.errors);
		setFormData(INITIAL_STATE);
		console.log('SUCCESS! Post Created.');
	}

	return (
		<div className="PostForm">
			<div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4 mt-4">
				<h2>Create Post</h2>
				<div className="card">
					<div className="card-body">
						<form onSubmit={handleSubmit}>
							<div className="mb-3">
								<input
									id="image_file"
									name="image_file"
									type="url"
									onChange={handleChange}
									value={formData.image_file}
									autoComplete="off"
									className="form-control"
									placeholder="Image URL"
									required
								/>
							</div>
							<div className="mb-3">
								<textarea
									id="caption"
									name="caption"
									type="text"
									onChange={handleChange}
									value={formData.caption}
									autoComplete="off"
									className="form-control"
									placeholder="Caption"
									rows="4"
									required
								></textarea>
							</div>
							<button className="btn btn-primary d-grid gap-2 col-6 mx-auto mt-4">
								Share
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PostForm;
