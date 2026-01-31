const express = require('express');

const {
  register,
  login,
  refreshToken,
} = require('../controllers/auth.controller');

const {
  googleAuth,
  githubAuth,
  oauthCallback,
} = require('../controllers/oauth.controller');

const { authRateLimiter } = require('../middleware/rateLimiter.middleware');

const router = express.Router();

/* -------------------- LOCAL AUTH (RATE LIMITED) -------------------- */
router.post('/register', authRateLimiter, register);
router.post('/login', authRateLimiter, login);

/* -------------------- TOKEN REFRESH -------------------- */
router.post('/refresh', refreshToken);

/* -------------------- OAUTH REDIRECTS -------------------- */
router.get('/google', googleAuth);
router.get('/github', githubAuth);

/* -------------------- OAUTH CALLBACKS -------------------- */
router.get('/google/callback', (req, res) =>
  oauthCallback(
    { ...req, query: { ...req.query, provider: 'google' } },
    res
  )
);

router.get('/github/callback', (req, res) =>
  oauthCallback(
    { ...req, query: { ...req.query, provider: 'github' } },
    res
  )
);

module.exports = router;
