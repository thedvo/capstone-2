import React, { useState, useEffect, useContext } from 'react';
import UserContext from '../UserContext';
import { useParams } from 'react-router-dom';

import igCloneApi from '../Api';

import 'bootstrap/dist/css/bootstrap.min.css';
import SimplePostCard from '../posts/SimplePostCard';

const LikesList = () => {
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

	return (
		<div className="LikesList col-md-8 offset-md-2">
			{/* map out individual user components */}
			{likes.length ? (
				<div className="LikesList-list">
					{likes.map((p) => (
						<SimplePostCard id={p.postId} imageFile={p.imageFile} />
					))}
				</div>
			) : (
				<p className="lead">{username} has not liked any posts yet.</p>
			)}
		</div>
	);
};

export default LikesList;
