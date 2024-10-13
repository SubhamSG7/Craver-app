const checkScope = (requiredScope) => {
  return (req, res, next) => {
    console.log(req?.cookies);
    const token =
      req.cookies.token || req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    try {
      const decoded = jwt.verify(token, process.env.tokenSecret);

      if (!decoded.scope || decoded.scope !== requiredScope) {
        return res
          .status(403)
          .json({ message: "Access denied. Insufficient scope." });
      }

      req.user = decoded;
      next();
    } catch (error) {
      return res.status(403).json({ message: "Invalid or expired token" });
    }
  };
};
module.exports = checkScope;
