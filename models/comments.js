const {fetchArticle} = require("./articles");
const db = require("../db/connection")

exports.fetchCommentsById = (id) => {
    return db.query('SELECT * FROM comments WHERE article_id = $1', [id]).then((res) => {
        if(!res.rowCount){
            return fetchArticle(id)
        }else{
            return res.rows
        }
    }).then((res) => {
        if(Array.isArray(res)){
            return res;
        }else{
            return [];
        }
    })
}

exports.insertComment = (id, reqBody) => {
    
    const {username, body} = reqBody;
    const comment = [id, body, username]
    return db.query(`INSERT INTO comments (article_id, body, author) 
    VALUES ($1, $2, $3) RETURNING *`, comment).then((res) => {
        return res.rows[0]
    });
}