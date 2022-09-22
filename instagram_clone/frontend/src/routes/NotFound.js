import React from 'react';
import './NotFound.css';
import { Link } from 'react-router-dom';

const NotFound = () => {
	return (
		<div className="NotFound">
			<p className="NotFound-Message">
				Sorry! The page you are looking for does not exist.
			</p>
			<p className="NotFound-reroute">
				Go back to{' '}
				<Link to={'/'} style={{ textDecoration: 'none' }}>
					Instagram
				</Link>
			</p>
		</div>
	);
};

export default NotFound;
