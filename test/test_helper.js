// access mongoose module from node_modules
const mongoose = require('mongoose')

// will run before ALL of the tests
// must pass done through because mongo

before((done) => {
  mongoose.connect('mongodb://localhost:27017/library_test', { useNewUrlParser: true })

  mongoose.connection
    .once('open', () => { done() })
    .on('error', (error) => {
      console.warn('Warning', error)
    })
  
  mongoose.set('useFindAndModify', false);
})

beforeEach((done) => {
  mongoose.connection.collections.books.drop(() => {
    done()
  })
})
