const mongoose = require('mongoose')

const articleSchema = new mongoose.Schema({
  title :{
    type: String,
    required: true
  },
  description: {
    type: String,
    default: "Cos jest nie tak"
  },
  creationDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Article', articleSchema);
