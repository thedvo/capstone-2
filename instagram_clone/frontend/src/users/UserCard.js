import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import UserContext from '../UserContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import './UserCard.css';

/*
Card displays (full name, username, profileImage)
*/

const UserCard = ({ firstName, lastName, username, profileImage }) => {
	const { currentUser } = useContext(UserContext);

	function linkToProfile() {
		return (
			<Link className="UserCard card" to={`/profile`}>
				<div className="card-body">
					<h5 className="card-title">{username}</h5>
					<p>
						{firstName} {lastName}
					</p>
				</div>
			</Link>
		);
	}

	function linkToUser() {
		return (
			<Link className="UserCard card" to={`/users/${username}`}>
				<div className="card-body">
					<h5 className="card-title">{username}</h5>
					<p>
						{firstName} {lastName}
					</p>
				</div>
			</Link>
		);
	}

	return (
		<div>
			{username === currentUser.username ? linkToProfile() : linkToUser()}
		</div>
	);
};

export default UserCard;
