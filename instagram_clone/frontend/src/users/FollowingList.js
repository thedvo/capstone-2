import React, { useState, useEffect, useContext } from 'react';
import UserContext from '../UserContext';
import { useParams, Link } from 'react-router-dom';

import igCloneApi from '../Api';
import UserCard from './UserCard';

import 'bootstrap/dist/css/bootstrap.min.css';

const FollowingList = () => {
	const { username } = useParams();
	const [following, setFollowing] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	// on mount, run makeSearch() to set the following list
	useEffect(function getFollowingOnMount() {
		makeSearch();
	}, []);

	async function makeSearch() {
		let following = await igCloneApi.getFollowing(username);
		setFollowing(following);
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
		<div className="FollowingList col-md-8 offset-md-2">
			<div>
				<Link to={`/users/${username}`}>
					<button className="btn btn-light mb-4">Back to Profile</button>
				</Link>
			</div>
			{/* map out individual user components */}
			{following.length ? (
				<div className="FollowingList-list">
					{following.map((u) => (
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
				<p className="lead">{username} is not currently following anyone.</p>
			)}
		</div>
	);
};

export default FollowingList;
