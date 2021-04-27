const Sequelize = require('sequelize');
const db = require('../db');

const UserEvent = db.define('userEvent', {
    host: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }
})

module.exports = UserEvent