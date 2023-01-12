const express = require('express');
const router = express.Router();
const { Comment, Post } = require('../models')
const { 
    commentCreateValidation,
    commentUpdateValidation,
 } = require('../vaildations')


router.get('/', async (req, res) => {
    try {
        const comments = await Comment.findAll();
        res.json(comments)
    } catch (err){
        res.status(500).json({ message:err.message })
    }
});

router.get('/:postId', async (req,res) =>{
    const { postId } = req.params;
    try{
        const post = await Post.findByPk(postId);
        const postComments = await post.getComments();
        res.json(postComments);
    } catch (err){
        res.status(500).json({ message:err.message })
    }
}); 

router.post('/:postId', async (req,res) => {
    const { postId } = req.params;
    try{
        const { content, userId } = await commentCreateValidation.validateAsync(
            req.body
        );
        const comment = await Comment.create({
            content,
            userId,
            postId,
        })
        res.json(comment);
    }catch (err){
        if(err.isJoi){
            return res.status(422).json({ message: err.details[0].message })
        }

        res.status(500).json({ message:err.message });
    }
})

router.patch('/:id', async (req, res) => {
    const { id } = req.params;

    try{
        const fieldsToBeUpdated = await commentUpdateValidation.validateAsync(
            req.body
        )
        console.log(fieldsToBeUpdated)
        const updateComment = await Comment.update(fieldsToBeUpdated, {where: {
            id
        },})
        res.json(updateComment)
    } catch (err){
        if(err.isJoi){
            return res.status(422).json({ message: err.details[0].message })
        };
        res.status(500).json({ message: err.message })
    }
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try{
        const deletedComment = await Comment.destroy({ where: { id }});
        res.json(deletedComment)
    } catch (err){
        res.status(500).json({ message: err.message })
    }
})

module.exports = router;

//git test