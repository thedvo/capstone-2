import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';

import igCloneApi from '../Api';
import UserContext from '../UserContext';
import SimplePostCard from '../posts/SimplePostCard';

import 'bootstrap/dist/css/bootstrap.min.css';
import './UserDetail.css';

const UserDetail = () => {
	const { followUser, unfollowUser, hasFollowedUser } = useContext(UserContext);
	const { username } = useParams();

	console.log('UserDetail', 'username=', username);

	const [user, setUser] = useState(null);
	const [followed, setFollowed] = useState();
	const [unfollowed, setUnfollowed] = useState();
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		async function getUser() {
			let user = await igCloneApi.getCurrentUser(username);
			setUser(user);
			setIsLoading(false);
			setFollowed(hasFollowedUser(user.id) === true);
			setUnfollowed(hasFollowedUser(user.id) === false);
		}
		getUser();
	}, [username, followed, unfollowed]);

	async function handleFollow(e) {
		followUser(user.id);
		setFollowed(true);
		setUnfollowed(false);
		// console.log(`Success, followed user: ${username}!`);
	}

	async function handleUnfollow(e) {
		unfollowUser(user.id);
		setFollowed(false);
		setUnfollowed(true);
		// console.log(`Unfollowed ${username}!`);
	}

	if (isLoading) {
		return (
			<p className="Loading fw-bold text-info fs-1 text-center mt-4">
				Loading &hellip;
			</p>
		);
	}

	function noLikes() {
		return (
			<div className="UserDetail-Likes">
				<p>
					<span className="UserDetail-Number">0</span> likes
				</p>
			</div>
		);
	}

	function noFollowers() {
		return (
			<div className="UserDetail-followers">
				<p>
					<span className="UserDetail-Number">0</span> followers
				</p>
			</div>
		);
	}
	function noFollowing() {
		return (
			<div className="UserDetail-following">
				<p>
					<span className="UserDetail-Number">0</span> following
				</p>
			</div>
		);
	}

	function hasLikes() {
		return (
			<div className="UserDetail-likes">
				<Link
					to={`/users/${username}/likes`}
					style={{ textDecoration: 'none' }}
				>
					<p className="UserDetail-Title">
						{' '}
						<span className="UserDetail-Number">{user.likes.length}</span> likes
					</p>
				</Link>
			</div>
		);
	}
	function hasFollowers() {
		return (
			<div className="UserDetail-followers">
				<Link
					to={`/users/${username}/followers`}
					style={{ textDecoration: 'none' }}
				>
					<p className="UserDetail-Title">
						<span className="UserDetail-Number">{user.followers.length} </span>
						followers
					</p>
				</Link>
			</div>
		);
	}
	function hasFollowing() {
		return (
			<div className="UserDetail-following">
				<Link
					to={`/users/${username}/following`}
					style={{ textDecoration: 'none' }}
				>
					<p className="UserDetail-Title">
						<span className="UserDetail-Number">{user.following.length}</span>{' '}
						following
					</p>
				</Link>
			</div>
		);
	}

	function followButton() {
		return (
			<div>
				<button
					className="UserDetail-FollowBtn btn btn-outline-primary"
					onClick={handleFollow}
				>
					Follow
				</button>
			</div>
		);
	}
	function unfollowButton() {
		return (
			<div>
				<button
					className="UserDetail-FollowBtn btn btn-outline-danger"
					onClick={handleUnfollow}
				>
					Unfollow
				</button>
			</div>
		);
	}

	return (
		<div className="UserDetail container col-md-8 offset-md-2 mt-4">
			<div className="UserDetail-Top row">
				<div className="col-3">
					<img
						className="UserDetail-Avatar"
						alt={user.username}
						src={
							user.profileImage ||
							'https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg'
						}
					/>
				</div>
				<div className="col-9">
					<div className="row">
						<div className="col-2">
							<div className="UserDetail-Username">
								<h3>{user.username}</h3>
							</div>
						</div>
						<div className="UserDetail-Details col-2">
							<div className="UserDetail-FollowBtn">
								{!followed ? followButton() : unfollowButton()}
							</div>
						</div>
					</div>
					<div className="UserDetail-Data row mt-4">
						<div className="col-3">
							{user.likes.length > 0 ? hasLikes() : noLikes()}
						</div>
						<div className="col-3">
							{user.following.length > 0 ? hasFollowing() : noFollowing()}
						</div>
						<div className="col-3">
							{user.followers.length > 0 ? hasFollowers() : noFollowers()}
						</div>
					</div>

					<div className="row mt-2">
						<h5 className="UserDetail-FullName">
							{user.firstName} {user.lastName}
						</h5>
					</div>
					<div className="row">
						<div className="col-9">
							<p className="UserDetail-Bio">{user.bio}</p>
						</div>
					</div>
				</div>
			</div>
			<div className="row mt-5">
				<div className="UserDetail-Posts">
					{/* map out individual post components */}
					{user.posts.length ? (
						<div className="UserDetail-Posts row">
							{user.posts.map((p) => (
								<div className="col-4 mt-3">
									<SimplePostCard
										key={p.id}
										id={p.id}
										imageFile={p.imageFile}
									/>
								</div>
							))}
						</div>
					) : (
						<p className="lead">User currently has no posts.</p>
					)}
				</div>
			</div>
		</div>
	);
};

export default UserDetail;
