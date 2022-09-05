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
			`SELECT id,
                  image_file AS "imageFile",
                  caption,
                  date_posted AS "datePosted",
                  user_id AS "userId"
           FROM posts
           ORDER BY date_posted`
		);

		return result.rows;
	}

	/** Given a post id, return data about post.
	 *
	 * Returns { id, image_file, caption, date_posted, user_id }
	 *
	 * Throws NotFoundError if not found.
	 **/

	static async get(id) {
		const postResult = await db.query(
			`SELECT id,
                  image_file AS "imageFile",
                  caption,
                  date_posted AS "datePosted",
                  user_id AS "userId"
           	FROM posts
           	WHERE id = $1`,
			[id]
		);

		const post = postResult.rows[0];

		if (!post) throw new NotFoundError(`No post with id: ${id}`);

		return post;
	}

	/** Delete given post from database; returns undefined.
	 *
	 * Throws NotFoundError if post not found.
	 **/

	static async remove(id) {
		const result = await db.query(
			`Delete
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
}

module.exports = Post;
