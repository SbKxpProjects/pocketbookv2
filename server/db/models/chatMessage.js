const Sequelize = require('sequelize');
const db = require('../db')

const ChatMessage = db.define('chatMessage', {
    message: {
        type: Sequelize.STRING
    }
})

module.exports = ChatMessage