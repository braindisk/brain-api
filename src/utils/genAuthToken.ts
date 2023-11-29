import jwt from 'jsonwebtoken';

export default function (user: any) {
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

  const jwtPvtKey: string = process.env.JWT_PVT_KEY as string;
  return jwt.sign(payload, jwtPvtKey, options);
}
