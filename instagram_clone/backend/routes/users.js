/** Routes for Users */
const express = require('express');
const jsonschema = require('jsonschema');

const { ensureLoggedIn } = require('../middleware/auth');
const { BadRequestError } = require('../expressError');
const { createToken } = require('../helpers/token');

const User = require('../models/user');
const userUpdateSchema = require('../schemas/userUpdate.json');

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

/** GET / [:username/likes]
 *  Links to a user's likes
 */

/** GET / [:username/following]
 *  Shows list of current user's following
 */

/** GET / [:username/followers]
 *  Shows list of current user's followers
 */

// follow user
// unfollow user

// like photo
// unlike photo

// make comment
// delete comment

module.exports = router;
