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
import PostForm from '../forms/PostForm';

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
			<ProtectedRoute exact path="/posts">
				<PostList />
			</ProtectedRoute>

			{/* Shows create post form */}
			<ProtectedRoute path="/posts/create">
				<PostForm />
			</ProtectedRoute>

			{/* Individual Post */}
			<ProtectedRoute path="/posts/:id">
				<PostDetail />
			</ProtectedRoute>

			{/* Shows an individual user's profile */}
			<ProtectedRoute exact path="/users/:username">
				<UserDetail />
			</ProtectedRoute>

			{/* Display user profile */}
			<ProtectedRoute exact path="/profile">
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
			<ProtectedRoute exact path="/edit">
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
