import jwt from 'jsonwebtoken';

export function authenticationMiddleware(request, response, next) {
  const HTTPMethod = request.method;
  const URL = request.url;
  const token = request.headers.authorization;

  if (!token) {
    console.log(
      `${HTTPMethod} | ${URL} at ${new Date().toUTCString()}: No token provided.`
    );

    return response.status(401).json({
      status: 'fail',
      message: 'Invalid request.',
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
    if (error) {
      console.log(
        `${HTTPMethod} | ${URL} at ${new Date().toUTCString()}: Invalid token.`
      );

      return response.status(401).json({
        status: 'fail',
        message: 'Invalid request.',
      });
    }

    request.userId = decoded.id;

    next();
  });
}
