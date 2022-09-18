import React, { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';

import './App.css';

import igCloneApi from './Api';
import Nav from './routes/Nav';
import Routes from './routes/Routes';
import jwt from 'jsonwebtoken';
import UserContext from './UserContext';
import useLocalStorage from './hooks/useLocalStorage';

/**
 - App component (top of hierarchy) renders Nav and Routes components
 - declares state which will be passed down to child props (token, currentUser)

 Functions to be passed as props: 
 --> signup() [passed to Routes --> SignUpForm component] 
 --> login()  [passed to Routes --> LoginForm component]
 --> logout() [passed to Nav]

Use useEffect to call the backend to get information on the newly-logged-in-user and stire it in currentUser state whenever the state of token changes. 

 */

// Key name for storing token in localStorage for "remember me" re-login
export const TOKEN_STORAGE_ID = 'igClone-token';

function App() {
	const [token, setToken] = useLocalStorage(null);
	const [currentUser, setCurrentUser] = useState(null);
	const [isLoading, setIsLoading] = useState(TOKEN_STORAGE_ID);
	const [likeIds, setLikeIds] = useState(new Set([]));
	// utilized to save state for posts a user has liked. Use a Set because we don't want to be able to like a post more than once.

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

	function hasLikedPost(id) {
		return likeIds.has(id);
	}

	function likePost(id) {
		// first check if the post has been liked
		if (hasLikedPost(id)) return;

		// if not, like the post.
		igCloneApi.likePost(currentUser.username, id);
		setLikeIds(new Set([...likeIds, id]));
		// creates a new set with the current data and the new post id added
	}

	function unlikePost(id) {
		igCloneApi.unlikePost(currentUser.username, id);
		likeIds.delete(id);
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
					}}
				>
					<div>
						<Nav logout={logout} />
						<Routes login={login} signup={signup} />
					</div>
				</UserContext.Provider>
			</BrowserRouter>
		</div>
	);
}

export default App;
