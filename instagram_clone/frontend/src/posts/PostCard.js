import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import UserContext from '../UserContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import Avatar from '@material-ui/core/Avatar';
import './PostCard.css';

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
			<div className="PostCard-Header">
				<Avatar className="PostCard-Avatar" alt={username} src={userProfImg} />
				<Link to={`/profile`} style={{ textDecoration: 'none' }}>
					<h5 className="PostCard-Username">{username}</h5>
				</Link>
			</div>
		);
	}

	function linkToUser(username, userProfImg) {
		return (
			<div className="PostCard-Header">
				<Avatar className="PostCard-Avatar" alt={username} src={userProfImg} />
				<Link to={`/users/${username}`} style={{ textDecoration: 'none' }}>
					<h5 className="PostCard-Username">{username}</h5>
				</Link>
			</div>
		);
	}

	return (
		<div className="PostCard mb-3">
			{/* when user clicks anywhere on the header, it will link to the profile of the user who made the post */}
			{username === currentUser.username
				? linkToProfile(username, userProfImg)
				: linkToUser(username, userProfImg)}

			{/* clicking on the image section of the post will link to the individual post, showing more details (comments, comment form */}
			<Link to={`/posts/${id}`} style={{ textDecoration: 'none' }}>
				<div className="PostCard-ImageContainer">
					<img className="PostCard-Image" src={postImage} alt="post" />
				</div>
				<h6 className="PostCard-Text">
					<strong>{username}</strong>{' '}
					<span className="PostCard-Caption">{caption}</span>
				</h6>
			</Link>
			<p className="PostCard-Date">{date}</p>
		</div>
	);
};

export default PostCard;
