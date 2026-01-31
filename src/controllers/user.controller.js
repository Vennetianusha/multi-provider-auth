const db = require('../config/db');

/**
 * GET /api/users/me
 */
const getMe = async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await db.query(
      'SELECT id, name, email, role FROM users WHERE id = $1',
      [userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    return res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Get profile error:', error);
    return res.status(500).json({
      message: 'Internal server error',
    });
  }
};

/**
 * GET /api/users (Admin only)
 */
const listUsers = async (req, res) => {
  try {
    const result = await db.query(
      'SELECT id, name, email, role FROM users ORDER BY created_at DESC'
    );

    return res.status(200).json(result.rows);
  } catch (error) {
    console.error('List users error:', error);
    return res.status(500).json({
      message: 'Internal server error',
    });
  }
};

module.exports = {
  getMe,
  listUsers,
};
