const express = require('express');
const { MongoClient, ObjectID } = require('mongodb');
const debug = require('debug')('app:bookRouter');

const bookRouter = express.Router();

function router(nav) {
  bookRouter.route('/')
    .get((req, res) => {
      const url = 'mongodb://localhost:27017';
      const dbName = 'libraryApp';

      (async function mongo() {
        let client;
        try {
          // connect mongo
          client = await MongoClient.connect(url);
          debug('Connected correctly to server');

          // connect database
          const db = client.db(dbName);
          // connect collection
          const col = await db.collection('books');
          // select all
          const books = await col.find().toArray();

          res.render(
            'bookListView',
            {
              title: 'Library',
              nav,
              books
            },
          );
        } catch (err) {
          debug(err.stack);
        }
        client.close();
      }());
    });

  bookRouter.route('/:id')
    .get((req, res) => {
      const { id } = req.params;
      const url = 'mongodb://localhost:27017';
      const dbName = 'libraryApp';

      (async function mongo() {
        let client;
        try {
          // connect mongo
          client = await MongoClient.connect(url);
          debug('Connected correctly to server');

          // connect database
          const db = client.db(dbName);
          // connect collection
          const col = await db.collection('books');
          // select 1 item in collection books
          const book = await col.findOne({ _id: new ObjectID(id) });
          debug(book);

          res.render(
            'bookView',
            {
              title: 'Library',
              nav,
              book
            },
          );
        } catch (err) {
          debug(err.stack);
        }
      }());
    });

  return bookRouter;
}

module.exports = router;
