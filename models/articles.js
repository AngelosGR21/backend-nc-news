const db = require("../db/connection");
const {isTopicAvalable} = require("../db/helpers/utils");

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

exports.fetchAllArticles = async ({sort_by = "created_at", order = "DESC", topic}) => {
    const acceptedSorts = ["votes", "title", "created_at", "topic", "author", "created_at", "comment_count"]
    const acceptedOrders = ["ASC", "ascending", "DESC", "descending"];
    const {rows} = await db.query("SELECT slug FROM topics")
    const allTopics = rows.map((row) => row.slug);
    const isValidDataType = isNaN(parseInt(topic));

    const queryValues = [];
    let queryString = `SELECT articles.*, COUNT(comments.article_id) AS comment_count FROM comments 
    RIGHT JOIN articles ON articles.article_id = comments.article_id`
    
    if(allTopics.includes(topic)){
        queryValues.push(topic);
        queryString+= ` WHERE topic = $1 GROUP BY articles.article_id`
    }else if(!topic){
        queryString+= ' GROUP BY articles.article_id'
    }else{
        if(!isValidDataType){
            return Promise.reject({status: 400, message: "Invalid topic data type"});
        }else{
            return Promise.reject({status: 404, message: "Topic was not found"})
        }
    }

    if(acceptedSorts.includes(sort_by)){
        queryString+= ` ORDER BY ${sort_by}`
        if(acceptedOrders.includes(order)){
            queryString+= ` ${order}`
        }else{
            return Promise.reject({status: 400, message: "Invalid order value"});
        }
    }else{
        return Promise.reject({status: 400, message: "Invalid sort_by value"});
    }
    
    
    return db.query(queryString, queryValues).then(({rows}) => {
        return rows;
    })
}

exports.fetchCommentsByArticleId = (id) => {
    return db.query('SELECT comments.*, users.avatar_url FROM comments JOIN users ON comments.author = users.username WHERE article_id = $1', [id]).then((res) => {
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

exports.insertCommentOnArticleId = (id, reqBody) => {
    const {username, body} = reqBody;
    const comment = [id, body, username]
    return db.query(`INSERT INTO comments (article_id, body, author) 
    VALUES ($1, $2, $3) RETURNING *`, comment).then((res) => {
        return res.rows[0]
    });
}
