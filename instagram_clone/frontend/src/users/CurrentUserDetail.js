import React, { useState, useEffect, useContext } from 'react';
import UserContext from '../UserContext';
import { Link } from 'react-router-dom';

import igCloneApi from '../Api';
import SimplePostCard from '../posts/SimplePostCard';

import 'bootstrap/dist/css/bootstrap.min.css';
import './CurrentUserDetail.css';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

const CurrentUserDetail = () => {
	const { currentUser } = useContext(UserContext);
	console.log('UserDetail', 'username=', currentUser.username);

	const [user, setUser] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [isHovering, setIsHovering] = useState(false);

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

	const handleMouseOver = () => {
		let toggle = isHovering === true ? false : true;
		setIsHovering(toggle);
	};

	function noLikes() {
		return (
			<div className="CurrentUser-Likes">
				<p>
					<span className="UserDetail-Number">0</span> likes
				</p>
			</div>
		);
	}
	function noFollowers() {
		return (
			<div className="CurrentUser-Followers">
				<p>
					<span className="UserDetail-Number">0</span> followers
				</p>
			</div>
		);
	}
	function noFollowing() {
		return (
			<div className="CurrentUser-Following">
				<p>
					<span className="UserDetail-Number">0</span> following
				</p>
			</div>
		);
	}

	function hasLikes() {
		return (
			<div className="CurrentUser-Likes">
				<Link
					to={`/users/${user.username}/likes`}
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
			<div className="CurrentUser-Followers">
				<Link
					to={`/users/${user.username}/followers`}
					style={{ textDecoration: 'none' }}
				>
					<p className="UserDetail-Title">
						<span className="UserDetail-Number">{user.followers.length}</span>
						followers
					</p>
				</Link>
			</div>
		);
	}
	function hasFollowing() {
		return (
			<div className="CurrentUser-Following">
				<Link
					to={`/users/${user.username}/following`}
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

	async function handleDeleteProfile() {
		await igCloneApi.deleteUser(user.username);
	}

	return (
		<div className="UserDetail container col-md-8 offset-md-2 mt-4">
			<div className="UserDetail-Top row">
				<div className="col-3">
					<div>
						<img
							className="UserDetail-Avatar"
							alt={user.username}
							src={
								user.profileImage ||
								'https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg'
							}
						/>
					</div>
				</div>
				<div className="col-9">
					<div className="row">
						<div className="col-3">
							<div className="CurrentUserDetail-Username">
								<h3>{user.username}</h3>
							</div>
						</div>
						<div className="UserDetail-Details col-3">
							<div className="UserDetail-EditBtn">
								<Link to={'/edit'}>
									<button className="btn btn-outline-secondary">
										Edit Profile
									</button>
								</Link>
							</div>
						</div>
						<div className="col-3">
							<div className="UserDetail-delete-toggle">
								<div onClick={handleMouseOver}>
									<MoreHorizIcon />
									{isHovering && (
										<div className="UserDetail-DeleteBtn">
											<form onSubmit={handleDeleteProfile}>
												<button className="btn btn-danger btn-sm">
													Delete User
												</button>
											</form>
										</div>
									)}
								</div>
							</div>
						</div>
					</div>
					<div className="CurrentUserDetail-Data row mt-4">
						<div className="col-3">
							{user.likes.length > 0 ? hasLikes() : noLikes()}
						</div>
						<div className="col-3">
							{user.followers.length > 0 ? hasFollowers() : noFollowers()}
						</div>
						<div className="col-3">
							{user.following.length > 0 ? hasFollowing() : noFollowing()}
						</div>
					</div>

					<div className="row mt-2">
						<h5 className="Current-UserDetail-FullName">
							{user.firstName} {user.lastName}
						</h5>
					</div>

					<div className="row">
						<div className="col-9">
							<p className="Current-UserDetail-Bio">{user.bio}</p>
						</div>
					</div>
				</div>
			</div>
			<div className="row mt-5">
				<div className="UserDetail-Posts ">
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
						<p className="NoPosts lead">User currently has no posts.</p>
					)}
				</div>
			</div>
		</div>
	);
};
// col-lg-8 offset-md-2
export default CurrentUserDetail;
