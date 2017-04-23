// Modified from: https://www.npmjs.com/package/pop3-n3

var N3 = require('../../node_modules/pop3-n3/n3').N3,
  MessageStore = require('../../node_modules/pop3-n3/messagestore').MessageStore,
  server_name = 'fw.node.ee';

var markdown = require('node-markdown').Markdown;

// runs after the user is successfully authenticated
MessageStore.prototype.registerHook = function () {

    // Add a new message to the users inbox (MessageStore)

  var curtime = new Date().toLocaleString(),
    message = 'Tere ÕÜÄÖŠ!\n------------------\n\nKell on praegu **' + curtime + '**\n\nVaata ka:\nAmount: $100.00\n\n  * [Delfi](http://www.delfi.ee)\n  * [NETI' +
                '](http://www.neti.ee)\n  * [EPL](http://www.epl.ee)\n\n*Koodiblokk*\n\n    for(v' +
                'ar i=0;i<100;i++){\n        alert(i+5);\n    }\n\n\nParimat,  \nKellamees';

  this.addMessage({
    toName: 'Andris Reinman',
    toAddress: 'andris.reinman@gmail.com',
    fromName: 'Ämblik Kämbu',
    fromAddress: 'amblik.kambu@node.ee',
    subject: 'Kattare: Payment Received',
    text: message,
    html: markdown(message)
  });
};

// Currenlty any user with password "12345" will be authenticated successfully
function AuthStore(user, auth) {
  var password;
  if (user) {
    password = 12345;
  }
  return auth(password);
}

// Setup servers for both port 110 (standard) and 995 (secure) Don't listen on
// standard port 110 because it requires root privileges.  Use 1110 instead.
N3.startServer(/* 110, */
1110, server_name, AuthStore, MessageStore);

// Custom authentication method: FOOBAR <user> <pass>
N3.extendAUTH('FOOBAR', function (authObj) {
  var params = authObj
            .params
            .split(' '),
    user = params[0],
    pass = params[1];

  if (!user) // username is not set
    return '-ERR Authentication error. FOOBAR expects <user> <password>';

  authObj.user = user;
  return authObj.check(user, pass);
});
