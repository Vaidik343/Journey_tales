/**
 * @swagger
 * tags:
 *   name: BucketList
 *   description: Bucket list items for trips
 * paths:
 *   /api/bucketlist:
 *     post:
 *       summary: Create bucket list item
 *       tags: [BucketList]
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
 *                   example: "Climbing gear"
 *                 quantity:
 *                   type: integer
 *                   example: 2
 *                 note:
 *                   type: string
 *                   example: "High quality ropes"
 *       responses:
 *         201:
 *           description: Item created
 *     get:
 *       summary: Get all bucket list
 *       tags: [BucketList]
 *       security:
 *         - bearerAuth: []
 *       responses:
 *         200:
 *           description: List
 *   /api/bucketlist/{id}:
 *     get:
 *       summary: Get by ID
 *       tags: [BucketList]
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
 *       tags: [BucketList]
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
 *                 quantity:
 *                   type: integer
 *                 note:
 *                   type: string
 *       responses:
 *         200:
 *           description: Updated
 *     delete:
 *       summary: Delete
 *       tags: [BucketList]
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
