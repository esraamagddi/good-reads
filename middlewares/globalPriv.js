const util = require("util");
const jwt = require("jsonwebtoken");
const { accessDeniedError } = require("../lib/customError");
const verifyAsync = util.promisify(jwt.verify);


const authorizeAdminsPriv = async (req, res, next) => {
    const { token } = req.headers;
    try {
        const payload = await verifyAsync(token, process.env.SECRET_KEY);
        if (payload.admin === false) throw accessDeniedError;
    } catch (error) {
        next(accessDeniedError);
    }
    next();
};

async function loginID(req, res) {
    try {
        const { token } = req.headers;
        const payload = await verifyAsync(token, process.env.SECRET_KEY);
        return payload.id;
    } catch (error) {
        console.log(error)
    }
};
module.exports = {  authorizeAdminsPriv, loginID }
