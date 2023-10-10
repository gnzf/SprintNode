const knex = require("knex")({
    client: "pg",
    connection: {
      host: "localhost",
      user: "postgres",
      port: 5432,
      password: "Bolso1998",
      database: "sprint9",
    },
  });
  
  module.exports = knex;