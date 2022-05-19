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

exports.removeComment = async (id) => {
    let parsedId = parseInt(id);
    if(isNaN(parsedId)){
        return Promise.reject({status: 400, message: "Invalid data type (id)"});
    }

    const {rows} = await db.query("SELECT comment_id FROM comments");
    const allCommentIds = rows.map((row) => row.comment_id);

    if(allCommentIds.includes(parsedId)){
        return db.query("DELETE FROM comments WHERE comment_id = $1", [id]);
    }else{
        return Promise.reject({status: 404, message: "Comment was not found"});
    }
    
}