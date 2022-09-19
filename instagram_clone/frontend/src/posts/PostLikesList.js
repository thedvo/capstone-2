import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

import igCloneApi from '../Api';
import UserCard from '../users/UserCard';

import 'bootstrap/dist/css/bootstrap.min.css';

const PostLikesList = () => {
	const { id } = useParams();
	const [likes, setLikes] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(function getLikesOnMount() {
		getLikesForPost();
	}, []);

	async function getLikesForPost() {
		let likes = await igCloneApi.getPostLikes(id);
		setLikes(likes);
		setIsLoading(false);
	}

	// will show 'Loading...' as API request is finishing
	if (isLoading) {
		return (
			<p className="Loading fw-bold text-info fs-1 text-center mt-4">
				Loading &hellip;
			</p>
		);
	}

	return (
		<div className="LikesList col-md-8 offset-md-2">
			<div>
				<Link to={`/posts/${id}`}>
					<button className="btn btn-light mb-4">Back to Post</button>
				</Link>
			</div>
			{likes.length ? (
				<div className="PostLikesList-list">
					{likes.map((u) => (
						<UserCard
							key={u.id}
							username={u.username}
							firstName={u.firstName}
							lastName={u.lastName}
							profileImage={u.profileImage}
						/>
					))}
				</div>
			) : (
				<p className="lead">This post has no likes.</p>
			)}
		</div>
	);
};

export default PostLikesList;
