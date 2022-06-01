import express from 'express';
import {getProducts, getProductById, deleteProduct, updateProduct, createProduct} from '../controllers/productController.js'
import {admin, protect} from '../middleware/authMiddleware.js';

const router = express.Router();



router.route('/').get(getProducts);
router.route('/').post(protect, admin, createProduct)
router.route('/:id').get(getProductById);
router.route('/:id').delete(protect, admin, deleteProduct);
router.route('/:id').put(protect, admin, updateProduct);




export default router;