const Blog = require('../models/Blog');
const auth = require("../auth");
const { errorHandler } = require("../auth");

module.exports.addBlogPost = (req, res) => {

	console.log("req.user", req.user);

	if (!req.body.title || !req.body.content) {
	   return res.status(400).send({ error: "All fields are required" });
	}

	let newBlog = new Blog({
	    title : req.body.title,
	    content : req.body.content,
	    author: req.user.username,
	    comments: [],
	    userId : req.user.id
	});

	return newBlog.save()
	.then(result => res.status(201).send(result))
	.catch (error => errorHandler(error, req, res));
}

module.exports.getAllPosts = (req, res) => {

	//find blogs in database
    return Blog.find({})
    .then(result => {
    	//status code 200 OK and display all blogs
        return res.status(200).send(result);

    })

    .catch(error => errorHandler(error, req, res));

}

module.exports.getPostById = (req, res) => {

	//find blog in database
    return Blog.findById(req.params.blogId)
    .then(result => {

    	if(!result) {
    		return res.status(404).send({ message: "Blog post not found"})
    	}
    	//status code 200OK and display the blog
        return res.status(200).send(result);

    })

    .catch(error => errorHandler(error, req, res));

}

module.exports.updateBlogPost = (req, res) => {

    const updatedFields = {
        title : req.body.title,
	    content : req.body.content,
	    comments: []
    };

    console.log(updatedFields);

    return Blog.findByIdAndUpdate(req.params.blogId, updatedFields, { new: true })
        .then(updatedBlog => {
            // if blog is not found
            if(!updatedBlog){
                return res.status(404).send({ error: "Blog post not found" });
            }
            // if blog is found, it will be updated

            res.status(200).send({
                success: true,
                message: "Post updated successfully"
            })
        })
        .catch(error => errorHandler(error, req, res));
}

module.exports.deleteBlogPost = (req, res) => {

	return Blog.findByIdAndDelete(req.params.blogId)
		.then(result => {

			if(!result) {
				return res.status(404).send({ message: "Blog post not found"});
			}

			return res.status(200).send({ message: "Blog post deleted successfully"})
		})
		.catch(error => errorHandler(error, req, res));
}

module.exports.addComment = (req, res) => {

	if(!req.body.blogId || !req.body.comment) {
		return res.status(400).send({ error: "Blog post ID and comment are required"});
	}

	return Blog.findById(req.body.blogId)
		.then(blog => {

			if(!blog) {
				return res.status(404).send({ message: "Blog post not found"});
			}

			const newComment = {
				userId: req.user.id,
				comment: req.body.comment
			};

			blog.comments.push(newComment);

			return blog.save()
				.then(updatedBlog => {
					return res.status(201).send({ message: "Comment added successfully", movie: updatedBlog });
					
				});
		})
		.catch(error => errorHandler(error, req, res));
}

module.exports.getComments = (req, res) => {

	return Blog.findById(req.params.blogId)
		.then(blog => {

			if(!blog) {
				return res.status(404).send({ message: "Blog post not found" });
			}

			return res.status(200).send({ comments: blog.comments });
		})
		.catch(error => errorHandler(error, req, res))
}
