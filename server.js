'use strict'

// const favicon = require(`serve-favicon`)
const express = require(`express`)
const path = require(`path`)
const logger = require(`morgan`)
const cookieParser = require(`cookie-parser`)
const bodyParser = require(`body-parser`)

// const users = require(`./routes/users`)
// const auth = require(`./routes/auth`)
const Auth0API = require(`./Auth0API`)

const app = express()

// view engine setup
app.set(`views`, path.join(__dirname, `views`))
app.set(`view engine`, `hbs`)

app.use(logger(`dev`))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, `public`)))

// app.use(`/users`, users)
// app.use(`/auth`, auth)
app.use(`/`, Auth0API)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error(`Not Found`)

  err.status = 404
  next(err)
})

// error handlers
if (app.get(`env`) === `development`) {
  app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.render(`error`, {
      message: err.message,
      error: err
    })
  })
}

app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.render(`error`, {
    message: err.message,
    error: {}
  })
})

module.exports = app
