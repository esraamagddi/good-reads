const util = require("util");
const jwt = require("jsonwebtoken");
const { accessDeniedError } = require("../lib/customError");
const { loginID } = require("../middlewares/globalPriv");
const verifyAsync = util.promisify(jwt.verify);

exports.authorizeUser = async (req, res, next) => {
    const { token } = req.headers;
    const id = await loginID(req, res);
    try {
        const payload = await verifyAsync(token, process.env.SECRET_KEY);
        
        if (id !== payload.id || payload.admin === true) throw accessDeniedError;
    } catch (error) {
        next(accessDeniedError);
    }
    next();
};
