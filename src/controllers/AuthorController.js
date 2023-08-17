const connection = require("../database/connection");

class AuthorController {
    constructor() {}

    createAuthor = (request, response) => {
        console.log("Body content", request.body);

        if (request.body.name && request.body.email) {
            let queryStr = `INSERT INTO author (id, name, email) VALUES (NULL, '${request.body.name}', '${request.body.email}')`;

            connection.query(queryStr, function (error, results, fields) {
                if (error) throw error;

                console.log("The result is: ", results);

                response.send({ msg: `The author was created successfully` });
                return;
            });
        } else {
            response.sendStatus(400).send("Missing data: body");
            return;
        }
    };

    loginAuthor = (request, response) => {
        console.log("Body content", request.body);
        if (request.body.email) {
            let queryStr = `SELECT * FROM author WHERE email='${request.body.email}'`;
            console.log("Query:", queryStr);

            connection.query(queryStr, function (error, results, fields) {
                if (error) throw error;

                console.log("The result is: ", results);

                response.send({ author: results });
                return;
            });
        } else {
            response.sendStatus(400);
            return;
        }
    };

    logoutAuthor = (request, response) => {};

    updateAuthor = (request, response) => {};
    deleteAuthor = (request, response) => {};
}

module.exports = new AuthorController();
