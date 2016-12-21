'use strict'

exports.up = knex => {
  return knex.schema.dropTableIfExists(`users`).then(() => {
    return knex.schema.createTable(`users`, table => {
      table.increments()
      table.string(`display_name`).notNullable().unique()
      table.string(`fitbit_id`).notNullable()
      table.string(`accessToken`).notNullable()
      table.string(`refreshToken`).notNullable()
      table.string(`avatar`)
      table.string(`gender`).notNullable().defaultTo(`null`)
      table.float(`height`)
      table.float(`stride_length`)
      table.integer(`step_count`)
      table.integer(`step_goal`)
      table.timestamps(true, true)
    })
  })
}

exports.down = knex => {
  return knex.schema.dropTable(`users`)
}
