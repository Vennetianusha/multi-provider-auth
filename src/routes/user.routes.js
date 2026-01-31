const express = require('express');
const { getMe, listUsers } = require('../controllers/user.controller');
const { authenticate } = require('../middleware/auth.middleware');
const { requireRole } = require('../middleware/rbac.middleware');

const router = express.Router();

/* Profile */
router.get('/me', authenticate, getMe);

/* Admin-only: list all users */
router.get('/', authenticate, requireRole('admin'), listUsers);

module.exports = router;
