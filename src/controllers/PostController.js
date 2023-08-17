const connection = require("../database/connection");

class PostController {
    constructor() {}

    getPost = (request, response) => {
        let queryStr = "SELECT * FROM posts ORDER BY id DESC";

        connection.query(queryStr, function (error, results, fields) {
            if (error) throw error;

            console.log("The result is: ", results);

            response.send({ posts: results });
            return;
        });
    };

    getPostById = (request, response) => {
        console.log("Item rout, id:", request.params.id);
        let id = request.params.id;
        let queryStr = `SELECT * FROM posts WHERE id=${id}`;

        connection.query(queryStr, function (error, results, fields) {
            if (error) throw error;

            console.log("The result is: ", results);

            response.send({ post: results });
            return;
        });
    };

    updatePost = (request, response) => {
        if (
            request.body.title ||
            request.body.content ||
            request.body.authorId
        ) {
            let queryStr = `UPDATE posts SET title='${request.body.post.title}',content='${request.body.post.content}' WHERE id=${request.params.id}`;
            console.log("Post id:", request.params.id);
            console.log("Request body:", request.body);

            connection.query(queryStr, function (error, results, fields) {
                if (error) throw error;

                console.log("The result is: ", results);

                response.send({ msg: `The post was updated successfully` });
                return;
            });
        } else {
            response.sendStatus(400).send("Missing data body");
            return;
        }
    };

    deletePost = (request, response) => {
        console.log("Post id:", request.params.id);
        let id = request.params.id;
        let queryStr = `DELETE FROM posts WHERE id=${id}`;

        connection.query(queryStr, function (error, results, fields) {
            if (error) throw error;

            console.log("The result is: ", results);

            response.send({ msg: `The post was deleted successfully` });
            return;
        });
    };

    createPost = (request, response) => {
        console.log("Post rout, request body:", request.body);
        if (
            request.body.title &&
            request.body.content &&
            request.body.authorId
        ) {
            let queryStr = `INSERT INTO posts (id, title, content, rate, author_id) VALUES (NULL, '${request.body.title}', '${request.body.content}', NULL, '${request.body.authorId}')`;
            connection.query(queryStr, function (error, results, fields) {
                if (error) throw error;

                console.log("The result is: ", results);

                response.send({ msg: `The post was created successfully` });
                return;
            });
        } else {
            response.sendStatus(400).send("Missing data body");
        }
    };
}

module.exports = new PostController();
