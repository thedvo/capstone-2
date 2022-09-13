import React, { useState } from 'react';
import { useHistory } from 'react-router';

const CommentForm = () => {
	const INITIAL_STATE = {
		comment: ''
	};

	const [formData, setFormData] = useState(INITIAL_STATE);
	const [formErrors, setFormErrors] = useState([]);
	const history = useHistory();

	console.debug('CommentForm', 'formData=', formData, 'formErrors=', formErrors);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((formData) => ({ ...formData, [name]: value }));
	};

    async function handleSubmit(e) {
        e.preventDefault();
        let res = await 
    }

    return (
        <div className="PostForm">
            <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4 mt-4">
                <h2>Add Comment</h2>
                <div className="card">
					<div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label fw-bold" htmlFor="comment">
									Comment
								</label>
								<input
                                    id="comment"
									name="comment"
									type="text"
									onChange={handleChange}
									value={formData.comment}
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
    )
};

export default CommentForm;
