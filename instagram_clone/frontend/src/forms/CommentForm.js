import React, { useState, useContext } from 'react';
import UserContext from '../UserContext';
import { useHistory } from 'react-router';
import igCloneApi from '../Api';

import './CommentForm.css';

const CommentForm = ({ postId }) => {
	const { currentUser } = useContext(UserContext);

	const INITIAL_STATE = {
		comment: '',
	};

	const [formData, setFormData] = useState(INITIAL_STATE);
	const history = useHistory();

	console.debug('CommentForm', 'formData=', formData);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((formData) => ({ ...formData, [name]: value }));
	};

	async function handleSubmit(e) {
		// e.preventDefault();
		await igCloneApi.addComment(postId, currentUser.username, formData);

		history.push(`/posts/${postId}`);
		setFormData(INITIAL_STATE);
		console.log('SUCCESS! Added a comment.');
	}

	return (
		<div className="CommentForm">
			<div className="container ">
				<form onSubmit={handleSubmit}>
					<div className="input-group mb-3">
						<input
							id="comment"
							name="comment"
							type="text"
							onChange={handleChange}
							value={formData.comment}
							autoComplete="off"
							className="form-control"
							placeholder="Add comment..."
							required
						/>
						<div className="input-group-append">
							<button className="btn btn-outline-primary">Post</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};

export default CommentForm;
