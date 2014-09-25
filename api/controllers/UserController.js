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

