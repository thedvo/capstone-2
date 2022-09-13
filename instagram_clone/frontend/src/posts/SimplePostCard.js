import React from 'react';
import { Link } from 'react-router-dom';

import UserContext from '../UserContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import Avatar from '@material-ui/core/Avatar';
import './postcard.css';

/* 
Card contains (user profile image, username, post image, caption)
*/

const SimplePostCard = ({ id, imageFile }) => {
	return (
		<div className="SimplePostCard">
			{/* clicking on the image section of the post will link to the individual post, showing more details (comments, comment form */}
			<Link to={`/posts/${id}`}>
				<img
					className="SimplePostCard-Image"
					src={imageFile}
					alt="post-image"
				/>
			</Link>
		</div>
	);
};

export default SimplePostCard;
