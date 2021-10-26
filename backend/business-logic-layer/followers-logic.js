const dal = require("../data-access-layer/dal");
const socketHelper = require("../helpers/socket-helper")

async function getFollowersCount(vacationId) {
    const sql = "SELECT * FROM followers WHERE vacationId = ?";
    const followCount = await dal.executeAsync(sql, [vacationId]);
    return followCount;
}

async function isUserFollowing(follower) {
    const sql = "SELECT * FROM followers WHERE userId = ? AND vacationId = ?";
    const singleFollow = await dal.executeAsync(sql, [follower.userId, follower.vacationId]);
    return singleFollow;
}

async function followAsync(follower) {
    const sql = "INSERT INTO followers VALUES(? , ?)";
    const newFollower = await dal.executeAsync(sql, [follower.userId, follower.vacationId])
    updateFollowersCount(follower.vacationId);
    return newFollower;
}

async function unFollowAsync(follower) {
    const sql = "DELETE FROM followers WHERE userID = ? AND vacationId = ?";
    const removeFollower = await dal.executeAsync(sql, [follower.userId, follower.vacationId]);
    updateFollowersCount(follower.vacationId);
    return removeFollower;
}

async function updateFollowersCount(vacationId) {
    const newFollowersCount = await getFollowersCount(vacationId);
    const uniqueUpdate = {
        vacationId,
        followCount: newFollowersCount.length
    }
    socketHelper.vacationUpdated(uniqueUpdate);
}

module.exports = {
    getFollowersCount,
    followAsync,
    unFollowAsync,
    isUserFollowing,
    updateFollowersCount
}