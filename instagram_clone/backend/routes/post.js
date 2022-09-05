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
 *  Like/Unlike a post
 */

router.post('/:id/like', async function (req, res, next) {
	try {
	} catch (err) {
		return next(err);
	}
});

/** POST / [/:post_id/comment/]
 *  Comment on a post
 */

router.post('/:id/comment', async function (req, res, next) {
	try {
	} catch (err) {
		return next(err);
	}
});

/** POST / [/:post_id/comment/delete]
 *  Delete a comment on a post
 */

router.delete('/:id/comment/:comment_id', async function (req, res, next) {
	try {
		await Post.removeComment(req.params.id, req.params.comment_id);
		return res.json({ deleted: +req.params.comment_id });
	} catch (err) {
		return next(err);
	}
});

module.exports = router;
