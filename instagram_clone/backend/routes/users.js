/** Routes for Users */
const express = require('express');

const { ensureLoggedIn } = require('../middleware/auth');
const { BadRequestError } = require('../expressError');
const { createToken } = require('../helpers/token');

const User = require('../models/user');
const Post = require('../models/post');

const jsonschema = require('jsonschema');
const userUpdateSchema = require('../schemas/userUpdate.json');
const postNewSchema = require('../schemas/postNew.json');

const router = new express.Router();

/** GET / => { users: [ {username, firstName, lastName, email }, ... ] }
 *
 * Returns list of all users.
 *
 * Authorization required: login
 **/

router.get('/', async function (req, res, next) {
	try {
		const users = await User.findAll();
		return res.json({ users });
	} catch (err) {
		return next(err);
	}
});

/** GET /[username] => { user }
 *
 * Returns { username, firstName, lastName, profileImage, bio, posts, likes, followers, following}
 *
 * Authorization required: login
 **/
// *****************remember to add back ensureLoggedIn!!!*************************
router.get('/:username', async function (req, res, next) {
	try {
		const user = await User.get(req.params.username);
		return res.json({ user });
	} catch (err) {
		return next(err);
	}
});

/** PATCH /[username] { user } => { user }
 *
 * Data can include:
 *   { firstName, lastName, password, email }
 *
 * Returns { username, firstName, lastName, email, isAdmin }
 *
 * Authorization required: login
 **/

// add verifyUserorAdmin
router.patch('/:username', async function (req, res, next) {
	try {
		const validator = jsonschema.validate(req.body, userUpdateSchema);
		if (!validator.valid) {
			const errs = validator.errors.map((e) => e.stack);
			throw new BadRequestError(errs);
		}

		// update method can be found in user.js
		const user = await User.update(req.params.username, req.body);
		return res.json({ user });
	} catch (err) {
		return next(err);
	}
});

/** DELETE /[username]  =>  { deleted: username }
 *
 * Authorization required: login
 **/

// add ensureLoggedIn + verifyUser
router.delete('/:username', async function (req, res, next) {
	try {
		await User.remove(req.params.username);
		return res.json({ deleted: req.params.username });
	} catch (err) {
		return next(err);
	}
});

/** Create a new post
 * Utilized user_id in parameter to create post linked to current user
 * Authorization required: login
 */
router.post('/:username/create-post', async function (req, res, next) {
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

/** GET / [:username/likes]
 *  Links to a user's likes
 */

router.get('/:username/likes', async function (req, res, next) {
	try {
		const username = req.params.username;
		const likes = await User.getUserLikes(username);
		return res.json({ likes });
	} catch (err) {
		return next(err);
	}
});

/** GET / [:username/following]
 *  Shows list of current user's following
 */

router.get('/:username/following', async function (req, res, next) {
	try {
		const username = req.params.username;
		const following = await User.getUserFollowing(username);
		return res.json({ following });
	} catch (err) {
		return next(err);
	}
});

/** GET / [:username/followers]
 *  Shows list of current user's followers
 */

router.get('/:username/followers', async function (req, res, next) {
	try {
		const username = req.params.username;
		const followers = await User.getUserFollowers(username);
		return res.json({ followers });
	} catch (err) {
		return next(err);
	}
});

/** POST / [/follow/:follow-id]
 * Follow a user
 * */

router.post('/:username/follow/:id', async function (req, res, next) {
	try {
		const currentUser = req.params.username;
		const userFollowed = req.params.id;

		const follow = await User.followUser(currentUser, userFollowed);

		return res.json({ followed: +req.params.id });
	} catch (err) {
		return next(err);
	}
});

/** POST / [/unfollow/:follow-id]
 * Unfollow a user
 * */

router.post('/:username/unfollow/:id', async function (req, res, next) {
	try {
		const currentUser = req.params.username;
		const userUnfollowed = req.params.id;

		const unfollow = await User.unfollowUser(currentUser, userUnfollowed);

		return res.json({ unfollowed: +req.params.id });
	} catch (err) {
		return next(err);
	}
});

module.exports = router;
