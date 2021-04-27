const Sequelize = require('sequelize');
const db = require('../db');
const crypto = require('crypto');

const User = db.define('user', {
    firstName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false, 
        validate: {
            notEmpty: true
        }
    },
    userName: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        validate: {
            isEmail: true,
            notEmpty: true
        }
    },
    image: {
        type: Sequelize.TEXT,
        dafault: 'https://cdn.nohat.cc/thumb/f/720/comvecteezy268447.jpg'
    },
    password: {
        type: Sequelize.STRING,
        get() {
            return () => this.getDataValue('password')
        },  
    },
    salt: {
        type: Sequelize.STRING,
        get() {
            return () => this.getDataValue('salt')
        }
    },
});

module.exports = User

//instance methods 
User.prototype.correctPassword = function(candidatePwd) {
    return User.encryptPassword(candidatePwd, this.salt()) === this.password;
};

//class methods
User.generateSalt = function() {
    return crypto.randomBytes(16).toString('base64');
};

User.encryptPassword = function(plainText, salt) {
    return crypto
    .createHash('RSA-SHA256')
    .update(plainText)
    .update(salt)
    .digest('hex');
};

//hooks 
const setSaltAndPassword = (user) => {
    if (user.changed('password')) {
        user.salt = User.generateSalt();
        user.password = User.encryptPassword(user.password(), user.salt());
    }
};

User.beforeCreate(setSaltAndPassword);
User.beforeUpdate(setSaltAndPassword);
User.beforeBulkCreate((users)=> {
    users.forEach(setSaltAndPassword);
});