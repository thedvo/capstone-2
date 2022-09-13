import React from 'react';
import { Link } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './UserCard.css';

/*
Card displays (full name, username, profileImage)
*/

const UserCard = ({ firstName, lastName, username, profileImage }) => {
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
};

export default UserCard;
