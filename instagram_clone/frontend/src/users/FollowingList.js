import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import UserContext from '../UserContext';

import igCloneApi from '../Api';
import UserCard from './UserCard';

import 'bootstrap/dist/css/bootstrap.min.css';
import './FollowingList.css';

const FollowingList = () => {
	const { currentUser } = useContext(UserContext);
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
		<div className="FollowingList col-md-8 offset-md-2">
			{username === currentUser.username
				? linkToProfile(username)
				: linkToUser(username)}
			{/* map out individual user components */}
			<h3 className="FollowingList-Title">Following</h3>

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
