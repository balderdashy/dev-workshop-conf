/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  login: function (req, res) {

    // This sends an HTTP 200 response with the data
    // you provided encoded as json.
    res.json({
      hello: 'world'
    });
  }

};

