import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import UserContext from '../UserContext';

// this will be used instead of <Route></Route> for some routes depending on if they need authentication. If a user is not logged in, they will be re-routed if they try to access these specified routes.

const ProtectedRoute = ({ exact, path, children }) => {
	const { currentUser } = useContext(UserContext);

	console.debug(
		'PrivateRoute',
		'exact=',
		exact,
		'path=',
		path,
		'currentUser=',
		currentUser
	);

	if (!currentUser) {
		return <Redirect to="/" />;
	}

	return (
		<Route exact={exact} path={path}>
			{children}
		</Route>
	);
};

export default ProtectedRoute;
