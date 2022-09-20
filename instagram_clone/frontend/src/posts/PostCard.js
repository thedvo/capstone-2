import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import UserContext from '../UserContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import Avatar from '@material-ui/core/Avatar';
import './postcard.css';

/* 
Card contains (user profile image, username, post image, caption)
*/

const PostCard = ({
	id,
	postImage,
	caption,
	username,
	userProfImg,
	datePosted,
}) => {
	const { formatDate, currentUser } = useContext(UserContext);
	let date = formatDate(datePosted);

	function linkToProfile(username, userProfImg) {
		return (
			<Link className="PostCard-Header" to={`/profile`}>
				<div>
					<Avatar
						className="PostCard-Avatar"
						alt={username}
						src={userProfImg}
					/>
					<h3>{username}</h3>
				</div>
			</Link>
		);
	}

	function linkToUser(username, userProfImg) {
		return (
			<Link className="PostCard-Header" to={`/users/${username}`}>
				<div>
					<Avatar
						className="PostCard-Avatar"
						alt={username}
						src={userProfImg}
					/>
					<h3>{username}</h3>
				</div>
			</Link>
		);
	}

	return (
		<div className="PostCard">
			{/* when user clicks anywhere on the header, it will link to the profile of the user who made the post */}
			{username === currentUser.username
				? linkToProfile(username, userProfImg)
				: linkToUser(username, userProfImg)}

			{/* clicking on the image section of the post will link to the individual post, showing more details (comments, comment form */}
			<Link to={`/posts/${id}`}>
				<img className="PostCard-Image" src={postImage} alt="post" />
				<h4 className="PostCard-Text">
					{username} <span className="PostCard-Caption">{caption}</span>
				</h4>
			</Link>
			<p>{date}</p>
		</div>
	);
};

export default PostCard;
