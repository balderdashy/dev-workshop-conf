/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  login: function (req, res) {
    User.findOne({
      email: req.param('email'),
      password: req.param('password')
    })
    .exec(function afterDatabaseResponds(err, user) {
      if (err) {
        return res.negotiate(err);
      }

      if (!user) {
        return res.notFound();
      }

      // Save the user id to the session
      req.session.user = user.id;

      return res.ok();
    });
  },


  logout: function (req, res) {
    delete req.session.user;
    return res.ok();
  },

  requestNewPassword: function (req, res) {

    // Check to see if the provided email address corresponds
    // with a real user account.  If not, we can't send an email to them
    // (it would be a bad idea)
    User.findOne({
      email: req.param('email')
    }).exec(function (err, user) {
      if (err) return res.negotiate(err);
      if (!user) return res.badRequest('That email doesnt match a known user.');

      var hat = require('hat');
      var specialToken = hat();
      User.update({id: user.id}, {
        token: req.param('token')
      }).exec(function (err) {
        if (err) return res.negotiate(err);

        EmailService.send({
          email: req.param('email')
        }, function afterDoneSending (err, info){
          if(err) {
            return res.negotiate(err);
          }
          return res.ok();
        });
      });

    });

  },

  verifyRequestPasswordToken: function (req, res) {
    User.findOne({
      token: req.param('token')
    }).exec(function (err, user) {
      if (err) return res.negotiate(err);
      if (!user) return res.forbidden();

      // Log the user in
      req.session.user = user.id;

      return res.ok();
    });
  },


  securePage: function (req, res) {

    // Look up the currently-logged-in user in the database
    // So we can pass the view their name and stuff
    User.findOne({
      id: req.session.user
    })
    .exec(function (err, me) {
      if (err) return res.negotiate(err);

      return res.view('secure', {
        user: me
      });
    });
  }

};

