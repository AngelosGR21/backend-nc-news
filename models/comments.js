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

exports.updateCommentVotes = (id, updatedVote) => {
    if(updatedVote !== 1 && updatedVote !== -1 )return Promise.reject({status: 400, message: "inc_votes can only be 1 or -1"}) ;
    const queryString = "UPDATE comments SET votes = votes + $1 WHERE comment_id = $2 RETURNING *"
    const queryValues = [updatedVote, id]
    return db.query(queryString, queryValues).then((res) => {
        if(!res.rowCount){
            return Promise.reject({status : 404, message : "Comment was not found"})
        }
        return res.rows[0];
    })
}