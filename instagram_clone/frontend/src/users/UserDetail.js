import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';

import igCloneApi from '../Api';
import UserContext from '../UserContext';
import SimplePostCard from '../posts/SimplePostCard';

import 'bootstrap/dist/css/bootstrap.min.css';
import Avatar from '@material-ui/core/Avatar';

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

	console.log(followed);
	console.log(unfollowed);

	async function handleFollow(e) {
		followUser(user.id);
		setFollowed(true);
		setUnfollowed(false);
		console.log(`Success, followed user: ${username}!`);
	}

	async function handleUnfollow(e) {
		unfollowUser(user.id);
		setFollowed(false);
		setUnfollowed(true);
		console.log(`Unfollowed ${username}!`);
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
			<div>
				<h4>Likes</h4>
				<p>0</p>
			</div>
		);
	}
	function noFollowers() {
		return (
			<div>
				<h4>Followers</h4>
				<p>0</p>
			</div>
		);
	}
	function noFollowing() {
		return (
			<div>
				<h4>Following</h4>
				<p>0</p>
			</div>
		);
	}

	function hasLikes() {
		return (
			<div>
				<Link to={`/users/${username}/likes`}>
					<h4>Likes {user.likes.length}</h4>
				</Link>
			</div>
		);
	}
	function hasFollowers() {
		return (
			<div>
				<Link to={`/users/${username}/followers`}>
					<h4>Followers {user.followers.length}</h4>
				</Link>
			</div>
		);
	}
	function hasFollowing() {
		return (
			<div>
				<Link to={`/users/${username}/following`}>
					<h4>Following {user.following.length}</h4>
				</Link>
			</div>
		);
	}

	function followButton() {
		return (
			<div>
				<button onClick={handleFollow}>Follow</button>
			</div>
		);
	}
	function unfollowButton() {
		return (
			<div>
				<button onClick={handleUnfollow}>Unfollow</button>
			</div>
		);
	}

	return (
		<div className="UserDetail col-md-8 offset-md-2 mt-4">
			<div>
				<Avatar
					className="PostCard-Avatar"
					alt={user.username}
					src={user.profileImage}
				/>
				<h4>{user.username}</h4>
			</div>

			{!followed ? followButton() : unfollowButton()}

			<h4>
				{user.firstName} {user.lastName}
			</h4>
			<p>{user.bio}</p>
			{user.likes.length > 0 ? hasLikes() : noLikes()}
			{user.following.length > 0 ? hasFollowing() : noFollowing()}
			{user.followers.length > 0 ? hasFollowers() : noFollowers()}
			<div className="UserDetail-Posts col-md-8 offset-md-2">
				{/* map out individual post components */}
				{user.posts.length ? (
					<div className="CompanyList-list">
						{user.posts.map((p) => (
							<SimplePostCard key={p.id} id={p.id} imageFile={p.imageFile} />
						))}
					</div>
				) : (
					<p className="lead">User currently has no posts.</p>
				)}
			</div>
		</div>
	);
};

export default UserDetail;
