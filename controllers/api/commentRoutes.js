const router = require('express').Router();
const { Comment } = require('../../models');
const isAuth = require('../../utils/auth');

router.post('/', isAuth, async (req, res) => {
    try {
        const commentData = await Comment.create({
            ...req.body,
            user_id: req.session.user_id,
        });

        res.status(200).json(commentData);
    } catch (err) {
        res.status(400).json(err);
    };
});

router.delete('/:id', isAuth, async (req,res) => {
    try {
        const commentData = await Comment.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if(!commentData) {
            res.status(404).json({ message: 'No comment found with this id!' });
            return;
        };
        
        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    };
});

router.put('/:id', isAuth, async (req, res) => {
    try {
        const commentData = await Comment.update(
            {
                text: req.body.text,
            },
            {
                where: {
                    id: req.params.id,
                },
            },
        );

        if(!commentData) {
            res.status(404).json({ message: 'No post found with this id' });
        };

        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    };
});

module.exports = router;