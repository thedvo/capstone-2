import React, { useState, useEffect, useContext } from 'react';
import UserContext from '../UserContext';
import { useParams } from 'react-router-dom';

import igCloneApi from '../Api';
import UserCard from './UserCard';

import 'bootstrap/dist/css/bootstrap.min.css';

const FollowerList = () => {
	const { username } = useParams();

	const [followers, setFollowers] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	// on mount, run makeSearch() to set the follower list
	useEffect(function getFollowersOnMount() {
		makeSearch();
	}, []);

	async function makeSearch() {
		let followers = await igCloneApi.getFollowers(username);
		setFollowers(followers);
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
		<div className="FollowerList col-md-8 offset-md-2">
			{/* map out individual user components */}
			{followers.length ? (
				<div className="FollowerList-list">
					{followers.map((u) => (
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
				<p className="lead">Sorry, no results found.</p>
			)}
		</div>
	);
};

export default FollowerList;
