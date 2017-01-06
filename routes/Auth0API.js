'use strict'

const express = require(`express`)
const router = express.Router()
const request = require(`request`)

const apiToken = {
  method: `POST`,
  url: `https://gordonhgraham.auth0.com/oauth/token`,
  headers: { 'content-type': `application/json` },
  body:
  { client_id: `KQepMq022ynDzHytSOpbAX2YQHhhloPb`,
    client_secret: `PISdQsGojKxGN1uASlFtNDVG5jnRWJ6iOcwqBhWTOSFr0U2VP4ANGfSpLN0AeLu1`,
    audience: `https://gordonhgraham.auth0.com/api/v2/`,
    grant_type: `client_credentials` },
  json: true }

const userToken =

// POST--request access token for Auth0 API
router.get(`/:id`, (req, res, next) => {
  const userId = req.params.id
  request(apiToken, (error, response, body) => {
    if (error) { throw new Error(error) }

    const Auth0AccessToken = body.access_token

    request({
      method: `GET`,
      url: `https://gordonhgraham.auth0.com/api/v2/users/${userId}`,
      headers: { Authorization: `Bearer ${Auth0AccessToken}`, 'content-type': `application/json` }
    }, (error, response, body) => {
      if (error) { throw new Error(error) }
      const data = JSON.parse(body)
      res.send(data.identities[0].access_token)
    })
  })
})

// GET--request access token for fitbit API
// GET--request activity from fitbit API

module.exports = router
