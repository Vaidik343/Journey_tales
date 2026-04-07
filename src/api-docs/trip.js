/**
 * @swagger
 * tags:
 *   name: Trip
 *   description: Trip management operations
 * paths:
 *   /api/trip:
 *     post:
 *       summary: Create new trip
 *       tags: [Trip]
 *       security:
 *         - bearerAuth: []
 *       requestBody:
 *         content:
 *           multipart/form-data:
 *             schema:
 *               type: object
 *               properties:
 *                 coverImage:
 *                   type: string
 *                   format: binary
 *                 title:
 *                   type: string
 *                 startDate:
 *                   type: string
 *                   format: date
 *                 endDate:
 *                   type: string
 *                   format: date
 *                 summary:
 *                   type: string
 *       responses:
 *         201:
 *           description: Trip created
 *     get:
 *       summary: Get all user's trips
 *       tags: [Trip]
 *       security:
 *         - bearerAuth: []
 *       responses:
 *         200:
 *           description: List of trips
 *   /api/trip/{id}:
 *     get:
 *       summary: Get trip by ID
 *       tags: [Trip]
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
 *           description: Trip details
 *     put:
 *       summary: Update trip (no file upload support)
 *       tags: [Trip]
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
 *                 title:
 *                   type: string
 *                 startDate:
 *                   type: string
 *                   format: date
 *                 endDate:
 *                   type: string
 *                   format: date
 *                 summary:
 *                   type: string
 *       responses:
 *         200:
 *           description: Trip updated
 *     delete:
 *       summary: Delete trip
 *       tags: [Trip]
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
 *           description: Trip deleted
 */
