import express from 'express';
import { create, productByID, list, remove, update, read } from '../controller/product';
import {userById} from '../controller/user'
// import {requireSignin, isAuth, isAdmin} from '../controller/auth'
const router = express.Router();

router.post('/products/create', create);
router.get("/products/:productId", read);
router.get("/products" , list);
router.delete("/products/:productId", remove);
router.put("/products/:productId", update)
router.param("productId", productByID);
router.param("userId", userById);

module.exports = router;