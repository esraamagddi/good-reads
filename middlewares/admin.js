const util = require("util");
const jwt = require("jsonwebtoken");
const { accessDeniedError } = require("../lib/customError");

const verifyAsync = util.promisify(jwt.verify);

exports.authorizeAdmin = async (req, res, next) => {
    const { token } = req.headers;
    const { id } = req.params;
    try {
        const payload = await verifyAsync(token, process.env.SECRET_KEY);
        if (id !== payload.id || payload.admin === false) throw accessDeniedError;
    } catch (error) {
        next(accessDeniedError);
    }
    next();
};
