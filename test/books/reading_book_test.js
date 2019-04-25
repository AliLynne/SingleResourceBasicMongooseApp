const assert = require('chai').assert
const Book = require('../../src/models/book_model')

describe('Reading books out of the database', () => {
  let testBook

  beforeEach((done) => {
    testBook = new Book({ 
      title: 'I am a book title',
      author: 'Book Author',
      summary: 'Book summary lorum ipsum yadda yadda dabba dabb do'
    })

    testBook.save()
      .then(() => done())
  })

  it('finds all books with a title of \'I am a book title\'', (done) => {
    Book.find({ title: 'I am a book title'})
      .then((books) => {
        assert(books[0]._id.toString() === testBook._id.toString())
        done()
      })
  })

  it('finds a book with a particular id', (done) => {
    Book.findOne({ _id: testBook._id })
      .then((book) => {
        assert(book.title === 'I am a book title')
        done()
      })
  })

  it('finds all books with a particular author', (done) => {
    Book.find({ author: 'Book Author' })
      .then((books) => {
        assert.typeOf(books, 'array')
        assert(books.length === 1)
        assert(books[0].author === 'Book Author')
        done()
      })
  })
  it('finds all books whose summary contains a certain string')
})