import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from './UserContext';

import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';

const Home = () => {
	const { currentUser } = useContext(UserContext);
	console.debug('Homepage', 'currentUser=', currentUser);

	return (
		<div className="Home">
			<div className="container text-center">
				<h1 className="Home-title mb-2 fw-bold">Instagram</h1>
				<p className="Home-lead mb-4">Capturing Moments</p>
				{currentUser ? (
					<div>
						<h3>
							Welcome back, {currentUser.firstName || currentUser.username}!
							<span>
								<img
									className="Home-VerifiedLogo"
									src="https://www.pngitem.com/pimgs/m/302-3024199_instagram-verified-symbol-png-instagram-verified-logo-png.png"
									alt="verified-logo"
								></img>
							</span>
						</h3>
						<Link to={'/posts'}>
							<button className="Home-ExploreBtn btn btn-outline-success">
								Explore
							</button>
						</Link>
					</div>
				) : (
					<p>
						<Link to="/login" className="btn btn-primary fw-bold me-3">
							Login
						</Link>
						<Link to="/signup" className="btn btn-primary fw-bold">
							Signup
						</Link>
					</p>
				)}
			</div>
		</div>
	);
};

export default Home;
