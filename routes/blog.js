const express = require('express');
const { createBlog, updateBlog,getBlog,getAllBlogs } = require("../controllers/blog");
const multer = require('multer');
const uploadMiddleware = multer({ dest: 'uploads/' });

const router = express.Router();

router.post("/createblog",uploadMiddleware.single('file'), createBlog);
router.put("/updateblog",uploadMiddleware.single('file'), updateBlog);
router.get('/blog/:id', getBlog);
router.get('/blogs', getAllBlogs)

module.exports = router;