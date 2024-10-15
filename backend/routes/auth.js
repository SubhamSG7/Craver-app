const jwt = require("jsonwebtoken");
const Admin = require("../models/admin");
const Staff = require("../models/staff");
const User = require("../models/user");
const checkAuthorisedRoute=require("../controllers/checkAuthorisedRoute")
const checkScope = () => {
  return async (req, res, next) => {
    const { accessPath } = req.query;
    const {role}=req.params;
    let check=checkAuthorisedRoute(accessPath,role)
    if(check===false){
      return res
      .status(403)
      .json({ message: "Not Authorised User For This Page." });
    }
    const token =
      req.cookies.token || req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }
    try {
      const decoded = jwt.verify(token, process.env.tokenSecret);

      if (!decoded.scope || decoded.scope !== role) {
        return res
          .status(403)
          .json({ message: "Access denied. Insufficient scope." });
      }
      let user;
      
      switch (role) {
        case "admin":
          user = await Admin.findById(decoded.id);
          break;
        case "staff":
          user = await Staff.findById(decoded.id);
          break;
        case "user":
          user = await User.findById(decoded.id);
          break;
        default:
          return res.status(403).json({ message: "Invalid role." });
      }

      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }

      req.user = { ...decoded, name: user.name, email: user.email };
      next();
    } catch (error) {
      console.error("Token verification error:", error);
      return res.status(403).json({ message: "Invalid or expired token" });
    }
  };
};

module.exports = checkScope;
