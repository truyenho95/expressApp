const express = require('express');
const { MongoClient } = require('mongodb');
const passport = require('passport');
const debug = require('debug')('app:authRouter');

const authRouter = express.Router();

function router(nav) {
  authRouter.route('/signUp')
    .post((req, res) => {
      // Get username & password from client's form
      const { username, password } = req.body;

      const url = 'mongodb://localhost:27017';
      const dbName = 'libraryApp';

      (async function addUser() {
        let client;
        try {
          client = await MongoClient.connect(url);
          debug('Connected correctly to server');

          const db = client.db(dbName);

          const col = db.collection('users');
          const user = { username, password };

          const results = await col.insertOne(user);
          debug(results);

          // Login user and redirect link
          req.login(results.ops[0], () => {
            res.redirect('/auth/profile');
          });
        } catch (err) {
          debug(err.stack);
        }
        client.close();
      }());
      debug(req.body);
    });

  authRouter.route('/signIn')
    .get((req, res) => {
      res.render('signin', {
        nav,
        title: 'Sign In'
      });
    })
    .post(passport.authenticate('local', {
      successRedirect: '/auth/profile',
      failureRedirect: '/'
    }));

  authRouter.route('/profile')
    .get((req, res) => {
      res.json(req.user);
    });
  return authRouter;
}

module.exports = router;
