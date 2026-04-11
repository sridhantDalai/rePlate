const express=require('express');
 const router=express.Router();

const delPost=require('../controllers/deletePost.controller.js');
const createPost=require('../controllers/createpost.controller.js');
const getPost=require('../controllers/getPost.controller.js')
const authMiddleware = require('../middleware/auth.middleware.js');
 router.get('/get-post',getPost);
 router.delete('/del-post/:id',delPost);
 router.post('/create',authMiddleware,createPost);

 module.exports=router;