'use strict'

const express = require(`express`)
const path = require(`path`)
// const favicon = require(`serve-favicon`)
const logger = require(`morgan`)
const cookieParser = require(`cookie-parser`)
const bodyParser = require(`body-parser`)
const passport = require(`passport`)
const FitbitStrategy = require(`passport-fitbit-oauth2`).FitbitOAuth2Strategy

// const routes = require(`./routes/index`)
const users = require(`./routes/users`)
const auth = require(`./routes/auth`)

const app = express()

// view engine setup
app.set(`views`, path.join(__dirname, `views`))
app.set(`view engine`, `hbs`)

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, `public`, `favicon.ico`)))

app.use(logger(`dev`))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, `public`)))
app.use(passport.initialize())

// app.use(`/`, routes)
app.use(`/users`, users)
app.use(`/auth`, auth)

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user)
  })
})

passport.use(new FitbitStrategy({
    clientID: `2286Q9`,
    clientSecret: `3405601f2ca6fd8202d7341362a1c509`,
    callbackURL: "http://127.0.0.1:3000/auth/fitbit/callback"
  },
  (accessToken, refreshToken, profile, done) => {
    User.findOrCreate({ fitbitId: profile.id }, (err, user) => {
      return done(err, user)
    })
  }
))

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
