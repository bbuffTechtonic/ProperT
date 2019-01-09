import { verifyJWTToken } from './libs/auth';

export function verifyJWT_MW(req, res, next)
{
  // (req.method === 'POST'); we could check method
  let token = req.headers['x-access-token'];
  // console.log(token);

  verifyJWTToken(token)
    .then((decodedToken) =>
    {
      req.user = decodedToken.data;
      // console.log(req.user);
      next();
    })
    .catch((err) =>
    {
      res.status(400)
        .json({auth: false, token: null, message: "Invalid auth token provided."});
    });
};