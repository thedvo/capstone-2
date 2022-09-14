import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useHistory } from 'react-router';

import igCloneApi from '../Api';
import UserContext from '../UserContext';
import CommentForm from '../forms/CommentForm';

import './postdetail.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Avatar from '@material-ui/core/Avatar';

/* 
Post Detail Component
---> page showing more details on an individual post

Card contains (
    - user avatar
    - username
    - post image
    - caption
    - like button
    - likes
    - comments + delete button (if made by current user)
    - comment form

    Make API call to getPost(id)
*/

const PostDetail = () => {
	// gather the necessary info needed for API calls (username, postId)
	const { currentUser } = useContext(UserContext);
	const { id } = useParams();

	// useHistory used to reroute if currentUser deletes their own post
	// also used when currentUser deletes their own comments
	const history = useHistory();

	const [post, setPost] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	// when route renders, make a request to get the post.
	useEffect(() => {
		async function getPost() {
			let post = await igCloneApi.getPost(id);

			setPost(post);
			setIsLoading(false);
		}
		getPost();
	}, [id]);

	if (isLoading) {
		return (
			<p className="Loading fw-bold text-info fs-1 text-center mt-4">
				Loading &hellip;
			</p>
		);
	}

	// handles event for deleting a post
	async function handleDeletePost(e) {
		e.preventDefault();
		await igCloneApi.deletePost(id, currentUser.username);
		history.push(`/profile`);
		console.log(`Successfully deleted post.`);
	}

	// only shows delete button if the post is by the currentUser
	function postByCurrentUser() {
		return (
			<div>
				<form onSubmit={handleDeletePost}>
					<button className="btn btn-danger">Delete</button>
				</form>
			</div>
		);
	}

	return (
		<div className="PostCard">
			{/* Post Header (avatar + username) */}
			<div className="PostCard-Header">
				<Link to={`/users/${post.user[0].username}`}>
					<Avatar
						className="PostCard-Avatar"
						alt={post.user[0].username}
						src={post.profileImage}
					/>
					<h3>{post.user[0].username}</h3>
				</Link>
			</div>

			{/* Post Body (Image, Likes, Comments, Comment Form, Date */}
			<img className="PostCard-Image" src={post.imageFile} alt="post-image" />
			<div>
				<h4>{post.likes.length} Likes</h4>

				<h4 className="PostCard-Text">
					<Link to={`/users/${post.user[0].username}`}>
						{post.user[0].username}
					</Link>
					<p className="PostCard-Caption">{post.caption}</p>
				</h4>

				{/* map the comments*/}
				{post.comments.map((comment) => (
					<div>
						<Link to={`/users/${comment.username}`}>
							<span>{comment.username}</span>
						</Link>
						<p>{comment.comment}</p>
					</div>
				))}
				<CommentForm postId={id} />
			</div>

			<p>{post.datePosted}</p>

			{currentUser.username === post.user[0].username
				? postByCurrentUser()
				: null}
		</div>
	);
};

export default PostDetail;
