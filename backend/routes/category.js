import express from 'express';
import { create, categoryByID, list, remove, update, read } from '../controller/category';
// import { userById } from '../controller/user';
// import { requireSignin, isAuth, isAdmin } from '../controller/auth';
const router = express.Router();

router.post("/categories/create", create);
router.get("/categories/:categoryId", read);
router.get("/categories", list);
router.delete("/categories/:categoryId", remove);
router.put("/categories/:categoryId", update);

router.param("categoryId", categoryByID);
// router.param("UserId", userById)

module.exports = router;