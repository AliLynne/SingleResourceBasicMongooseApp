const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BookSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Book needs a title']
  },
  author: {
    type: String,
    required: [true, 'Book needs an author']
  },
  summary: {
    type: String,
    required: [true, 'Book needs a summary']
  }
})

const Book = mongoose.model('book', BookSchema)
module.exports = Book