/**
 * @swagger
 * tags:
 *   name: WishList
 *   description: Wish list for trips
 * paths:
 *   /api/wishlist:
 *     post:
 *       summary: Create wish list item
 *       tags: [WishList]
 *       security:
 *         - bearerAuth: []
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 tripId:
 *                   type: string
 *                   format: uuid
 *                 name:
 *                   type: string
 *                   example: "New backpack"
 *                 note:
 *                   type: string
 *                   example: "Waterproof, 40L"
 *       responses:
 *         201:
 *           description: Created
 *     get:
 *       summary: Get all
 *       tags: [WishList]
 *       security:
 *         - bearerAuth: []
 *       responses:
 *         200:
 *           description: List
 *   /api/wishlist/{id}:
 *     get:
 *       summary: Get by ID
 *       tags: [WishList]
 *       security:
 *         - bearerAuth: []
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: string
 *             format: uuid
 *       responses:
 *         200:
 *           description: Details
 *     put:
 *       summary: Update
 *       tags: [WishList]
 *       security:
 *         - bearerAuth: []
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: string
 *             format: uuid
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                 note:
 *                   type: string
 *       responses:
 *         200:
 *           description: Updated
 *     delete:
 *       summary: Delete
 *       tags: [WishList]
 *       security:
 *         - bearerAuth: []
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: string
 *             format: uuid
 *       responses:
 *         200:
 *           description: Deleted
 */
