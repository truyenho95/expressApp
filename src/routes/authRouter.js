const express = require('express');
const { MongoClient } = require('mongodb');
const debug = require('debug')('app:authRouter');

const authRouter = express.Router();

function router() {
  authRouter.route('/signUp')
    .post((req, res) => {
      debug(req.body);

      // Create user
      req.login(req.body, () => {
        res.redirect('/auth/profile');
      });
    });

  authRouter.route('/profile')
    .get((req, res) => {
      res.json(req.user);
    });
  return authRouter;
}

module.exports = router;
