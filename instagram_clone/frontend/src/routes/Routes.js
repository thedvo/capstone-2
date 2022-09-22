import React from 'react';
import { Route, Switch } from 'react-router-dom';

// import components from other files so routes can render
import Home from '../Home';

/** Functional Components */
import CurrentUserDetail from '../users/CurrentUserDetail';
import UserDetail from '../users/UserDetail';
import FollowingList from '../users/FollowingList';
import FollowerList from '../users/FollowerList';
import LikesList from '../users/LikesList';

import PostList from '../posts/PostList';
import PostDetail from '../posts/PostDetail';
import PostLikesList from '../posts/PostLikesList';

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

			{/* ************************* POST ROUTES ***********************************************************/}
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
			{/* Individual Post's Likes */}
			<ProtectedRoute path="/posts/:id/likes">
				<PostLikesList />
			</ProtectedRoute>

			{/* ************************* USER ROUTES ***********************************************************/}
			{/* Display current user's profile */}
			<ProtectedRoute exact path="/profile">
				<CurrentUserDetail />
			</ProtectedRoute>
			{/* Shows an individual user's profile */}
			<ProtectedRoute exact path="/users/:username">
				<UserDetail />
			</ProtectedRoute>
			{/* Shows a list of a user's likes */}
			<ProtectedRoute exact path="/users/:username/likes">
				<LikesList />
			</ProtectedRoute>
			{/* Shows a list of a user's following */}
			<ProtectedRoute exact path="/users/:username/following">
				<FollowingList />
			</ProtectedRoute>
			{/* Shows a list of a user's followers */}
			<ProtectedRoute exact path="/users/:username/followers">
				<FollowerList />
			</ProtectedRoute>
			{/* Displays Edit Profile Form */}
			<ProtectedRoute exact path="/edit">
				<UserEditForm />
			</ProtectedRoute>

			{/* ************************* AUTHORIZATION ROUTES ***********************************************************/}
			{/* Displays User Login Form */}
			<Route exact path="/login">
				<LoginForm login={login} />
			</Route>
			{/* Displays Sign Up Form */}
			<Route exact path="/signup">
				<SignUpForm signup={signup} />
			</Route>
			{/* Invalid URL leads user to error page */}
			<Route>
				<NotFound />
			</Route>
		</Switch>
	);
};

export default Routes;
