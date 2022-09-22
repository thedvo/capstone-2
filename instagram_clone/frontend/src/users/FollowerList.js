import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import UserContext from '../UserContext';

import igCloneApi from '../Api';
import UserCard from './UserCard';

import 'bootstrap/dist/css/bootstrap.min.css';
import './FollowerList.css';

const FollowerList = () => {
	const { currentUser } = useContext(UserContext);
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
		<div className="FollowerList col-md-8 offset-md-2">
			{username === currentUser.username
				? linkToProfile(username)
				: linkToUser(username)}
			{/* map out individual user components */}
			<h3 className="FollowerList-Title">Followers</h3>

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
				<p className="lead">{username} has no followers.</p>
			)}
		</div>
	);
};

export default FollowerList;
