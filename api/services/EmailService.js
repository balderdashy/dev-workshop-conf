module.exports = {


  /**
   * [send description]
   * @param  {Object}   options
   *           {
   *             email: 'foo@fooderdash.foo'
   *           }
   *
   * @param  {Function} cb      [description]
   * @return {[type]}           [description]
   */
  send: function (options, cb) {
    options = options || {};

    var nodemailer = require('nodemailer');

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

    var specialLink = 'http://localhost:1337/verify?token='+specialToken;

    // setup e-mail data with unicode symbols
    var mailOptions = {
        from: 'Lannisterical ✔ <noreply@stark.io>', // sender address
        to: options.email, // list of receivers
        subject: 'Recover your Lannisterical Password ✔', // Subject line
        text: 'Hey sorry to hear you\'re so forgetful but how about a new password????' + specialLink, // plaintext body
        html: 'Hey sorry to hear you\'re so forgetful but how about a new password???? <br/> <a href="' + specialLink +'">Click here to choose a new password</a>' // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, function(err, info){
      if (err) return cb(err);
      return cb(null, info);
    });
  }
};
