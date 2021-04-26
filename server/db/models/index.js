// this index.js is where we require in all the models and define associations and export

const User = require('./user');
const Book = require('./book');
const Event = require('./event');
const ChatMessage = require('./chatMessage');
const UserBook = require('./userBook');
const UserEvent = require('./userEvent');

//associations 
//User has many Book, and Book has many User
User.belongsToMany(Book, {through: UserBook})
Book.belongsToMany(User, {through: UserBook})

//Book has many Userbook, Userbook belongs to UserBook
Book.hasMany(UserBook);
UserBook.belongsTo(Book);

//User belongs to many Event, and Event belongs to many User 
User.belongsToMany(Event, {through: UserEvent});
Event.belongsToMany(User, {through: UserEvent});

//User has many ChatMessage, and ChatMessage belongs to User
User.hasMany(ChatMessage);
ChatMessage.belongsTo(User)

module.exports = {
    User, 
    Book,
    Event,
    ChatMessage,
    UserBook,
    UserEvent
}
