const jwt = require("jsonwebtoken");

function getNewToken(payload) {
    return jwt.sign({ payload }, config.jwtKey, { expiresIn: "30m" });
}

module.exports = {
    getNewToken
};