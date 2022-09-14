import React, {useContext } from 'react';
import {Link, useHistory} from 'react-router-dom'

import UserContext from '../UserContext';

import 'bootstrap/dist/css/bootstrap.min.css';
import Avatar from '@material-ui/core/Avatar';

const CommentDetail ({postId, commentId, comment}) => {
    const {currentUser} = useContext(UserContext);
    const history = useHistory();


	// handles event for deleting a comment
	async function handleDeleteComment(e) {
		e.preventDefault();
		await igCloneApi.deleteComment(id, currentUser.username, comment.id);
		history.push(`/posts/${id}`);
		console.log('Successfully deleted comment.');
	}

    // only shows delete button if the comment is by the currentUser
	function commentByCurrentUser() {
		return (
			<div>
				<form onSubmit={handleDeleteComment}>
					<button className="btn btn-danger">Delete</button>
				</form>
			</div>
		);
	}

 return (
 <div>

 </div>)
}

export default CommentDetail;