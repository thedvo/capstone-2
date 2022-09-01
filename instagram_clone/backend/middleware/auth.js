/**
 * Middleware is useful for:
 *  - ensuring users are authenticated
 *  - ensuring that a user is authorized to access an endpoint
 */

const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config');
const { UnauthorizedError } = require('../expressError');
