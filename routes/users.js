'use strict'

const express = require(`express`)
const router = express.Router()
const dbCall = require(`../db/dbCall.js`)

/* CREATE new user */
router.post(`/`, (req, res, next) => {
  const newUser = req.body

  dbCall.createUser(newUser)
    .then(() => res.sendStatus(200))
    .catch(err => next(err))
})

/* READ user */
router.get(`/`, (req, res, next) => {
  const userId = req.body.userId

  dbCall.readUser(userId)
    .then(user => res.send(user))
    .catch(err => next(err))
})

/* UPDATE user */
// router.patch(`/`, (req, res, next) => {
// })

/* DELETE user */
router.delete(`/`, (req, res, next) => {
  const userId = req.body.userId

  dbCall.deleteUser(userId)
    .then(() => res.sendStatus(200))
    .catch(err => next(err))
})

module.exports = router
