'use strict'

if (process.env.NODE_ENV !== `production`) {
  require(`dotenv`).config()
}

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

// passport.serializeUser((user, done) => {
//   done(null, user.id)
// })
//
// passport.deserializeUser((id, done) => {
//   User.findById(id, (err, user) => {
//     done(err, user)
//   })
// })

passport.use(new FitbitStrategy({
    clientID: process.env.fitbit_clientID,
    clientSecret: process.env.fitbit_clientSecret,
    callbackURL: `http://127.0.0.1:3000/auth/fitbit/callback`
  },
  (accessToken, refreshToken, profile, done) => {
    const user = {
      display_name: profile.displayName,
      fitbit_id: profile.id,
      accessToken,
      refreshToken,
      avatar: profile._json.user.avatar,
      gender: profile._json.user.gender,
      height: profile._json.user.height,
      stride_length: profile._json.user.strideLengthWalking

      // step_count: profile.id,
      // step_goal: profile.id
    }

/* stuff from passport, rewrite and delete */
    // User.findOrCreate({ fitbitId: profile.id }, (err, user) => {
    //   return done(err, user)
    // })

    dbCall.readUser(user.fitbit_id)
      .then(result => {
        if (result) {
          // udpate user
          // dbCall.updateUser(result)
        } else {
          // create user
          dbCall.createUser(user)
            .then()

            // .catch(err => /* what do I put here to handle errors */ )
        }
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
