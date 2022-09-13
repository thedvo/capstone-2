import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import UserContext from '../UserContext';
import igCloneApi from '../Api';
import CommentForm from '../forms/CommentForm';
import './postdetail.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import Avatar from '@material-ui/core/Avatar';

/* 
Card contains (
    - user avatar
    - username
    - post image
    - caption
    - like button
    - likes
    - comments (find a way to show username beside comment)
    - comment form

    Make API call to getPost(id)
*/

const PostDetail = () => {
	const { id } = useParams();
	console.log('PostDetail', 'id=', id);

	const [post, setPost] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

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

	return (
		<div className="PostCard">
			{/* Post Header (avatar + username) */}
			<div className="PostCard-Header">
				<Avatar
					className="PostCard-Avatar"
					alt={post.username}
					src={post.profileImage}
				/>
				<h3>{post.username}</h3>
			</div>

			{/* Post Body (Image, Likes, Comments, Comment Form, Date */}
			<img className="PostCard-Image" src={post.imageFile} alt="post-image" />
			<div>
				<h4>{post.likes.length} Likes</h4>

				<h4 className="PostCard-Text">
					{post.username}
					<span className="PostCard-Caption">{post.caption}</span>
				</h4>
				{/* map the comments*/}
				{post.comments.map((comment) => comment)}
				<CommentForm postId={post.id} />
			</div>

			<p>{post.datePosted}</p>
		</div>
	);
};

export default PostDetail;
