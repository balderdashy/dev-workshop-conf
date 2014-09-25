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
    var nodemailer = require('nodemailer');

    // Check to see if the provided email address corresponds
    // with a real user account.  If not, we can't send an email to them
    // (it would be a bad idea)
    User.findOne({
      email: req.param('email')
    }).exec(function (err, user) {
      if (err) return res.negotiate(err);
      if (!user) return res.badRequest('That email doesnt match a known user.');

      // create reusable transporter object using SMTP transport
      var transporter = nodemailer.createTransport({
          service: 'Gmail',
          auth: {
              user: 'sailsjs.dev@gmail.com',
              pass: 'rabb1tparty'
          }
      });

      // NB! No need to recreate the transporter object. You can use
      // the same transporter object for all e-mails

      // setup e-mail data with unicode symbols
      var mailOptions = {
          from: 'Lannisterical ✔ <noreply@stark.io>', // sender address
          to: req.param('email'), // list of receivers
          subject: 'Recover your Lannisterical Password ✔', // Subject line
          text: 'Hey sorry to hear you\'re so forgetful but how about a new password???? LINK HERE', // plaintext body
          html: 'Hey sorry to hear you\'re so forgetful but how about a new password???? LINK HERE' // html body
      };

      // send mail with defined transport object
      transporter.sendMail(mailOptions, function(err, info){
          if(err) {
            return res.negotiate(err);
          }
          return res.ok();
      });

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

