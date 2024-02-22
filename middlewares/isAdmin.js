
const isAdmin = (req, res, next) => {
    if (!req.user || !req.user.isAdmin) {
      return res.status(403).send({ message: "You are not authorized to perform this action" });
    }
    next(); 
  };
  
  module.exports = isAdmin;
  