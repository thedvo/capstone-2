import React, { useState } from 'react';
import { useHistory } from 'react-router';

const PostForm = () => {
	const INITIAL_STATE = {
		imageFile: '',
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
        let res = await 
    }

    return (
        <div className="PostForm">
            <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4 mt-4">
                <h2>Create Post</h2>
                <div className="card">
					<div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label fw-bold" htmlFor="imageFile">
									Image File
								</label>
								<input
                                    id="imageFile"
									name="imageFile"
									type="text"
									onChange={handleChange}
									value={formData.imageFile}
									autoComplete="off"
									className="form-control"
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label fw-bold" htmlFor="caption">
									Caption
								</label>
								<input
                                    id="caption"
									name="caption"
									type="text"
									onChange={handleChange}
									value={formData.caption}
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

export default PostForm;
