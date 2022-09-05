const express = require('express');
const { BadRequestError } = require('../expressError');
const { ensureLoggedIn, verifyUserOrAdmin } = require('../middleware/auth');

const Post = require('../models/post');

const jsonschema = require('jsonschema');
const postNewSchema = require('../schemas/postNew.json');
const router = express.Router();

/** Get all posts
 * Authorization Required: None
 */

router.get('/', async function (req, res, next) {
	try {
		const posts = await Post.findAll();
		return res.json({ posts });
	} catch (err) {
		return next(err);
	}
});

/** Get an individual post
 * Authorization Required: Admin
 *
 * */
router.get('/:id', async function (req, res, next) {
	try {
		const post = await Post.get(req.params.id);
		return res.json({ post });
	} catch (err) {
		return next(err);
	}
});

/** Delete a post
 * Authorization Required: Admin or Current User
 *
 *  */
router.delete('/:id', async function (req, res, next) {
	try {
		await Post.remove(req.params.id);
		return res.json({ deleted: +req.params.id });
	} catch (err) {
		return next(err);
	}
});

/** POST / [/:post_id/like/]
 *  Like a post
 */

/** POST / [/:post_id/unlike/]
 *  Unlike a post
 */

/** POST / [/:post_id/comment/]
 *  Comment on a post
 */

/** POST / [/:post_id/comment/delete]
 *  Delete a comment on a post
 */

module.exports = router;

// /** Create a post
//  * Authorization Required: Current logged in user
//  * Post should return { id, image_file, caption, date_posted, user_id }
//  * */
// router.post('/', async function (req, res, next) {
// 	try {
// 		const validator = jsonschema.validate(req.body, postNewSchema);
// 		if (!validator.valid) {
// 			const errs = validator.errors.map((e) => e.stack);
// 			throw new BadRequestError(errs);
// 		}
// 		// const user = res.locals.user;
// 		// const userId = user.userId;
// 		// const post = await Post.create(req.body, userId);
// 		const post = await Post.create(req.body);
// 		return res.status(201).json({ post });
// 	} catch (err) {
// 		return next(err);
// 	}
// });
