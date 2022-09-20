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
	const {
		currentUser,
		likePost,
		unlikePost,
		hasLikedPost,
		formatDate,
	} = useContext(UserContext);
	const { id } = useParams();

	// useHistory used to reroute if currentUser deletes their own post
	// also used when currentUser deletes their own comments
	const history = useHistory();

	const [post, setPost] = useState(null);
	const [liked, setLiked] = useState();
	const [unliked, setUnliked] = useState();
	const [isLoading, setIsLoading] = useState(true);

	// useEffect(() => {
	// 	function updateLikeStatus() {
	// 		setLiked(hasLikedPost(id) === true);
	// 		setUnliked(hasLikedPost(id) === false);
	// 	}
	// 	updateLikeStatus();
	// }, [id, hasLikedPost]);

	console.log(liked);
	console.log(unliked);
	// when route renders, make a request to get the post.
	useEffect(() => {
		async function getPost() {
			let post = await igCloneApi.getPost(id);

			// gets the post information
			setPost(post);
			setIsLoading(false);
			setLiked(hasLikedPost(id) === true);
			setUnliked(hasLikedPost(id) === false);
		}
		getPost();
	}, [id, liked, unliked]);

	if (isLoading) {
		return (
			<p className="Loading fw-bold text-info fs-1 text-center mt-4">
				Loading &hellip;
			</p>
		);
	}

	/** Show like or unlike button depending on the "liked" state. */
	function likeButton() {
		return (
			<div>
				<button onClick={handleLike}>Like</button>
			</div>
		);
	}
	function unLikeButton() {
		return (
			<div>
				<button onClick={handleUnlike}>Unlike</button>
			</div>
		);
	}

	/** the likePost/unLikePost functions are passed down as prop from UserContext */
	async function handleLike(e) {
		likePost(id);
		setLiked(true);
		setUnliked(false);
		console.log(`Success, liked post: ${id}!`);
	}

	async function handleUnlike(e) {
		unlikePost(id);
		setLiked(false);
		setUnliked(true);
		console.log('Unliked post!');
	}

	/** ************************************************************* */
	// DELETING A POST (currentUser only)
	/** ************************************************************* */

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

	/** ************************************************************* */

	let date = formatDate(post.datePosted);

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

			{!liked ? likeButton() : unLikeButton()}

			<div>
				{/* <h4>
					<Link to={`/posts/${id}/likes`}>{post.likes.length} Likes </Link>
				</h4> */}
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

			<p>Posted {date}</p>

			{currentUser.username === post.user[0].username
				? postByCurrentUser()
				: null}
		</div>
	);
};

export default PostDetail;
