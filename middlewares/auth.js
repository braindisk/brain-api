import jwt from 'jsonwebtoken';

export default function (req, res, next) {
  try {
    const authorization = req.headers.authorization;
    const bits = authorization.split(' ');
    if (bits.length === 2) {
      if (bits[0] === 'Bearer') {
        let token = bits[1];
        const decoded = jwt.verify(token, Bun.env.JWT_PVT_KEY);
        req.user = decoded;
        next();
      }
    } else {
      res.status(401).json({ message: 'invalid token bits' });
    }
  } catch (error) {
    res.status(400).json({ message: error.data });
  }
}
