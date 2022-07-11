# Northcoders News API

## **Live Link : https://nc-news-project-nc.herokuapp.com/api/**
---

## **Summary**

This API mimics the build of a real world backend service that contains different articles, topics, comments and users. It provides full CRUD functionality and was built using TDD with **[Jest](https://www.npmjs.com/package/jest)** as the testing framework.  
The main backend framework used for the routes is **[Express](https://www.npmjs.com/package/express)** and for the database PSQL which was installed using the **[PG](https://www.npmjs.com/package/pg)** npm package.  

Below i will provide a brief overview of all the routes available and what they do. *( The endpoints are also available to see in JSON format in the file of this directory "endpoints.json" or you can view them live here : **[View endpoints](https://nc-news-project-nc.herokuapp.com/api/)** )*

<details>
<summary><strong>GET routes</strong></summary>
<ul>
    <br>
    <li><strong>/api/users ----></strong> Returns an array of objects of all the users available</li>
    <br>
    <li><strong>/api/users/:username ----></strong> Returns an object with the details of the user found</li>
    <br>
    <li><strong>/api/topics ----></strong> Returns an array of objects of all the topics available</li>
    <br>
    <li><strong>/api ----></strong> Returns an object with keys representing all the routes available for usage as well as examples of responses</li>
    <br>
    <li><strong>/api/articles ----></strong> Returns an array of objects of all the articles available <strong>(<span style="color: red">queries available for this endpoint</span> : author, topic, sort_by, order)</strong></li>
    <br>
    <li><strong>/api/articles/:article_id ----></strong> Returns an object with the article found</li>
    <br>
    <li><strong>/api/articles/:article_id/comments ----></strong> Returns an array of objects of all the comments associated to the article specified</li>
    <br>
</ul>
</details>
<details>
<summary><strong>POST routes</strong></summary>
<ul>
<br>
<li><strong>/api/topics ----></strong> Returns the created topic. <strong style="color: red">Fields required >></strong>slug: String, description: String <strong style="color: orange">|| Coming soon</strong></li>
<br>
<li><strong>/api/articles ----></strong> Returns the created article. <strong style="color: red">Fields required >></strong> author: String -> <strong>Needs to be the username from the users table</strong>, title: String, body: String, (topic: String -> <strong>Needs to be the slug from the topics table</strong>)</li>
<br>
<li><strong>/api/articles/:article_id/comments ----></strong> Returns the created comment on the article given. <strong style="color: red">Fields required >></strong> username: String -> <strong>Needs to be the username from the users table</strong>, body: String</li>
<br>
</ul>
</details>
<details>
<summary><strong>PATCH routes</strong></summary>
<ul>
<br>
<li><strong>/api/articles/:article_id ----></strong> Returns the updated article. <strong style="color: red">Fields required >></strong> inc_votes : Number (It will increment the votes, but if you pass a negative number it will subtract)</li>
<br>
<li><strong>/api/comments/:comment_id ----></strong> Returns the updated comment. <strong style="color: red">Fields required >></strong> inc_votes : Number (It will increment the votes, but if you pass a negative number it will subtract)</li>
<br>
</ul>
</details>
<details>
<summary><strong>DELETE routes</strong></summary>
<ul>
<br>
<li><strong>/api/comments/:comment_id ----></strong> Returns status code 204</li>
<br>
<li><strong>/api/articles/:article_id ----></strong> Returns status code 204 <strong style="color: orange">|| Coming soon</strong></li>
<br>
</ul>
</details>
<br>

*You can also see all the additional packages used for the API beneath*
- [dotenv](https://www.npmjs.com/package/dotenv)
- [jest-extended](https://www.npmjs.com/package/jest-extended)
- [jest-sorted](https://www.npmjs.com/package/jest-sorted)
- [pg-format](https://www.npmjs.com/package/pg-format)
- [supertest](https://www.npmjs.com/package/supertest)
- [husky](https://www.npmjs.com/package/husky)

---
## Setup

**To run this app in your local machine please follow the next steps**

1. In your terminal paste this command >> ``` git clone https://github.com/AngelosGR21/BC-News-Project-Northcoders-.git ``` to clone the repository in your system.
  
2. Make sure you run ``` npm install ``` to install all dependencies needed.
3. After all dependencies have been installed run the command ``` npm run setup-dbs ``` to create the databases.  
4. Next to seed the databases run :
    - ``` npm run seed ``` for the development data
    - ``` npm run seedTestData ``` for the test data

5. Now, before you run the tests you need to create <strong>2 .env</strong> files in the root of your folder :

    - .env.test
    - .env.development

6. After you created the <strong>.env</strong> files you need to create these variables to be able to run the tests
    - ***PGDATABASE=nc_news*** (for .env.development)
    - ***PGDATABASE=nc_news_test*** (for .env.test)
##  
7. You're all set, all that's left is to run the tests!
    - ``` npm test ```
---

## Minimum Versions Needed

* Node : 17.6.0
* PSQL : 12.10
