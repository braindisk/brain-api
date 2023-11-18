import jwt from 'jsonwebtoken';

export default function (user) {
  const payload = {
    _id: user._id,
    iat: Date.now(),
    expireIn: '24h',
  };

  const options = {
    subject: 'user',
    issuer: 'brain-api',
    audience: 'api-brain',
  };

  return jwt.sign(payload, Bun.env.JWT_PVT_KEY, options);
}
