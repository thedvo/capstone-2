import React, { useContext } from 'react';
import { NavLink, Link } from 'react-router-dom';
import UserContext from '../UserContext';

import 'bootstrap/dist/css/bootstrap.min.css';
import './Nav.css';

function Nav({ logout }) {
	const { currentUser } = useContext(UserContext);

	console.debug('Navigation', 'currentUser=', currentUser);

	/** [LOGGED IN] Displays NavBar w/ User Profile and Logout button  */
	function loggedInNav() {
		return (
			<ul className="navbar-nav ms-auto">
				<li className="nav-item me-4">
					<NavLink className="nav-link" exact to="/posts/">
						{/* Explore */}
						<img
							className="nav-homeBtn"
							src="https://static.vecteezy.com/system/resources/previews/001/505/049/non_2x/homepage-icon-free-vector.jpg"
							alt="home-button"
						></img>
					</NavLink>
				</li>
				{/* link to create a post */}
				<li className="nav-item me-3">
					<NavLink className="nav-link" exact to="/posts/create">
						{/* Create (+) */}
						<img
							className="nav-createBtn"
							src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXip6m909KWrCWyylYpTYgSyrmwbjyRr1ElWD-6MT70UvGSsem-winJyC78LOAfhg1Mc8&usqp=CAU"
							alt="create-button"
						></img>
					</NavLink>
				</li>
				<li className="nav-item me-2">
					<NavLink className="nav-link" exact to="/profile">
						{/* Profile */}
						<img
							className="nav-profileBtn"
							src="https://static.vecteezy.com/system/resources/thumbnails/005/545/335/small/user-sign-icon-person-symbol-human-avatar-isolated-on-white-backogrund-vector.jpg"
							alt="profile-button"
						></img>
					</NavLink>
				</li>
				<li className="nav-logout nav-item">
					<Link className="nav-link mt-1" to="/" onClick={logout}>
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
			<div className="container-fluid">
				<NavLink className="navbar-brand" exact to="/">
					<img
						className="nav-insta-logo"
						src="https://logos-download.com/wp-content/uploads/2016/03/Instagram_Logo_2016.png"
						alt="instagram-logo"
					></img>
				</NavLink>
				{currentUser ? loggedInNav() : loggedOutNav()}
			</div>
		</nav>
	);
}

export default Nav;
