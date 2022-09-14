import React from 'react';
import PostCard from './PostCard';
import 'bootstrap/dist/css/bootstrap.min.css';

// this component maps out the posts into a list of cards
const PostCardList = ({ posts }) => {
	console.log('PostCardList', 'posts=', posts);

	return (
		<div className="PostCardList">
			{posts.map((post) => (
				<PostCard
					key={post.id}
					id={post.id}
					postImage={post.imageFile}
					caption={post.caption}
					username={post.username}
					userProfImg={post.profileImage}
					datePosted={post.datePosted}
				/>
			))}
		</div>
	);
};

export default PostCardList;
