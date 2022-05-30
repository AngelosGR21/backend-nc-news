const db = require("../db/connection")

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