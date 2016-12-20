'use strict'

const knex = require(`./knex`)

/* CREATE new user */
const createUser = newUser => {
  return knex(`users`)
    .insert(newUser, `*`)
}

/* READ user */
const readUser = userId => {
  return knex(`users`)
    .select(`*`)
    .where(`id`, userId)
    .first()
}

/* UPDATE user */
// const updateUser = userId => {
// }

/* DELETE user */
const deleteUser = userId => {
  return knex(`users`)
    .where(`id`, userId)
    .del()
}

module.exports = {
  createUser,
  readUser,
  deleteUser

  // updateUser,
}
