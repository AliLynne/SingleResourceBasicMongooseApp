const assert = require('chai').assert
const Book = require('../../src/models/book_model')

describe('Deleting a book', () => {
  let newBook;

  beforeEach((done) => {
    newBook = new Book({ 
      title: 'Test title',
      author: 'Test Author',
      summary: 'Test Summary'
    })
    newBook.save()
      .then(() => done())
  })
  // model = newBook
  it('model instance remove', (done) => {
    newBook.remove()
      .then(() => Book.findOne({ title: 'Test title'}))
      .then((user) => {
        assert(user === null, 'expected user === null')
        done()
      })
  })
  // class = Book
  it('class method deleteMany', (done) => {
    // removes a bunch of records with given criteria
    Book.deleteMany({ title: 'Test title' })
      .then(() => Book.findOne({ title: 'Test title'}))
      .then((book) => {
        assert(book === null)
        done()
      })
  })
  it('class method findAndRemove', (done) => {
    Book.findOneAndRemove({ title: 'Test title' })
      .then(() => Book.findOne({ title: 'Test title'}))
      .then((book) => {
        assert(book === null)
        done()
      })
  })
  it('class method findByIdAndRemove', (done) => {
    
    Book.findByIdAndRemove(newBook._id)
      .then(() => Book.findOne({ title: 'Test title'}))
      .then((book) => {
        assert(book === null)
        done()
      })
  })
})