const db = require("../db/connection");


exports.fetchArticle = (id) => {

    return db.query(`SELECT articles.article_id, articles.title, articles.topic, articles.author, 
    articles.body, articles.created_at, articles.votes, COUNT(*) AS comment_count FROM comments RIGHT JOIN articles 
    ON articles.article_id = comments.article_id WHERE articles.article_id = $1 
    GROUP BY articles.article_id`, [id]).then(({rows}) => {
        if(!rows.length){
            return Promise.reject({status : 404, message : "Article was not found"})
        }
            return rows[0];
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

exports.fetchAllArticles = ({sort_by = "created_at", order, topic}) => {
    const acceptedSorts = ["votes", "title", "created_at", "topic", "author", "created_at", "comment_count"]
    const queryValues = [];
    let queryString = `SELECT articles.*, COUNT(comments.article_id) AS comment_count FROM comments 
    RIGHT JOIN articles ON articles.article_id = comments.article_id`

    if(topic){
        queryValues.push(topic);
        queryString+= ` WHERE topic = $1 GROUP BY articles.article_id`
    }else{
        queryString+= ' GROUP BY articles.article_id'
    }

    if(acceptedSorts.includes(sort_by)){
        queryString+= ` ORDER BY ${sort_by}`
        if(order === "ASC"){
            queryString+= " ASC"
        }else{
            queryString+= " DESC"
        }
    }else{
        return Promise.reject({status: 400, message: "Invalid sort_by value"});
    }
    
    
    return db.query(queryString, queryValues).then(({rows}) => {
        if(!rows.length){
            return Promise.reject({status: 400, message: "Invalid topic value"})
        }
        return rows;
    })
}