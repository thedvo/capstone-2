const express = require('express');
const { BadRequestError } = require('../expressError');
const { ensureLoggedIn, verifyUserOrAdmin } = require('../middleware/auth');

const Post = require('../models/post');

const jsonschema = require('jsonschema');
const postNewSchema = require('../schemas/postNew.json');
const commentNewSchema = require('../schemas/commentNew.json');
const router = express.Router();

/** Create a new post
 * Utilized user_id in parameter to create post linked to current user
 * Authorization required: login
 */
router.post('/:username/create', async function (req, res, next) {
	try {
		const validator = jsonschema.validate(req.body, postNewSchema);
		if (!validator.valid) {
			const errs = validator.errors.map((e) => e.stack);
			throw new BadRequestError(errs);
		}
		const username = req.params.username;
		const post = await Post.create(req.body, username);
		// const post = await Post.create(req.body);
		return res.status(201).json({ post });
	} catch (err) {
		return next(err);
	}
});

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
		return res.json({ deleted_post: +req.params.id });
	} catch (err) {
		return next(err);
	}
});

/** POST / [/:post_id/like/]
 *  Like a post
 */

router.post('/:id/:username/like', async function (req, res, next) {
	try {
		const user = req.params.username;
		const post = req.params.id;

		const like = await Post.addLike(user, post);
		return res.json({ like });
	} catch (err) {
		return next(err);
	}
});

/** DELETE / [/:post_id/unlike/]
 *  Unike a post
 */

router.delete('/:id/:username/unlike', async function (req, res, next) {
	try {
		const user = req.params.username;
		const post = req.params.id;

		await Post.removeLike(user, post);
		return res.json({ unliked_post: +post });
	} catch (err) {
		return next(err);
	}
});

/** POST / [/:post_id/comment/]
 *  Comment on a post
 */

router.post('/:id/:username/comment', async function (req, res, next) {
	try {
		const validator = jsonschema.validate(req.body, commentNewSchema);
		if (!validator.valid) {
			const errs = validator.errors.map((e) => e.stack);
			throw new BadRequestError(errs);
		}
		const user = req.params.username;
		const post = req.params.id;
		const data = req.body;

		const comment = await Post.addComment(user, post, data);
		return res.status(201).json({ comment });
	} catch (err) {
		return next(err);
	}
});

/** DELETE / [/:post_id/comment/:comment_id]
 *  Delete a comment on a post
 */

router.delete('/:id/comment/:comment_id', async function (req, res, next) {
	try {
		const post = req.params.id;
		const comment = req.params.comment_id;

		await Post.removeComment(post, comment);
		return res.json({ deleted: +req.params.comment_id });
	} catch (err) {
		return next(err);
	}
});

module.exports = router;
