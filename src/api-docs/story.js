/**
 * @swagger
 * tags:
 *   name: Story
 *   description: Stories for trip places
 * paths:
 *   /api/stories:
 *     post:
 *       summary: Create story
 *       tags: [Story]
 *       security:
 *         - bearerAuth: []
 *       requestBody:
 *         required: true
 *         content:
 *           multipart/form-data:
 *             schema:
 *               type: object
 *               required:
 *                 - tripId
 *                 - placeName
 *                 - story
 *               properties:
 *                 images:
 *                   type: array
 *                   items:
 *                     type: string
 *                     format: binary
 *                   maxItems: 10
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
 *         400:
 *           description: Invalid trip or duplicate place
 *         500:
 *           description: Image upload failed
 *     get:
 *       summary: Get all stories (for logged-in user)
 *       tags: [Story]
 *       security:
 *         - bearerAuth: []
 *       responses:
 *         200:
 *           description: List of stories
 *         401:
 *           description: Unauthorized
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
 *         404:
 *           description: Story not found
 *         401:
 *           description: Unauthorized
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
 *           description: Story updated successfully
 *         404:
 *           description: Story not found
 *         401:
 *           description: Unauthorized
 *     delete:
 *       summary: Delete story and associated images
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
 *           description: Story deleted successfully
 *         404:
 *           description: Story not found
 *         401:
 *           description: Unauthorized
 */