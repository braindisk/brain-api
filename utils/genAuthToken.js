import jwt from 'jsonwebtoken';

export default function (user) {
  const payload = {
    _id: user._id,
    iat: new Date.getTime(),
  };

  const options = {
    subject: user,
    expireIn: '24h',
    issuer: 'brain-api',
    audience: 'api-brain',
  };

  return jwt.sign(payload, Bun.env.JWT_PVT_KEY, options);
}
