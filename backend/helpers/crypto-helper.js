
const crypto = require("crypto");

function hash(plainText) {
    if(!plainText) return null;
    const salt = "MakeThingsGoRight22"
    return crypto.createHmac("sha512", salt).update(plainText).digest("hex");
}

module.exports = {
    hash
};