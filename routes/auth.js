'use strict'

const express = require(`express`)
const router = express.Router()
const passport = require(`passport`)

router.get(`/auth/fitbit`, passport.authenticate(`fitbit`))

router.get(`/auth/fitbit/callback`,
  passport.authenticate(`fitbit`, { failureRedirect: `/login` }),
  (req, res) => {
    // Successful authentication, redirect home.
    res.redirect(`/`)
  })

// router.get(`/logout`)

module.exports = router
