var mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserInfo = new Schema({
  id: String,
  pwd : String,
  nickname : String
})

module.exports = mongoose.model('user_info',UserInfo);
