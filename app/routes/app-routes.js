const express = require('express');
const router = express.Router();
const db = require('../controller/db-controller');

router.get('/', db.getAllBlogs);
router.post('/addblog', db.addBlogs);
router.get('/delete/:id', db.deleteBlogWithID);
router.get('/blog/:searchTitle', db.exploreBlogWithTitle);
router.get('/update/:uid', db.getBlogWithID);
router.post('/updateblog', db.updateBlogWithID);

module.exports = router;