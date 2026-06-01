const express = require('express');
const blogController = require('../controllers/blog');

const { verify, verifyAdmin } = require("../auth");

const router = express.Router();

router.post("/addBlogPost", verify, blogController.addBlogPost);

router.get("/getBlogs", blogController.getAllPosts);

router.get("/getBlogPost/:blogId", blogController.getPostById);

router.patch("/:blogId/updateBlogPost", verify, blogController.updateBlogPost)
;
router.delete("/:blogId/deleteBlogPost", verify, verifyAdmin, blogController.deleteBlogPost);

router.post("/addComment", verify, blogController.addComment);

router.get("/getComments/:blogId", verify, blogController.getComments);


module.exports = router;
