const authLogic = require("../business-logic-layer/auth-logic");
const express = require("express");
const verifyCaptcha = require("../middleware/verify-captcha");
const router = express.Router();


router.get("/captcha",  async (request, response) => {
    try {
        const captcha = authLogic.createCaptcha();
        response.status(200).json(captcha);
    }
    catch (err) {
        response.status(500).send(err);
    }
});

router.post("/register",verifyCaptcha, async (request, response) => {
    try {
        const user = request.body;
        const info = await authLogic.registerAsync(user);
        if (info.errorCode !== undefined) return response.status(info.errorCode).send(info.message);
        response.json(info);
    }
    catch (err) {
        response.status(500).send(err);
    }
})

router.post("/login", async (request, response) => {
    try {
        const credentials = request.body;
        const info = await authLogic.loginAsync(credentials);
        console.log(info)
        if (info.errorCode !== undefined) return response.status(info.errorCode).send(info.message);
        response.json(info)
    }
    catch (err) {
        response.status(500).send(err);
    }
})

module.exports = router;
