const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateTokenHandler = expressAsyncHandler(async (req, res, next) => {
    let token;
    const authHeader = req.headers.authorization || req.headers.Authentication;
    if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                res.status(401);
                throw new Error("Credentials are invalid!");
            }
            req.user = decoded.user;
            next();
        });
    } else {
        res.status(401);
        throw new Error("Credentials are invalid");
    }
});

module.exports = validateTokenHandler;
