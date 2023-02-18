var express = require('express');
var router = express.Router();

const mongoose = require('mongoose')
const User = mongoose.model('User')
const Post = mongoose.model('Post')
const {requireUser} = require('../../config/passport')
const validatePostInput = require('../../validations/posts')

// Show all posts by User
router.get('/users/:userId', async (req, res, next) => {
    let user;
    try {
        user = await User.findById(req.params.userId)
    } catch(err) {
        const error = new Error('User not found')
        error.statusCode = 404
        error.errors = {message: "No user found with that id"}
        return next(error)
    }
    
    try {
        const posts = await Post.find({
            author: user._id
            })
            .sort({createdAt: -1})
        
        postsObj = {}
        for (const post of posts) {
            const year = post.createdAt.getFullYear()
            const month = post.createdAt.getMonth()
            const day = post.createdAt.getDate()
            
            postsObj[`${month + 1}/${day}/${year}`] = post
        }
        
        return res.json(postsObj)
        
    } catch(err) {
        console.log(err)
        return res.json([])
    }
})

// Show specific post
router.get('/:id', async (req, res, next) => {
    try{
        const post = await Post.findById(req.params.id)
        
        return res.json(post)
    } catch(err) {
        const error = new Error('Post not found')
        error.statusCode = 404
        error.errors = { message: 'No post found with that id'}
        return next(error)
    }
})

// Make post
router.post('/', requireUser, validatePostInput, async (req, res, next) => {
    let prev = await Post.findOne({author: req.params._id, date: new Date()})
    if (prev) {
        console.log(prev)
        const error = new Error('Only one journal per day')
        error.statusCode = 404
        error.errors = { message: 'Only one journal per day' }
        return next(error)
    }

    try {
        const newPost = new Post({
            note: req.body.note,
            high: req.body.high,
            rating: req.body.rating,
            moodPic: req.body.moodPic,
            author: req.user._id,
        })

        let post = await newPost.save()
        return res.json(post)
    } catch(err){
        next(err)
    }
})

// Edit post
router.put('/:postId', requireUser, validatePostInput, async(req, res, next) => {
    try {
        const post = await Post.findById(req.params.postId)

        if (req.user._id.toString() === post.author.toString()) {
            if(post.update(req.body)){
                
            }

            return res.json(post);
        } else {
            const error = new Error('Not owner of post')
            error.statusCode = 404
            error.errors = { message: 'Must be owner of post to update' }
            return next(error)
        }

    } catch (err) {
        next(err)
    }
})

// Delete post
router.delete('/:id', requireUser, async (req, res, next) => {   
    try {
        const post = await Post.findById(
            req.params.id
        )
        if(req.user._id.toString() === post.author.toString()){
            await post.delete()
    
            return res.json("Successfully deleted.");
        } else {
            const error = new Error('Not owner of post')
            error.statusCode = 404
            error.errors = { message: 'Must be owner of post to delete' }
            return next(error)
        }
    }
    catch (err) {
        next(err)
    }
})

module.exports = router;