import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useHistory } from 'react-router';

import igCloneApi from '../Api';
import UserContext from '../UserContext';
import CommentForm from '../forms/CommentForm';

import './PostDetail.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Avatar from '@material-ui/core/Avatar';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';

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
	const [profileImage, setProfileImage] = useState();
	const [username, setUsername] = useState();
	const [comments, setComments] = useState([]);
	const [hasCommented, setHasCommented] = useState();
	const [hasDeletedComment, setHasDeletedComment] = useState();

	// when route renders, make a request to get the post.
	useEffect(() => {
		async function getPost() {
			let post = await igCloneApi.getPost(id);

			// gets the post information
			setPost(post);
			setIsLoading(false);
			setLiked(hasLikedPost(id) === true);
			setUnliked(hasLikedPost(id) === false);
			setProfileImage(post.user[0].profileImage);
			setUsername(post.user[0].username);
			setComments(post.comments);
			setHasDeletedComment(false);
		}
		getPost();
	}, [id, liked, unliked, hasCommented, hasDeletedComment]);

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
			<div className="PostDetail-Likes">
				<FavoriteBorderIcon
					className="PostDetail-LikeBtn"
					onClick={handleLike}
				/>
				{post.likes.length === 1 ? (
					<span>
						<h5 className="PostDetail-LikeCount">{post.likes.length} Like</h5>
					</span>
				) : (
					<span>
						<h5 className="PostDetail-LikeCount">{post.likes.length} Likes</h5>
					</span>
				)}
			</div>
		);
	}
	function unLikeButton() {
		return (
			<div className="PostDetail-Likes">
				<FavoriteIcon className="PostDetail-UnLikeBtn" onClick={handleUnlike} />
				{post.likes.length === 1 ? (
					<span>
						<h5 className="PostDetail-LikeCount">{post.likes.length} Like</h5>
					</span>
				) : (
					<span>
						<h5 className="PostDetail-LikeCount">{post.likes.length} Likes</h5>
					</span>
				)}
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
					<button className="btn btn-outline-danger btn-sm">Delete</button>
				</form>
			</div>
		);
	}

	/** ************************************************************* */

	let date = formatDate(post.datePosted);

	function linkToProfile(post) {
		return (
			<div className="PostDetail-Header container">
				<div className="row">
					<div className="col-2 me-4">
						<Avatar
							className="PostDetail-Avatar"
							alt={username}
							src={profileImage}
						/>
					</div>
					<div className="col-6 mt-1">
						<Link to={`/profile`} style={{ textDecoration: 'none' }}>
							<h5 className="PostDetail-Username">{username}</h5>
						</Link>
					</div>
				</div>
			</div>
		);
	}

	function linkToUser(post) {
		return (
			<div className="PostDetail-Header">
				<Avatar
					className="PostDetail-Avatar"
					alt={username}
					src={profileImage}
				/>
				<Link to={`/users/${username}`} style={{ textDecoration: 'none' }}>
					<h5 className="PostDetail-Username">{username}</h5>
				</Link>
			</div>
		);
	}

	function linkToProfileFromComment(comment) {
		return (
			<Link to={`/profile`} style={{ textDecoration: 'none' }}>
				<strong className="comment-user">{comment.username}</strong>
			</Link>
		);
	}

	function linkToUserFromComment(comment) {
		return (
			<Link
				to={`/users/${comment.username}`}
				style={{ textDecoration: 'none' }}
			>
				<strong className="comment-user">{comment.username}</strong>
			</Link>
		);
	}

	async function handleDeleteComment(e, commentId) {
		await igCloneApi.deleteComment(id, currentUser.username, commentId);
		// will set state for 'hasDeletedComment' from false to true. This will trigger the useEffect for GET request to get the Post.
		setHasDeletedComment(true);
	}

	return (
		<div className="PostDetail">
			{/* Post Header (avatar + username) */}
			<div className="PostDetail-Header">
				{post.user[0].username === currentUser.username
					? linkToProfile()
					: linkToUser()}
				<div className="col">
					{currentUser.username === post.user[0].username
						? postByCurrentUser()
						: null}
				</div>
			</div>

			{/* Post Body (Image, Likes, Comments, Comment Form, Date */}
			<img className="PostDetail-Image" src={post.imageFile} alt="post" />

			{!liked ? likeButton() : unLikeButton()}

			<div>
				{post.user[0].username === currentUser.username ? (
					<h6 className="PostDetail-Caption">
						<Link
							to={`/profile`}
							style={{ textDecoration: 'none' }}
							className="PostDetail-caption-username"
						>
							<strong>{post.user[0].username}</strong>
						</Link>
						<span className="PostCard-Caption">{post.caption}</span>
					</h6>
				) : (
					<h6 className="PostDetail-Caption">
						<Link
							to={`/users/${post.user[0].username}`}
							style={{ textDecoration: 'none' }}
							className="PostDetail-caption-username"
						>
							<strong>{post.user[0].username}</strong>
						</Link>
						<span className="PostCard-Caption">{post.caption}</span>
					</h6>
				)}

				{/* map the comments*/}
				{post.comments.map((comment) => (
					<div className="row" key={comment.commentId}>
						<div className="col-10">
							<h6 className="PostDetail-Comments">
								{comment.username === currentUser.username
									? linkToProfileFromComment(comment)
									: linkToUserFromComment(comment)}
								<span>{comment.comment}</span>
							</h6>
						</div>
						<div className="col-2">
							{comment.username === currentUser.username ? (
								<span>
									<button
										onClick={(e) => handleDeleteComment(e, comment.commentId)}
										className="Comment-DeleteBtn btn btn-outline-dark btn-sm"
									>
										x
									</button>
									{/* https://bobbyhadz.com/blog/react-onclick-pass-event-and-parameter this link helped a lot in figuring out how to pass down the Comment ID to the handleDeleteComment function */}
								</span>
							) : null}
						</div>
					</div>
				))}
			</div>
			<div>
				<CommentForm
					comments={comments}
					setComments={setComments}
					postId={id}
					setHasCommented={setHasCommented}
				/>
			</div>
			<p className="PostDetail-Date">{date}</p>
		</div>
	);
};

export default PostDetail;
