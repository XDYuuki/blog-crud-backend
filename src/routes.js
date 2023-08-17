const express = require("express");
const routes = express.Router();

const postController = require("./controllers/PostController");
const authorController = require("./controllers/AuthorController");
const commentController = require("./controllers/CommentController");

/**
 * @swagger
 * components:
 *   schemas:
 *     Item:
 *       type: object
 *       required:
 *         - title
 *         - content
 *         - author_id
 *       properties:
 *         id:
 *           type: integer
 *           description: table reference id
 *         title:
 *           type: string
 *           description: title of the post
 *         author_id:
 *           type: integer
 *           description: the id of the author
 *         content:
 *           type: string
 *           description: post message content
 *         rate:
 *           type: integer
 *           description: the rating score for this post
 *       example:
 *         title: This is the post title!
 *         content: This is an api to create blog posts and also comment on them.
 *         authorId: 1
 *     Author:
 *       type: object
 *       required:
 *         - name
 *         - email
 *       properties:
 *         id:
 *           type: integer
 *           description: table reference id
 *         name:
 *           type: string
 *           description: name of the author
 *         email:
 *           type: string
 *           description: email contact reference
 *       example:
 *         name: Gabriel Rocha
 *         email: milo@thecat.com
 *     Login:
 *       type: object
 *       required:
 *         - email
 *       properties:
 *         email:
 *           type: string
 *           description: email contact reference
 *       example:
 *         email: milo@thecat.com
 *
 */

// Posts Routes ------------------------------------------------------------
/**
 * @swagger
 * /items:
 *   get:
 *     summary: Returns the list of all the posts in the blog
 *     tags: [Posts]
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
 *     tags: [Posts]
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
 * /items:
 *   post:
 *     summary: Create a new post into the blog
 *     tags: [Posts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Item'
 *     responses:
 *       200:
 *         description: The post was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Item'
 *       400:
 *         description: Missing data
 *       500:
 *         description: Some server error
 */
routes.post("/items", postController.createPost);

/**
 * @swagger
 * /items/{id}:
 *  put:
 *    summary: Update the post by the id
 *    tags: [Posts]
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
 *     tags: [Posts]
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

// Author Routes ------------------------------------------------------------

/**
 * @swagger
 * /author:
 *   post:
 *     summary: Create a new author for the blog
 *     tags: [Athors]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Author'
 *     responses:
 *       200:
 *         description: The author was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Author'
 *       500:
 *         description: Some server error
 */
routes.post("/author", authorController.createAuthor);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Returns a user object for the loged author
 *     tags: [Athors]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Login'
 *     responses:
 *       200:
 *         description: The author was successfully logged in
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Login'
 *       500:
 *         description: Some server error
 */
routes.post("/login", authorController.loginAuthor);

// Comment Routes ------------------------------

module.exports = routes;
