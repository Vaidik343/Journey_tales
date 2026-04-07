/**
 * @swagger
 * tags:
 *   name: User
 *   description: User authentication and management endpoints
 * paths:
 *   /api/user/login:
 *     post:
 *       summary: User login
 *       tags: [User]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required: [email, password]
 *               properties:
 *                 email:
 *                   type: string
 *                   format: email
 *                   example: user@example.com
 *                 password:
 *                   type: string
 *                   example: password123
 *       responses:
 *         '200':
 *           description: Login successful
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   accessToken:
 *                     type: string
 *                   refreshToken:
 *                     type: string
 *                   user:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         format: uuid
 *                       email:
 *                         type: string
 *         '401':
 *           description: Invalid credentials
 *   /api/user/logout:
 *     post:
 *       summary: User logout
 *       tags: [User]
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 refreshToken:
 *                   type: string
 *       responses:
 *         '200':
 *           description: Logged out
 *   /api/user/refresh:
 *     post:
 *       summary: Refresh access token
 *       tags: [User]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 refreshToken:
 *                   type: string
 *       responses:
 *         '200':
 *           description: New access token
 *         '403':
 *           description: Invalid refresh token
 *   /api/me:
 *     post:
 *       summary: Create new user
 *       tags: [User]
 *       requestBody:
 *         required: true
 *         content:
 *           multipart/form-data:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   example: John Doe
 *                 email:
 *                   type: string
 *                   format: email
 *                 password:
 *                   type: string
 *                   minLength: 6
 *                 profile:
 *                   type: string
 *                   format: binary
 *                   description: Profile image (optional)
 *       responses:
 *         '201':
 *           description: User created
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/User'
 *   /api/user:
 *     get:
 *       summary: Get all users
 *       tags: [User]
 *       responses:
 *         '200':
 *           description: List of users
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/User'
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
 *       responses:
 *         '200':
 *           description: User details
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/User'
 *         '404':
 *           description: User not found
 *     put:
 *       summary: Update user by ID
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
 *       requestBody:
 *         content:
 *           multipart/form-data:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                   format: email
 *                 password:
 *                   type: string
 *                 profile:
 *                   type: string
 *                   format: binary
 *                   description: New profile image (optional, replaces old)
 *       responses:
 *         '200':
 *           description: User updated
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                   user:
 *                     $ref: '#/components/schemas/User'
 *     delete:
 *       summary: Delete user by ID
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
 *       responses:
 *         '200':
 *           description: User deleted
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         name:
 *           type: string
 *         email:
 *           type: string
 *           format: email
 *         profile:
 *           type: string
 *           nullable: true
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */
