import express from 'express';
import {
    authUser, 
    getUserProfile, 
    registerUser, 
    updateUserProfile, 
    getUsers,
    deleteUser,
    getUserById,
    updateUser
} 
from '../controllers/userControllers.js';
import {admin, protect} from '../middleware/authMiddleware.js'

const router = express.Router();

router.route('/').post(registerUser);
router.route('/login').post(authUser);
router.route('/profile').get(protect, getUserProfile);
router.route('/profile').put(protect, updateUserProfile);
router.route('/').get(protect, admin,  getUsers);
router.route('/:id').delete(protect, admin, deleteUser);
router.route('/:id').get(protect, admin, getUserById);
router.route('/:id').put(protect, admin, updateUser)



export default router;
