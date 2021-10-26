const followersLogic = require("../business-logic-layer/followers-logic");
const express = require("express");
const errorsHelper = require("../helpers/errors-helper")
const verifyLoggedIn = require("../middleware/verify-logged-in");
const router = express.Router();

router.get("/:id", verifyLoggedIn, async (request, response) => {
    try {
        const id = +request.params.id
        const followersCount = await followersLogic.getFollowersCount(id);
        response.json(followersCount);
    }
    catch (err) {
        response.status(500).send(errorsHelper.getError(err));
    }
})

router.post("/isUserFollowing", verifyLoggedIn, async (request, response) => {
    try {
        const follower = request.body;
        const isFollow = await followersLogic.isUserFollowing(follower);
        response.json(isFollow);
    }
    catch (err) {
        response.status(500).send(errorsHelper.getError(err));
    }
})

router.post("/", verifyLoggedIn, async (request, response) => {
    try {
        const follower = request.body;
        const follow = await followersLogic.followAsync(follower);
        response.json(follow);
    }
    catch (err) {
        response.status(500).send(errorsHelper.getError(err));
    }
})

router.post("/unFollow", verifyLoggedIn, async (request, response) => {
    try {
        const follower = request.body;
        const unFollow = await followersLogic.unFollowAsync(follower);
        response.json(unFollow);
    }
    catch (err) {
        response.status(500).send(errorsHelper.getError(err));
    }
})

module.exports = router;