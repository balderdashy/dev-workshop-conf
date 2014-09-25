/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://links.sailsjs.org/docs/config/bootstrap
 */

module.exports.bootstrap = function(cb) {

  User.count({
    email: 'admin@dev.com'
  }).exec(function (err, count) {
    if (err) return cb(err);

    if (count >= 1) {
      return cb();
    }

    User.create({
      email: 'admin@dev.com',
      password: 'abc123'
    }).exec(function (err, newUser) {
      if (err) return cb(err);

      // It's very important to trigger this callback method when you are finished
      // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
      cb();
    });

  });
};
