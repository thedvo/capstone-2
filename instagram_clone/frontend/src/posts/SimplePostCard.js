import React from 'react';
import { Link } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './SimplePostCard.css';

/* 
Card contains (user profile image, username, post image, caption)
*/

const SimplePostCard = ({ id, imageFile }) => {
	return (
		<div className="SimplePostCard">
			{/* clicking on the image section of the post will link to the individual post, showing more details (comments, comment form */}
			<Link to={`/posts/${id}`}>
				<img className="SimplePostCard-Image" src={imageFile} alt="post" />
			</Link>
		</div>
	);
};

export default SimplePostCard;
