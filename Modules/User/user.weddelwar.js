import jwt from "jsonwebtoken";

export const auth = (requiredRole) => {
  return async (req, res, next) => {
    const { token } = req.headers;
    if (!token) return res.json({ message: "please signin" });

    jwt.verify(token, "secret_token", async (error, decoded) => {
      if (error)
        return res.status(498).json({ message: "Invalid Token", error });

      if (requiredRole && decoded.role !== requiredRole) {
        return res.status(403).json({ message: "Not enough privileges" });
      }
      req.user = decoded;
      next();
    });
  };
};
