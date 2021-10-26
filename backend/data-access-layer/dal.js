const mysql = require("mysql");

// Creating a connection to the database:
const connection = mysql.createPool({

    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.name

});

function executeAsync(sql, values) {
    return new Promise((resolve, reject) => {
        connection.query(sql, values, (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
}
module.exports = {
    executeAsync
};