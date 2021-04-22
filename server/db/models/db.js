const Sequelize = require("sequelize");
const pkg = require("package.json");

// Will change db name depending if node environment is in test or not
const databaseName =
  pkg.name + (process.env.NODE_env === "test" ? "-test" : "");

let config;

//
if (process.env.DATABASE_URL) {
  config = {
    logging: false,
    ssl: true,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  };
} else {
  config = {
    logging: false,
  };
}

const db = new Sequelize(
  process.env.DATABASE_URL || `postgres://localhost:5432/${databaseName}`,
  config
);

module.exports = db;

// If in test mode, close db connection
if (process.env.NODE_ENV === "test") {
  after("close database connection", () => db.close());
}
