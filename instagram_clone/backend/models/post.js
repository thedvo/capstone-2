const db = require('../db');
const { NotFoundError } = require('../expressError');

class Post {
	/** Create a post (from data), update db, return new post data.
	 *
	 * data should be { image_file, caption }
	 *
	 * Returns { id, imageFile, caption, datePosted, userId }
	 *
	 * */

	static async create(data, username) {
		const userResult = await db.query(
			`SELECT 
				id,
				username
			FROM users
			WHERE username = $1`,
			[username]
		);
		const userId = userResult.rows[0].id;

		const result = await db.query(
			`INSERT INTO posts (
	            image_file,
	            caption,
	            user_id)
	       VALUES ($1, $2, $3)
	       RETURNING id, image_file AS "imageFile", caption, date_posted AS "datePosted", user_id AS "userId"`,
			[data.image_file, data.caption, userId]
		);
		let post = result.rows[0];

		return post;
	}

	/** Find all posts.
	 *
	 * Order by date_posted (descending)
	 * Returns [{ id, imageFile, caption, datePosted, userId }]
	 * */

	static async findAll() {
		const result = await db.query(
			`SELECT p.id,
                  p.image_file AS "imageFile",
                  p.caption,
                  p.date_posted AS "datePosted",
                  p.user_id AS "userId",
				  u.username,
				  u.profile_image AS "profileImage"
           FROM posts AS P
		   LEFT JOIN users AS u
		   ON u.id = p.user_id
           ORDER BY p.date_posted`
		);

		const allPosts = result.rows;

		return allPosts;
	}

	/** Given a post id, return data about post.
	 *
	 * Returns { id, image_file, caption, date_posted, user_id }
	 *
	 * Throws NotFoundError if not found.
	 **/

	static async get(id) {
		const postResult = await db.query(
			`SELECT id AS postId,
		          image_file AS "imageFile",
		          caption,
		          date_posted AS "datePosted"
		   	FROM posts AS p
		   	WHERE p.id = $1`,
			[id]
		);

		const post = postResult.rows[0];
		if (!post) throw new NotFoundError(`No post with id: ${id}`);

		const userResult = await db.query(
			`SELECT 
			u.id,
			u.username,
			u.profile_image AS "profileImage"
			FROM users AS u
			LEFT JOIN posts AS p
			ON u.id = p.user_id
			WHERE p.id = $1
			`,
			[id]
		);

		post.user = userResult.rows;

		// query the post's likes
		const likesRes = await db.query(
			`SELECT
				l.user_id AS "userId",
				l.post_id AS "postId",
				u.username
			FROM likes AS l
			LEFT JOIN users AS u
			ON l.user_id = u.id
			WHERE l.post_id = $1`,
			[id]
		);

		post.likes = likesRes.rows;

		// query the post's comments
		const commentsRes = await db.query(
			`SELECT
				p.id AS "postId",
				c.id AS "commentId",
				c.comment
			FROM posts AS p
			LEFT JOIN comments AS c
			ON p.id = c.post_id
			WHERE p.id = $1`,
			[id]
		);

		post.comments = commentsRes.rows;

		return post;
	}

	/** Delete given post from database; returns undefined.
	 *
	 * Throws NotFoundError if post not found.
	 **/

	static async remove(id) {
		const result = await db.query(
			`DELETE
            FROM posts
            WHERE id = $1
            RETURNING id`,
			[id]
		);
		const post = result.rows[0];

		if (!post) {
			throw new NotFoundError(`No post with id: ${id}`);
		}
	}

	/** Add a Comment to a Post */
	static async addComment(user, post, data) {
		const userResult = await db.query(
			`
		SELECT
			id,
			username
		FROM users
		WHERE username = $1`,
			[user]
		);

		const userId = userResult.rows[0].id;

		const result = await db.query(
			`INSERT INTO comments (
				user_id,
				post_id,
				comment)
			VALUES ($1, $2, $3)
			RETURNING id, comment, user_id AS "userId", post_id AS "postId", date_posted AS "datePosted"`,
			[userId, post, data.comment]
		);

		let comment = result.rows[0];
		return comment;
	}

	/** Delete a Comment from a Post */
	static async removeComment(post, comment) {
		const result = await db.query(
			`DELETE FROM comments
			WHERE 
			post_id = $1
			AND id = $2
			RETURNING id
			`,
			[post, comment]
		);

		const deleted_comment = result.rows[0];
		if (!deleted_comment) {
			throw new NotFoundError(`No comment with id: ${comment}`);
		}
	}

	/** Like a Post */
	static async addLike(user, post) {
		const userResult = await db.query(
			`
		SELECT
			id,
			username
		FROM users
		WHERE username = $1`,
			[user]
		);

		const userId = userResult.rows[0].id;

		const result = await db.query(
			`INSERT INTO likes (
				user_id,
				post_id)
			VALUES ($1, $2)
			RETURNING user_id AS "userId", post_id AS "postId"`,
			[userId, post]
		);

		let like = result.rows[0];
		return like;
	}

	/** Unlike a Post */
	static async removeLike(user, post) {
		const userResult = await db.query(
			`
		SELECT
			id,
			username
		FROM users
		WHERE username = $1`,
			[user]
		);

		const userId = userResult.rows[0].id;

		const result = await db.query(
			`DELETE FROM likes
			WHERE 
			user_id = $1
			AND post_id = $2
			`,
			[userId, post]
		);
	}
}

module.exports = Post;
