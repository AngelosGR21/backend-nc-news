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

exports.fetchAllArticles = () => {
    return db.query(`SELECT articles.article_id, articles.title, articles.topic, articles.author, 
    articles.created_at, articles.votes, COUNT(comments.article_id) AS comment_count FROM comments RIGHT JOIN articles 
    ON articles.article_id = comments.article_id GROUP BY articles.article_id`).then(({rows}) => {
        return rows;
    })
}

exports.fetchCommentsById = (id) => {
    return db.query('SELECT * FROM comments WHERE article_id = $1', [id]).then((res) => {
        if(!res.rowCount){
            return this.fetchArticle(id)
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