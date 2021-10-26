const dal = require("../data-access-layer/dal");
const path = require("path");
const uuid = require("uuid");
const filesHelper = require("../helpers/files-helper");

async function getAllVacationsAsync(userId) {
    const sql = `SELECT vacations.vacationId , destination, DATE_FORMAT(dateFrom, '%d/%m/%Y - %H:%i') as dateFrom,
    DATE_FORMAT(dateUntil, '%d/%m/%Y - %H:%i') as dateUntil , price , description , image ,(NOT ISNULL(followers.userId)) AS Follow FROM vacations LEFT JOIN followers ON followers.vacationId = vacations.vacationId AND followers.userId = ? WHERE vacations.dateUntil >= CURDATE() ORDER BY Follow desc`;
    const vacations = await dal.executeAsync(sql, [userId]);
    return vacations;
}

async function getSingleVacationAsync(id) {
    const sql = `select vacationId , destination, DATE_FORMAT(dateFrom, '%d/%m/%Y - %H:%i') as dateFrom,
    DATE_FORMAT(dateUntil, '%d/%m/%Y - %H:%i') as dateUntil , price , description , image from vacations Where vacationId = ?`;
    const singleVacation = await dal.executeAsync(sql, [id]);
    return singleVacation[0];
}

async function addVacationAsync(vacation, image) {
    const extension = image.name.substr(image.name.lastIndexOf("."));
    const fileName = uuid.v4() + extension;
    const sql = `INSERT INTO vacations VALUES(DEFAULT, ?, ?, ?, ?, ?, ?)`;
    const info = await dal.executeAsync(sql, [vacation.destination, vacation.dateFrom, vacation.dateUntil, vacation.price, vacation.description, fileName]);
    vacation.vacationId = info.insertId;
    vacation.image = fileName;
    const absolutePath = path.join(__dirname, "..", "images", "vacations", fileName);
    await image.mv(absolutePath);
    return vacation;
}

async function updateVacationAsync(vacation, image) {
    let sql = `UPDATE vacations SET destination = ?, dateFrom = ?, dateUntil = ?, price = ?, description = ?`;
    let values = [];
    if (image === null) {
        sql += ` WHERE vacationId = ?`;
        values = [vacation.destination, vacation.dateFrom, vacation.dateUntil, vacation.price, vacation.description, vacation.vacationId];
    } else {
        const extension = image.name.substr(image.name.lastIndexOf("."));
        const fileName = uuid.v4() + extension;
        sql += `, image = ? WHERE vacationId = ?`;
        values = [vacation.destination, vacation.dateFrom, vacation.dateUntil, vacation.price, vacation.description, fileName, vacation.vacationId];
        vacation.image = fileName;
        const absolutePath = path.join(__dirname, "..", "images", "vacations", fileName);
        await image.mv(absolutePath);
    }
    const info = await dal.executeAsync(sql, values);
    return info.affectedRows === 0 ? null : vacation;
}

async function deleteVacationAsync(id) {

    const getImageSQL = `SELECT image FROM vacations WHERE vacationId = ?`;
    const info = await dal.executeAsync(getImageSQL, [id]);
    const fileName = info[0].image;
    const absolutePath = path.join(__dirname, "..", "images", "vacations", fileName);
    filesHelper.safeDelete(absolutePath);
    const sql = `DELETE FROM vacations WHERE vacationId = ?`;
    await dal.executeAsync(sql, [id]);
}


module.exports = {
    getAllVacationsAsync,
    getSingleVacationAsync,
    addVacationAsync,
    updateVacationAsync,
    deleteVacationAsync
}