'use strict'

const express = require(`express`)
const router = express.Router()
const request = require(`request`)

const apiToken = {
  method: `POST`,
  url: `https://gordonhgraham.auth0.com/oauth/token`,
  headers: { 'content-type': `application/json` },
  body:
  { client_id: `XXXXXXXX`,
    client_secret: `XXXXXXXX`,
    audience: `XXXXXXXX`,
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

      request({
        method: `GET`,
        url: `https://api.fitbit.com/1/user/-/activities/date/today.json`,
        headers: { 'Authorization': `Bearer ${data.identities[0].access_token}` }
      }, (error, response, body) => {
        if (error) { throw new Error(error) }
        res.send(body)
      })
    })
  })
})

module.exports = router
