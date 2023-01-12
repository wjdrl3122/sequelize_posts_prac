const express = require('express');

const router = express.Router();
const { signupValidation } = require('../vaildations');
const { User } = require('../models');
const bcrypt = require('bcrypt');

router.get('/users', async (req, res) => {
    try{
        const user = await User.findAll({
            attributes: { exclude: ['password']},
        });
        res.json(user);
    } catch (err){}
})

router.post('/signup', async (req, res) => {
    try {
        const { nickname, password } = await signupValidation.validateAsync(
            req.body
        );
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = await User.create({
            nickname,
            password : hashedPassword,
        })
    } catch (err){
        if(err.Joi){
            return res.status(422).json({ message: err.details[0].message})
        }

        res.status(500).json({ message: err.message});
    }
});

module.exports = router;