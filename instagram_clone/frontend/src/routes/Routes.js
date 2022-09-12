import React from 'react';
import { Route, Switch } from 'react-router-dom';

// import components from other files so routes can render
import Home from '../Home';

/** Functional Components */
import UserDetail from '../users/UserDetail';
import UserList from '../users/UserList';

import PostList from '../posts/PostList';
import PostDetail from '../posts/PostDetail';

/** Forms */
import LoginForm from '../forms/LoginForm';
import SignUpForm from '../forms/SignUpForm';
import UserEditForm from '../forms/UserEditForm';

/** Route Helpers */
import NotFound from '../routes/NotFound';
import ProtectedRoute from '../routes/ProtectedRoute';

const Routes = ({ login, signup }) => {
	console.debug(
		'Routes',
		`login=${typeof login}`,
		`register=${typeof register}`
	);

	return (
		<Switch>
			{/* Home */}
			<Route exact path="/">
				<Home />
			</Route>

			{/* Shows list of Posts */}
			<ProtectedRoute exact path="/post">
				<PostList />
			</ProtectedRoute>

			{/* Individual Post */}
			<ProtectedRoute path="/post/:id">
				<PostDetail />
			</ProtectedRoute>

			{/* Shows list of Users */}
			<ProtectedRoute exact path="/user">
				<UserList />
			</ProtectedRoute>

			{/* Display user profile */}
			<ProtectedRoute exact path="/user/:username">
				<UserDetail />
			</ProtectedRoute>

			{/* Displays User Login Form */}
			<Route exact path="/login">
				<LoginForm login={login} />
			</Route>

			{/* Displays Sign Up Form */}
			<Route exact path="/signup">
				<SignUpForm signup={signup} />
			</Route>

			{/* Displays Edit Profile Form */}
			<ProtectedRoute exact path="/user/:username/edit">
				<UserEditForm />
			</ProtectedRoute>

			{/* Invalid URL leads user to error page */}
			<Route>
				<NotFound />
			</Route>
		</Switch>
	);
};

export default Routes;
