import express from 'express';
import { GetUsers, Register, Login, Logout } from "../controllers/Users.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";

const router = express.Router();

router.get('/users', verifyToken, GetUsers);
router.post('/login', Login);
router.post('/users', Register);
router.get('/token', refreshToken);
router.delete('/logout', Logout);

export default router;