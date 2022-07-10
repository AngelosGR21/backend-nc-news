const db = require("../db/connection");

exports.fetchUsers = () => {
    return db.query('SELECT * FROM users').then(({rows}) => {
        return rows;
    })
}

exports.fetchSingleUser = (username) => {
    return db.query("SELECT * FROM users WHERE username = $1", [username])
    .then((res) => {
        if(res.rowCount) return res.rows[0];
        
        return Promise.reject({status: 404, message: "User was not found"});
    })
}