const db = require('../config/db');
const { createTokenPair } = require('../services/token.service');

/**
 * Redirect to Google OAuth
 */
const googleAuth = (req, res) => {
  const redirectUrl =
    `https://accounts.google.com/o/oauth2/v2/auth` +
    `?client_id=${process.env.GOOGLE_CLIENT_ID}` +
    `&redirect_uri=http://localhost:8080/api/auth/google/callback` +
    `&response_type=code&scope=email profile`;

  res.redirect(302, redirectUrl);
};

/**
 * Redirect to GitHub OAuth
 */
const githubAuth = (req, res) => {
  const redirectUrl =
    `https://github.com/login/oauth/authorize` +
    `?client_id=${process.env.GITHUB_CLIENT_ID}` +
    `&redirect_uri=http://localhost:8080/api/auth/github/callback`;

  res.redirect(302, redirectUrl);
};

/**
 * OAuth Callback (Google / GitHub)
 * NOTE: Partnr simulates provider data here
 */
const oauthCallback = async (req, res) => {
  try {
    // Simulated provider data (Partnr sends this)
    const { provider, provider_user_id, email, name } = req.query;

    if (!provider || !provider_user_id || !email) {
      return res.status(400).json({ message: 'Invalid OAuth callback data' });
    }

    // 1️⃣ Check if provider already linked
    const providerResult = await db.query(
      `SELECT users.id, users.email, users.role
       FROM auth_providers
       JOIN users ON users.id = auth_providers.user_id
       WHERE auth_providers.provider = $1
       AND auth_providers.provider_user_id = $2`,
      [provider, provider_user_id]
    );

    let user;

    if (providerResult.rows.length > 0) {
      user = providerResult.rows[0];
    } else {
      // 2️⃣ Check if user exists by email
      const userResult = await db.query(
        'SELECT id, email, role FROM users WHERE email = $1',
        [email]
      );

      if (userResult.rows.length > 0) {
        user = userResult.rows[0];
      } else {
        // 3️⃣ Create new user
        const newUser = await db.query(
          `INSERT INTO users (name, email)
           VALUES ($1, $2)
           RETURNING id, email, role`,
          [name || 'OAuth User', email]
        );
        user = newUser.rows[0];
      }

      // 4️⃣ Link auth provider
      await db.query(
        `INSERT INTO auth_providers (user_id, provider, provider_user_id)
         VALUES ($1, $2, $3)
         ON CONFLICT DO NOTHING`,
        [user.id, provider, provider_user_id]
      );
    }

    // 5️⃣ Issue tokens
    const tokens = createTokenPair(user);
    return res.status(200).json(tokens);

  } catch (error) {
    console.error('OAuth callback error:', error);
    return res.status(500).json({ message: 'OAuth login failed' });
  }
};

module.exports = {
  googleAuth,
  githubAuth,
  oauthCallback,
};
