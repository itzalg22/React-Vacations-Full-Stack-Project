const dal = require("../data-access-layer/dal");
const cryptoHelper = require("../helpers/crypto-helper");
const jwtHelper = require("../helpers/jwt-helper");
const svgCaptcha = require("svg-captcha")

async function registerAsync(user) {
    const { firstName, lastName, username, password } = user;
    if (firstName.length < 2) return {errorCode: 401, message: "First name too short."};
    if (lastName.length < 2) return {errorCode: 401, message: "Last name too short."};
    if (username.length < 4) return {errorCode: 401, message: "Username too short."};
    if (password.length < 4) return {errorCode: 401, message: "Password too short."};
    const isAlreadyExists = await isUserNameExist(username);
    if (isAlreadyExists === true) return {errorCode: 401, message: "Error! Username already exists."};
    const sql = `INSERT INTO users VALUES(DEFAULT, ?, ?, ?, ?, 0)`
    const info = await dal.executeAsync(sql, [firstName, lastName, username, cryptoHelper.hash(password)]);
    user.userId = info.insertId;
    user.token = jwtHelper.getNewToken(user);
    delete user.password;
    delete user.hashedCaptcha;
    delete user.captchaText;
    user.isAdmin = 0;
    return user;
}

async function loginAsync(credentials) {
    const { username, password } = credentials;
    if (username.length < 4) return {errorCode: 401, message: "Username too short."};
    if (password.length < 4) return {errorCode: 401, message: "Password too short."};
    if (!password || !username) return {errorCode: 401, message: "Username or password was empty!"};
    const sql = `SELECT * FROM users WHERE username = ? AND password = ?`
    const info = await dal.executeAsync(sql, [username, cryptoHelper.hash(password)]);
    if (info.length === 0) return {errorCode: 401, message: "Incorrect username or password"};
    const user = info[0];
    delete user.password;
    // Create a token:
    user.token = jwtHelper.getNewToken(user);
    return user;
}

async function isUserNameExist(username) {
    const sql = `SELECT * FROM users WHERE username = ?`
    const info = await dal.executeAsync(sql, [username]);
    return info.length > 0 ? true : false;
}

function createCaptcha() {
    const captcha = svgCaptcha.create()
    const captchaImage = captcha.data;
    const hashedCaptcha = cryptoHelper.hash(captcha.text);
    const response = { captchaImage, hashedCaptcha };
    return response;
}

module.exports = {
    registerAsync,
    loginAsync,
    createCaptcha
}
