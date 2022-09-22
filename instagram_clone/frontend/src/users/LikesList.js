import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import UserContext from '../UserContext';

import igCloneApi from '../Api';
import SimplePostCard from '../posts/SimplePostCard';

import 'bootstrap/dist/css/bootstrap.min.css';

const LikesList = () => {
	const { currentUser } = useContext(UserContext);
	const { username } = useParams();
	const [likes, setLikes] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	// on mount, run makeSearch() to set the likes list
	useEffect(function getLikesOnMount() {
		makeSearch();
	}, []);

	async function makeSearch() {
		let likes = await igCloneApi.getLikes(username);
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

	function linkToProfile(username) {
		return (
			<Link to={`/profile`} style={{ textDecoration: 'none' }}>
				<button className="btn btn-outline-dark mb-4">Back to Profile</button>
			</Link>
		);
	}

	function linkToUser(username) {
		return (
			<Link to={`/users/${username}`} style={{ textDecoration: 'none' }}>
				<button className="btn btn-outline-dark mb-4">Back to Profile</button>
			</Link>
		);
	}

	return (
		<div className="LikesList col-md-8 offset-md-2">
			{username === currentUser.username
				? linkToProfile(username)
				: linkToUser(username)}
			{/* map out individual user components */}
			{likes.length ? (
				<div className="LikesList-list row">
					{likes.map((p) => (
						<div className="col-4 mt-3">
							<SimplePostCard
								key={p.postId}
								id={p.postId}
								imageFile={p.imageFile}
							/>
						</div>
					))}
				</div>
			) : (
				<p className="lead">{username} has not liked any posts yet.</p>
			)}
		</div>
	);
};

export default LikesList;
