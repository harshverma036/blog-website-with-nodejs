const mongoose = require('mongoose');
const logger = require('../../logger');
const Blogs = require('../models/db-models');
const _ = require('lodash');

// Fetch all blogs
module.exports.getAllBlogs = (req, res) => {
    Blogs.find()
        .then((data) => {
            logger.info(`Data fetched successfully!!`);
            // console.log(data);
            res.render('index', {
                allBlogs: data
            });
        })
        .catch((err) => logger.error(`Failed to fetch all data!!`))
}

// Add blogs
module.exports.addBlogs = (req, res) => {
    // Getting and storing values from user into variables respectively.
    const blog_title = req.body.title;
    const blog_content = req.body.content;
    const blog_date = logger.date();
    const blog_author = "Admin";
    // Checking that is any field is vaccent into form
    if (!blog_title || !blog_content || !blog_date || !blog_author) {
        res.json({ "Error Message": "Please enter deatils to proceed." });
    }
    // Creating new DB model and saving it to Database
    const newBlog = new Blogs({
        title: blog_title,
        content: blog_content,
        date: blog_date,
        author: blog_author
    });
    newBlog.save()
        .then(() => {
            logger.info(`blog sucessfully inserted with Title: ${blog_title}`);
            res.redirect('/');
        })
        .catch((err) => {
            logger.error(`Can't save blog: ${err}`);
            res.json({ "Server Err": "Cannot insert data." });
        })
}

// Delete blog with ID.
module.exports.deleteBlogWithID = (req, res) => {
    const delID = req.params.id;
    Blogs.findByIdAndDelete(delID)
        .then(() => {
            logger.info(`Successfully deleted blog with ID: ${delID}`);
            res.redirect('/');
        })
        .catch((err) => {
            logger.error(`Can't delete blog with ID: ${delID}`);
            res.json(err);
        })
}

// Expore Blog
module.exports.exploreBlogWithTitle = (req, res) => {
    const getTitile = _.kebabCase(req.params.searchTitle);
    Blogs.find({})
        .then((foundBlogs) => {
            foundBlogs.forEach((blog) => {
                const title = _.kebabCase(blog.title);
                if (title === getTitile) {
                    logger.info(`Data found with Title: ${blog.title}`);
                    res.render('blog', {
                        blogTitle: blog.title,
                        blogContent: blog.content
                    });
                }
            })
        })
        .catch((err) => {
            logger.error(`Error occued, cannot get data`)
            res.json({ "Error Message": err });
        })
}

// Get blog by id for update
module.exports.getBlogWithID = (req, res) => {
    const update_id = req.params.uid;
    Blogs.findById(update_id)
        .then((foundblog) => {
            logger.info(`Blog found with ID ${update_id}`);
            res.render('update', {
                utitle: foundblog.title,
                ucontent: foundblog.content,
                uid: update_id
            })
        })
        .catch((err) => {
            logger.error(`Error occured, can't fetch blog`);
            res.json({ "Error message": err });
        })
}

// Update blog with ID.
module.exports.updateBlogWithID = (req, res) => {
    Blogs.updateOne({ _id: req.body.update_blog }, { title: req.body.title, content: req.body.content })
        .then(() => {
            logger.info(`Blog Successfull updated!!`);
            res.redirect('/');
        })
        .catch((err) => {
            logger.error(`Error occured, can't update.`);
            res.json({ "Error message": err });
        })
}