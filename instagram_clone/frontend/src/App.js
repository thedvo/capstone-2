import React, { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import jwt from 'jsonwebtoken';

import './App.css';

import igCloneApi from './Api';
import Nav from './routes/Nav';
import Routes from './routes/Routes';
import Footer from './Footer';

import UserContext from './UserContext';
import useLocalStorage from './hooks/useLocalStorage';

/**
 - App component (top of hierarchy) renders Nav and Routes components
 - declares state which will be passed down to child props (token, currentUser)

 Functions to be passed as props: 
 --> signup() [passed to Routes --> SignUpForm component] 
 --> login()  [passed to Routes --> LoginForm component]
 --> logout() [passed to Nav]

Use useEffect to call the backend to get information on the newly-logged-in-user and store it in currentUser state whenever the state of token changes. 

 */

// Key name for storing token in localStorage for "remember me" re-login
export const TOKEN_STORAGE_ID = 'igClone-token';

function App() {
	const [token, setToken] = useLocalStorage(null);
	const [currentUser, setCurrentUser] = useState(null);
	const [isLoading, setIsLoading] = useState(TOKEN_STORAGE_ID);
	const [likeIds, setLikeIds] = useState(new Set([]));
	// utilized to save state for posts a user has liked. Use a Set because we don't want to be able to like one post more than once.
	const [followIds, setFollowIds] = useState(new Set([]));
	// utilized to save state for users a user follows.

	console.log('FollowIds', followIds);
	console.log('LikeIds', likeIds);
	console.log(
		'App',
		'isLoading=',
		isLoading,
		'currentUser=',
		currentUser,
		'token=',
		token
	);

	useEffect(
		function loadInfo() {
			console.debug('App useEffect loadUserInfo', 'token=', token);

			async function getCurrentUser() {
				if (token) {
					try {
						let { username } = jwt.decode(token);

						// place token on API class so it ca be used to call the API
						igCloneApi.token = token;
						let currentUser = await igCloneApi.getCurrentUser(username);
						setCurrentUser(currentUser);
						setLikeIds(new Set(currentUser.likes));
						setFollowIds(new Set(currentUser.following));
					} catch (err) {
						console.error(err);
						console.error('App loadUserInfo: problem loading', err);
						setCurrentUser(null);
					}
				}
				setIsLoading(false);
			}
			setIsLoading(true);
			getCurrentUser();
		},
		[token]
	);

	/** *********************************************************** */
	// USER AUTHENTICATION
	/** *********************************************************** */

	/* handles signup */
	async function signup(data) {
		try {
			let token = await igCloneApi.signup(data);
			setToken(token);
			return { success: true };
		} catch (err) {
			console.error('signup failed', err);
			return { success: false, err };
		}
	}

	/* handles login */
	async function login(data) {
		try {
			let token = await igCloneApi.login(data);
			setToken(token);
			return { success: true };
		} catch (err) {
			console.error('login failed', err);
			return { success: false, err };
		}
	}

	/* handles logout */
	async function logout() {
		setCurrentUser(null);
		setToken(null);
	}

	if (isLoading) {
		return <p>Loading &hellip;</p>;
	}

	/** *********************************************************** */
	// Like/Unlike a Post
	/** *********************************************************** */
	function hasLikedPost(id) {
		// console.log(id);
		// console.log(likeIds);
		return likeIds.has(+id);
	}

	async function likePost(id) {
		// first check if the post has been liked
		if (hasLikedPost(+id)) return;

		// if not, like the post.
		await igCloneApi.likePost(currentUser.username, id);
		setLikeIds(new Set([...likeIds, +id]));
		// console.log(likeIds);
		// console.log(id);
		// creates a new set with the current data and the new post id added
	}

	async function unlikePost(id) {
		await igCloneApi.unlikePost(currentUser.username, id);
		likeIds.delete(+id);
		// console.log(likeIds);
		// console.log(id);
	}

	/** *********************************************************** */
	// Follow/Unfollow a User
	/** *********************************************************** */
	function hasFollowedUser(id) {
		// console.log(followIds);
		return followIds.has(+id);
	}

	async function followUser(id) {
		if (hasFollowedUser(+id)) return;

		await igCloneApi.followUser(currentUser.username, id);
		setFollowIds(new Set([...followIds, +id]));
		// console.log(followIds);
	}

	async function unfollowUser(id) {
		await igCloneApi.unfollowUser(currentUser.username, id);
		followIds.delete(+id);
		// console.log(followIds);
	}

	/** *********************************************************** */
	// Format Date String for datePosted (posts)
	/** *********************************************************** */

	function formatDate(dateString) {
		const options = { year: 'numeric', month: 'long', day: 'numeric' };
		return new Date(dateString).toLocaleDateString(undefined, options);
	}

	return (
		<div className="App">
			<BrowserRouter>
				<UserContext.Provider
					value={{
						currentUser,
						setCurrentUser,
						likePost,
						unlikePost,
						hasLikedPost,
						formatDate,
						hasFollowedUser,
						followUser,
						unfollowUser,
					}}
				>
					<div>
						<Nav logout={logout} />
						<Routes login={login} signup={signup} />
						<Footer />
					</div>
				</UserContext.Provider>
			</BrowserRouter>
		</div>
	);
}

export default App;
