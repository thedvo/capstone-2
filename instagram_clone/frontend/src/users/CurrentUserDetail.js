import React, { useState, useEffect, useContext } from 'react';
import UserContext from '../UserContext';
import { Link } from 'react-router-dom';

import igCloneApi from '../Api';
import SimplePostCard from '../posts/SimplePostCard';

import 'bootstrap/dist/css/bootstrap.min.css';
import Avatar from '@material-ui/core/Avatar';

const CurrentUserDetail = () => {
	const { currentUser } = useContext(UserContext);
	console.log('UserDetail', 'username=', currentUser.username);

	const [user, setUser] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		async function getUser() {
			let user = await igCloneApi.getCurrentUser(currentUser.username);

			setUser(user);
			setIsLoading(false);
		}
		getUser();
	}, []);

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
				<Link to={`/users/${user.username}/likes`}>
					<h4>Likes {user.likes.length}</h4>
				</Link>
			</div>
		);
	}
	function hasFollowers() {
		return (
			<div>
				<Link to={`/users/${user.username}/followers`}>
					<h4>Followers {user.followers.length}</h4>
				</Link>
			</div>
		);
	}
	function hasFollowing() {
		return (
			<div>
				<Link to={`/users/${user.username}/following`}>
					<h4>Following {user.following.length}</h4>
				</Link>
			</div>
		);
	}

	async function handleDeleteProfile() {
		await igCloneApi.deleteUser(user.username);
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

			<h4>
				{user.firstName} {user.lastName}
			</h4>
			<p>{user.bio}</p>

			{user.likes.length > 0 ? hasLikes() : noLikes()}
			{user.following.length > 0 ? hasFollowing() : noFollowing()}
			{user.followers.length > 0 ? hasFollowers() : noFollowers()}

			<div>
				<Link to={'/edit'}>
					<button className="btn btn-primary">Edit Profile</button>
				</Link>
			</div>

			<div className="UserDetail-Posts col-md-8 offset-md-2">
				{/* map out individual post components */}
				{user.posts.length ? (
					<div className="CompanyList-list">
						{user.posts.map((p) => (
							<SimplePostCard id={p.id} imageFile={p.imageFile} />
						))}
					</div>
				) : (
					<p className="lead">User currently has no posts.</p>
				)}
			</div>
			<div>
				<form onSubmit={handleDeleteProfile}>
					<button className="btn btn-danger">Delete Profile</button>
				</form>
			</div>
		</div>
	);
};

export default CurrentUserDetail;
