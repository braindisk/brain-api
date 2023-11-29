import { string } from 'joi';
import jwt from 'jsonwebtoken';

export default function (req: any, res: any, next: any) {
  try {
    const authorization = req.headers.authorization;

    const bits = authorization.split(' ');
    if (bits.length !== 2) return res.status(401).json({ message: 'invalid token bits' });

    if (bits[0] === 'Bearer') {
      let token = bits[1];
      const jwtPvtKey: string = process.env['JWT_PVT_KEY'] as string;
      const user = jwt.verify(token, jwtPvtKey);
      req.user = user;
      next();
    }
  } catch (error: any) {
    res.status(400).json({ message: error.data });
  }
}
