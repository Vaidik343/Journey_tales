/**
 * @swagger
 * tags:
 *   name: User
 *   description: User authentication and management
 * paths:
 *   /api/user/login:
 *     post:
 *       summary: Login user
 *       tags: [User]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                   example: user@example.com
 *                 password:
 *                   type: string
 *                   example: password123
 *       responses:
 *         200:
 *           description: Login successful
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   token:
 *                     type: string
 *                   refreshToken:
 *                     type: string
 *         401:
 *           description: Invalid credentials
 *   /api/user/logout:
 *     post:
 *       summary: Logout user
 *       tags: [User]
 *       security:
 *         - bearerAuth: []
 *       responses:
 *         200:
 *           description: Logout successful
 *   /api/me:
 *     post:
 *       summary: Create user
 *       tags: [User]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 password:
 *                   type: string
 *       responses:
 *         201:
 *           description: User created
 *   /api/user:
 *     get:
 *       summary: Get all users
 *       tags: [User]
 *       security:
 *         - bearerAuth: []
 *       responses:
 *         200:
 *           description: List of users
 *   /api/me/{id}:
 *     get:
 *       summary: Get user by ID
 *       tags: [User]
 *       security:
 *         - bearerAuth: []
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: string
 *             format: uuid
 *             example: "123e4567-e89b-12d3-a456-426614174000"
 *       responses:
 *         200:
 *           description: User details
 *     put:
 *       summary: Update user
 *       tags: [User]
 *       security:
 *         - bearerAuth: []
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: string
 *             format: uuid
 *             example: "123e4567-e89b-12d3-a456-426614174000"
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *       responses:
 *         200:
 *           description: User updated
 *     delete:
 *       summary: Delete user
 *       tags: [User]
 *       security:
 *         - bearerAuth: []
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: string
 *             format: uuid
 *             example: "123e4567-e89b-12d3-a456-426614174000"
 *       responses:
 *         200:
 *           description: User deleted
 */
