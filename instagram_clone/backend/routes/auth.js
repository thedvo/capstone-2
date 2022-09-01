/** Routes for Authentication */

const express = require('express');
const jsonschema = require('jsonschema');

// import schema for login + signup
// import bad request error from expressError
// import helper function for creating a token from helpers
// import User model

const router = new express.Router();

/**
 * POST /auth/token: {username, password } => {token}
 *
 * Returns JWT token which can be used to authenticate requests
 * Authorization required: none
 */
router.post('/token', async function (req, res, next) {
	try {
		const validator = jsonschema.validate(req.body, userAuthSchema);
		if (!validator.valid) {
			const errs = validator.errors.map((e) => e.stack);
			throw new BadRequestError(errs);
		}
		const { username, password } = req.body;
		const user = await User.authenticate(username, password);
		const token = createToken(user);
		return res.json({ token });
	} catch (err) {
		return next(err);
	}
});

/** POST /auth/register: { user } => { token }
 *
 * User must include { username, password, firstName, lastName, email }
 *
 * Returns JWT token which can be used to authenticate further requests.
 * Authorization required: none
 */

router.post('/register', async function (req, res, next) {
	try {
		const validator = jsonschema.validate(req.body, userRegisterSchema);
		if (!validator.valid) {
			const errs = validator.errors.map((e) => e.stack);
			throw new BadRequestError(errs);
		}

		const newUser = await User.register({ ...req.body, isAdmin: false });
		const token = createToken(newUser);
		return res.status(201).json({ token });
	} catch (err) {
		return next(err);
	}
});

module.exports = router;
