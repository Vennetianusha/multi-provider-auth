const {
  generateAccessToken,
  generateRefreshToken,
} = require('../utils/jwt');

const createTokenPair = (user) => {
  const payload = {
    id: user.id,
    role: user.role,
    email: user.email,
  };

  return {
    accessToken: generateAccessToken(payload),
    refreshToken: generateRefreshToken(payload),
  };
};

module.exports = {
  createTokenPair,
};
