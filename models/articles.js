const db = require("../db/connection");


exports.fetchArticle = (id) => {
    return db.query('SELECT * FROM articles WHERE article_id = $1', [id]).then((res) => {
        if(!res.rowCount){
            return Promise.reject({status : 404, message : "Article was not found"})
        }
        return res.rows[0];
    })
}