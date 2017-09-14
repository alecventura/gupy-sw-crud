// const mongoose = require('mongoose');

// function UsersData(connection) {
//   this._conn = connection();
// }

// const UserSchema = mongoose.Schema({
//   name: String,
//   user: String,
// });

// const User = mongoose.model('User', UserSchema);

// UsersData.prototype.insert = function (user) {
//   const newUser = new User(user);
//   newUser.save((err, fluffy) => {
//     if (err) return console.error(err);
//   });
// };

// module.exports = function () {
//   return UsersData;
// };
