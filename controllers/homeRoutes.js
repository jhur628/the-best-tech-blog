const router = require('express').Router();
const { get } = require('express/lib/response');
const { User, Post, Comment } = require('../models');

// Get all posts and join with user data
router.get('/', async (req, res) => {
    try{
        const postData = await Post.findAll({
            include: [
                {
                    model: Comment,
                    attributes: ['id', 'text', 'date_created', 'user_id', 'post_id'],
                    include: {
                        model: User,
                        attributes: ['name'],
                    }
                },
                {
                    model: User,
                    attributes: ['name'],
                },
            ],
        });

        const posts = postData.map((post) => post.get({ plain: true }));

        res.render('homepage', {
            posts,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    };
});

// Route to single post
router.get('/post/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['name']
                },
                {
                    model: Comment,
                    attributes: ['text', 'date_created', 'user_id'],
                    include: {
                        model: User,
                        attributes: ['name']
                    },
                },
            ],
        });

        const post = postData.map((blogpost) => blogpost.get({ plain: true }));

        res.render('post', {
            ...post,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    };
});

// Route to sign in
router.get('/signin', async (req, res) =>{
    if(req.session.logged_in) {
        res.redirect('/');
        return;
    } else {
        res.render('signin');
    };
});

// Route to sign up
router.get('/signup', async (req, res) => {
    if(req.session.logged_in) {
        res.redirect('/');
        return;
    } else {
        res.render('signup');
    };
});

module.exports = router;