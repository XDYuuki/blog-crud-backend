const express = require("express");
const routes = express.Router();

const postController = require("./controllers/PostController");
const authorController = require("./controllers/AuthorController");
const commentController = require("./controllers/CommentController");

routes.get("/", (req, res) => {
    res.send(`<h1>Blog post API server</h1>`);
});

// Posts Routes --------------------------------

/**
 * @swagger
 * components:
 *   schemas:
 *     Item:
 *       type: object
 *       required:
 *         - title
 *         - content
 *         - author
 *       properties:
 *         id:
 *           type: integer
 *           description: table reference id
 *         title:
 *           type: string
 *           description: title of the post
 *         author:
 *           type: string
 *           description: the author of the post
 *         content:
 *           type: string
 *           description: post message content
 *         rate:
 *           type: integer
 *           description: the rating score for this post
 *       example:
 *         id: 1
 *         title: This is my first blog post!
 *         content: This is an api to create blog posts and also comment on them.
 *         author: Gabriel Rocha
 *         rate: 5
 *
 */

/**
 * @swagger
 * /items:
 *   get:
 *     summary: Returns the list of all the posts in the blog
 *     tags: [Items]
 *     responses:
 *       200:
 *         description: The list of the posts of the blog
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Item'
 */

routes.get("/items", postController.getPost);

/**
 * @swagger
 * /items/{id}:
 *   get:
 *     summary: Get the post by the id
 *     tags: [Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The post id
 *     responses:
 *       200:
 *         description: The specific post by its id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Item'
 *       404:
 *         description: The post was not found
 */

routes.get("/items/:id", postController.getPostById);

/**
 * @swagger
 * /items/{id}:
 *  put:
 *    summary: Update the post by the id
 *    tags: [Items]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The post id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Item'
 *    responses:
 *      200:
 *        description: The post was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Item'
 *      404:
 *        description: The post was not found
 *      500:
 *        description: Some error happened
 */
routes.put("/items/:id", postController.updatePost);

/**
 * @swagger
 * /items/{id}:
 *   delete:
 *     summary: Remove the post by id
 *     tags: [Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The post id
 *
 *     responses:
 *       200:
 *         description: The post was deleted
 *       404:
 *         description: The post was not found
 */
routes.delete("/items/:id", postController.deletePost);

// Author Routes -------------------------------
//routes.post("/author", authorController.createAuthor);

// Comment Routes ------------------------------

module.exports = routes;
