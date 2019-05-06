const MongoClient = require('mongodb').MongoClient
const assert = require('assert')
const faker = require('faker')
const _ = require('lodash')
const BOOKS_TO_ADD = 30
const MINIMUM_BOOKS = 50

// Connection URL
const url = 'mongodb://localhost:27017'

// Database Name
const dbName = 'library_app'

const client = new MongoClient(url, { useNewUrlParser: true })

client.connect(function(err) {
  assert.equal(null, err)
  console.log('Connected successfully to server')

  const db = client.db(dbName)

  const books = db.collection('books')
  books.countDocuments()
    .then((count) => {
      if (count < MINIMUM_BOOKS) {
        insertBooks(db, function() {
          client.close()
        })
      } else {
        client.close()
      }
    })
})

const insertBooks = function(db, callback) {
  const collection = db.collection('books')
  const books = _.times(BOOKS_TO_ADD, () => createBook())
  collection.insertMany(books).then(() => {console.log('inserted records')})
}

function createBook() {
  return {
    title: createTitle(),
    author: faker.name.findName(),
    summary: faker.lorem.sentences(5)
  }
}

function createTitle() {
  const title = faker.lorem.words(randomBetween(2,6))
  return (capitalize_Words(title))
}

function capitalize_Words(str) {
  return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

function randomBetween(min, max) {
  return ~~(Math.random() * (max - min) + min)
}