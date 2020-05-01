var mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Memo = new Schema({
  type : String,
  content : String,
  nickname : String,
  time : Date
})

module.exports = mongoose.model('memo',Memo);
