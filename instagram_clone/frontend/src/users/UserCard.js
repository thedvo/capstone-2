import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import UserContext from '../UserContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import Avatar from '@material-ui/core/Avatar';
import './UserCard.css';

/*
Card displays (full name, username, profileImage)
*/

const UserCard = ({ firstName, lastName, username, profileImage }) => {
	const { currentUser } = useContext(UserContext);

	function linkToProfile() {
		return (
			<div className="row">
				<div className="UserCard-Avatar col-1 mt-2 ms-2 me-5">
					<Avatar alt={username} src={profileImage} />
				</div>
				<div className="UserCardDetails col mt-2">
					<div className="row">
						<Link to={`/profile`} style={{ textDecoration: 'none' }}>
							<h5 className="UserCard-Username card-title">{username}</h5>
						</Link>
					</div>
					<div className="row">
						<p className="UserCard-FullName">
							{firstName} {lastName}
						</p>
					</div>
				</div>
			</div>
		);
	}

	function linkToUser() {
		return (
			<div className="row">
				<div className="UserCard-Avatar col-1 mt-2 ms-2 me-5">
					<Avatar alt={username} src={profileImage} />
				</div>
				<div className="UserCardDetails col mt-2">
					<div className="row">
						<Link to={`/users/${username}`} style={{ textDecoration: 'none' }}>
							<h5 className="UserCard-Username card-title">{username}</h5>
						</Link>
					</div>
					<div className="row">
						<p className="UserCard-FullName">
							{firstName} {lastName}
						</p>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="UserCard-Main container mt-2">
			{username === currentUser.username ? linkToProfile() : linkToUser()}
		</div>
	);
};

export default UserCard;
