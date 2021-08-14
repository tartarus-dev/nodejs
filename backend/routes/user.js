import express from 'express';
// import {userById, read, update } from '../controller/user'
// import { isAuth, isAdmin } from '../controller/auth';

const router = express.Router();

// router.get('/secret/:userId', isAuth, isAdmin, (req, res) => {
//     res.json({
//         user: req.profile
//     })
// });

// router.get('/users/:userId', read);
// router.param('userId', userById);

module.exports = router;

