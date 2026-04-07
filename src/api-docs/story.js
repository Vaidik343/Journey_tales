/**
 * @swagger
 * tags:
 *   name: Story
 *   description: Stories for trip places
 * paths:
 *   /api/stories:
 *     post:
 *       summary: Create story (requires tripId)
 *       tags: [Story]
 *       requestBody:
 *         required: true
 *         content:
 *           multipart/form-data:
 *             schema:
 *               type: object
 *               properties:
 *                 images:
 *                   type: array
 *                   items:
 *                     type: string
 *                     format: binary
 *                 tripId:
 *                   type: string
 *                   format: uuid
 *                   example: "123e4567-e89b-12d3-a456-426614174000"
 *                 placeName:
 *                   type: string
 *                   example: "Everest Base Camp"
 *                 story:
 *                   type: string
 *                   example: "Incredible hike with stunning views"
 *                 visitDate:
 *                   type: string
 *                   format: date
 *                   example: "2024-05-15"
 *       responses:
 *         201:
 *           description: Story created
 *     get:
 *       summary: Get all stories
 *       tags: [Story]
 *       security:
 *         - bearerAuth: []
 *       responses:
 *         200:
 *           description: List of stories
 *   /api/stories/{id}:
 *     get:
 *       summary: Get story by ID
 *       tags: [Story]
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
 *           description: Story details
 *     put:
 *       summary: Update story
 *       tags: [Story]
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
 *                 placeName:
 *                   type: string
 *                 story:
 *                   type: string
 *                 visitDate:
 *                   type: string
 *                   format: date
 *       responses:
 *         200:
 *           description: Story updated
 *     delete:
 *       summary: Delete story
 *       tags: [Story]
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
 *           description: Story deleted
 */
