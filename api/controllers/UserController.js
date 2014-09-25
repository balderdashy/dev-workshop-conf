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



};

