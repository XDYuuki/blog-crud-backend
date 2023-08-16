const express = require("express");
const routes = require("./routes");
const bodyParser = require("body-parser");
const cors = require("cors");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Blog API",
            version: "1.0.0",
            description:
                "API create for Web Application Programming class, Assignment 04",
        },
        servers: [{ url: "http://localhost:3000" }],
    },
    apis: ["./src/routes.js"],
};

const specs = swaggerJsDoc(swaggerOptions);

class AppController {
    app;
    constructor() {
        this.app = express();

        this.useRouts();
        this.midlewares();
    }

    useRouts() {
        this.app.use(routes);
    }

    midlewares() {
        this.app.use(express.static("public"));
        this.app.use(cors());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());

        this.app.use("/swagger", swaggerUI.serve, swaggerUI.setup(specs));
    }
}

module.exports = new AppController().app;
