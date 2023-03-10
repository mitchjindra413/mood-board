var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs')
const passport = require('passport')
const mongoose = require('mongoose')
const User = mongoose.model('User')
const { loginUser, restoreUser } = require('../../config/passport')
const { isProduction } = require('../../config/keys')
const validateRegisterInput = require('../../validations/register')
const validateLoginInput = require('../../validations/login')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json({
    message: "GET /api/users"
  })
});

// Sign up user
router.post('/register', validateRegisterInput, async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email })

  if (user) {
    const err = new Error("Validation")
    err.statusCode = 400

    const errors = {}
    if(user.email === req.body.email){
      errors.email = "That email has already been taken"
    }

    err.errors = errors
    return next(err)
  }

  const newUser = new User({
    name: req.body.name,
    email: req.body.email
  })

  bcrypt.genSalt(10, (err, salt) => {
    if(err) throw err
    bcrypt.hash(req.body.password, salt, async (err, hashedPassword) => {
      if(err) throw err
      try {
        newUser.hashedPassword = hashedPassword
        const user = await newUser.save()
        return res.json(await loginUser(user))
      }
      catch(err) {
        next(err)
      }
    })
  })
})

// Login user
router.post('/login', validateLoginInput, async(req, res, next) => {
  passport.authenticate('local', async function(err, user) {
    if(err) return next(err)
    if(!user) {
      const err = new Error('Invalid credentials')
      err.statusCode = 400
      err.errors = { email: "Invalid credentials"}
      return next(err)
    }
    return res.json(await loginUser(user))
  })(req, res, next)
})

// Get current logged in user
router.get('/current', restoreUser, (req, res) => {
  if(!isProduction){
    const csrfToken = req.csrfToken()
    res.cookie("CSRF-TOKEN", csrfToken)
  }
  if(!req.user) return res.json(null)
  res.json({
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email
  })
})

module.exports = router;
