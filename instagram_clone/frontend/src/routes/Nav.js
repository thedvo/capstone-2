import React, { useContext } from 'react';
import { NavLink, Link } from 'react-router-dom';
import UserContext from '../UserContext';
import 'bootstrap/dist/css/bootstrap.min.css';

function Nav({ logout }) {
	const { currentUser } = useContext(UserContext);

	console.debug('Navigation', 'currentUser=', currentUser);

	/** [LOGGED IN] Displays NavBar w/ User Profile and Logout button  */
	function loggedInNav() {
		return (
			<ul className="navbar-nav ms-auto">
				{/* link to create a post */}
				<li className="nav-item me-4">
					<NavLink className="nav-link" exact to="/posts/create">
						Create (+)
					</NavLink>
				</li>
				<li className="nav-item me-4">
					<NavLink className="nav-link" exact to="/profile">
						Profile
					</NavLink>
				</li>
				<li className="nav-item">
					<Link className="nav-link" to="/" onClick={logout}>
						Logout {currentUser.firstName || currentUser.username}
					</Link>
				</li>
			</ul>
		);
	}

	/** [LOGGED OUT] Displays NavBar w/ Login and Sign Up button  */
	function loggedOutNav() {
		return (
			<ul ul className="navbar-nav ms-auto">
				<li className="nav-item mr-4">
					<NavLink className="nav-link" exact to="/login">
						Login
					</NavLink>
				</li>
				<li className="nav-item me-4">
					<NavLink className="nav-link" exact to="/signup">
						Sign Up
					</NavLink>
				</li>
			</ul>
		);
	}

	return (
		<nav className="Navigation navbar navbar-expand-lg mb-4">
			<div class="container-fluid">
				<NavLink className="navbar-brand" exact to="/">
					Instagram
				</NavLink>
				{currentUser ? loggedInNav() : loggedOutNav()}
			</div>
		</nav>
	);
}

export default Nav;
