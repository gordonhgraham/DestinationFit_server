'use strict'

const express = require(`express`)
const router = express.Router()
const passport = require(`passport`)

router.get(`/fitbit`, passport.authenticate(`fitbit`))

router.get(`/fitbit/callback`,
  passport.authenticate(`fitbit`, { failureRedirect: `/login` }),
  (req, res) => {
    // Successful authentication, redirect home.
    res.redirect(`/`)
  })

// router.get(`/logout`)

module.exports = router
