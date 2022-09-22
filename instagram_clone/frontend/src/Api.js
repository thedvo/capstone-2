import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:3001';

/** API Class.
 *
 * Static class tying together methods used to get/send to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class igCloneApi {
	// the token for interacting with the API will be stored here.
	static token;

	static async request(endpoint, data = {}, method = 'get') {
		console.log('API Call:', endpoint, data, method);

		//there are multiple ways to pass an authorization token, this is how you pass it in the header.
		const url = `${BASE_URL}/${endpoint}`;
		const headers = { Authorization: `Bearer ${igCloneApi.token}` };
		const params = method === 'get' ? data : {};

		try {
			return (await axios({ url, method, data, params, headers })).data;
		} catch (err) {
			console.error('API Error:', err.response);
			let message = err.response.data.error.message;
			throw Array.isArray(message) ? message : [message];
		}
	}

	/**************************************************************************** */
	// Individual API routes
	/**************************************************************************** */

	/** AUTH ROUTES ***************************************************************/

	/** Get token for login from (username, password) */
	static async login(data) {
		let res = await this.request('auth/token', data, 'post');
		return res.token;
	}

	/** Sign Up */
	static async signup(data) {
		let res = await this.request('auth/register', data, 'post');
		return res.token;
	}

	/** USER ROUTES ***************************************************************/

	/** Get the current user.*/
	static async getCurrentUser(username) {
		let res = await this.request(`user/${username}`);
		return res.user;
	}

	/** Get all users  */
	static async getAllUsers() {
		let res = await this.request(`user`);
		return res.users;
	}

	/** Get a user's likes */
	static async getLikes(username) {
		let res = await this.request(`user/${username}/likes`);
		return res.likes;
	}

	/** Get a user's followers */
	static async getFollowers(username) {
		let res = await this.request(`user/${username}/followers`);
		return res.followers;
	}

	/** Get a user's following */
	static async getFollowing(username) {
		let res = await this.request(`user/${username}/following`);
		return res.following;
	}

	/** Follow a user */
	static async followUser(username, userFollowed) {
		let res = await this.request(
			`user/${username}/follow/${userFollowed}`,
			{},
			'post'
		);
		return res;
	}

	/** Unfollow a user */
	static async unfollowUser(username, userFollowed) {
		let res = await this.request(
			`user/${username}/unfollow/${userFollowed}`,
			{},
			'delete'
		);
		return res;
	}

	/** Save updates to user profile */
	static async saveProfile(username, data) {
		let res = await this.request(`user/${username}/edit`, data, 'patch');
		return res.user;
	}

	/** Delete a user */
	static async deleteUser(username) {
		let res = await this.request(`user/${username}`, {}, 'delete');
		return res;
	}

	/** POST ROUTES ***************************************************************/

	/** Create a post */
	static async createPost(username, data) {
		let res = await this.request(`post/${username}/create`, data, 'post');
		return res.post;
	}

	/** Get list of all posts */
	static async getPosts() {
		let res = await this.request('post');
		return res.posts;
	}

	/** Get a post */

	static async getPost(postId) {
		let res = await this.request(`post/${postId}`);
		return res.post;
	}

	/** Get a post's likes */
	static async getPostLikes(postId) {
		let res = await this.request(`post/${postId}/likes`);
		return res.likes;
	}

	/** Like a post */
	static async likePost(username, postId) {
		let res = await this.request(`post/${postId}/${username}/like`, {}, 'post');
		return res.like;
	}

	/** Unlike a post */
	static async unlikePost(username, postId) {
		let res = await this.request(
			`post/${postId}/${username}/unlike`,
			{},
			'delete'
		);
		return res;
	}

	/** Add a comment */
	static async addComment(postId, username, data) {
		let res = await this.request(
			`post/${postId}/${username}/comment`,
			data,
			'post'
		);
		return res.comment;
	}

	/** Delete a comment */
	static async deleteComment(postId, username, commentId) {
		let res = await this.request(
			`post/${postId}/${username}/comment/${commentId}`,
			{},
			'delete'
		);
		return res;
	}

	/** Delete a post */
	static async deletePost(postId, username) {
		let res = await this.request(`post/${postId}/${username}`, {}, 'delete');
		return res;
	}
}

export default igCloneApi;
