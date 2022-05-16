const db = require("../db/connection");


exports.fetchArticle = (id) => {
    return db.query('SELECT * FROM articles WHERE article_id = $1', [id]).then((res) => {
        if(!res.rowCount){
            return Promise.reject({status : 404, message : "Article was not found"})
        }
        return res.rows[0];
    })
}

exports.updateArticle = (id, votes) => {
        return db.query("UPDATE articles SET votes = votes + $1 WHERE article_id = $2 RETURNING *", [votes, id]).then((res) => {
            if(!res.rowCount){
                return Promise.reject({status : 404, message : "Article was not found"})
            }
            return res.rows[0];
        })
}