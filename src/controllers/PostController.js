const connection = require("../database/connection");

class PostController {
    constructor() {}

    getPost = (request, response) => {
        response.send({ rout: "Item" });
    };

    getPostById = (request, response) => {
        console.log("Item rout, id:", request.params.id);
        let idVar = request.params.id;

        response.send({ requestID: idVar });
    };

    updatePost = (request, response) => {};
    deletePost = (request, response) => {};
}

module.exports = new PostController();
