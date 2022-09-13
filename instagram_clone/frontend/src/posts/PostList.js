import React, { useState, useEffect } from 'react';

import igCloneApi from '../Api';
import PostCardList from './PostCardList';

import 'bootstrap/dist/css/bootstrap.min.css';

/*
Maps through posts and for each individual post, render a PostCard component.
*/

const PostList = () => {
	const [posts, setPosts] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	// on mount, make a request to get all posts
	useEffect(function getPostsOnMount() {
		getAllPosts();
	}, []);

	// will be used to update Post state
	async function getAllPosts() {
		let posts = await igCloneApi.getPosts();
		setPosts(posts);
		setIsLoading(false);
	}

	if (isLoading) {
		return (
			<p className="Loading fw-bold text-info fs-1 text-center mt-4">
				Loading &hellip;
			</p>
		);
	}

	return (
		<div className="PostList col-md-8 offset-md-2">
			{posts.length ? (
				<PostCardList posts={posts} />
			) : (
				<p className="lead">Sorry, no results were found!</p>
			)}
		</div>
	);
};

export default PostList;
