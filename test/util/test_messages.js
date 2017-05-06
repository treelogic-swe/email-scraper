const markdown = require('node-markdown').Markdown;
const cloneDeep = require('lodash/cloneDeep');
const merge = require('lodash/merge');

const curtime = new Date().toLocaleString();

const messages = [
  'FOO Tere ÕÜÄÖŠ!\n------------------\n\nKell on praegu **' + curtime + '**\n\nVaata ka:\nAmount: $100.00\n\n  * [Delfi](http://www.delfi.ee)\n  * [NETI]' +
      '(http://www.neti.ee)\n  * [EPL](http://www.epl.ee)\n\n*Koodiblokk*\n\n    for(va' +
      'r i=0;i<100;i++){\n        alert(i+5);\n    }\n\n\nParimat,  \nKellamees',
  'BAR Tere ÕÜÄÖŠ!\n------------------\n\nKell on praegu **' + curtime + '**\n\nVaata ka:\nAmount: $110.00\n\n  * [Delfi](http://www.delfi.ee)\n  * [NETI]' +
      '(http://www.neti.ee)\n  * [EPL](http://www.epl.ee)\n\n*Koodiblokk*\n\n    for(va' +
      'r i=0;i<100;i++){\n        alert(i+5);\n    }\n\n\nParimat,  \nKellamees',
  'BAT Tere ÕÜÄÖŠ!\n------------------\n\nKell on praegu **' + curtime + '**\n\nVaata ka:\nAmount: $100.00\n\n  * [Delfi](http://www.delfi.ee)\n  * [NETI]' +
      '(http://www.neti.ee)\n  * [EPL](http://www.epl.ee)\n\n*Koodiblokk*\n\n    for(va' +
      'r i=0;i<100;i++){\n        alert(i+5);\n    }\n\n\nParimat,  \nKellamees',
];

const messageMetas = [
  {
    toName: 'Andris Reinman',
    toAddress: 'andris.reinman@gmail.com',
    fromName: 'Ämblik Kämbu',
    fromAddress: 'amblik.kambu@node.ee',
    subject: 'Kattare: Payment Received'
  }, {
    toName: 'Foo Bar',
    toAddress: 'bar.reinman@gmail.com',
    fromName: 'baz Kämbu',
    fromAddress: 'foo.kambu@node.ee',
    subject: 'Kattare: Payment Failed'
  }, {
    toName: 'Bat Baz',
    toAddress: 'bat.reinman@gmail.com',
    fromName: 'baz Kämbu',
    fromAddress: 'foo.kambu@node.ee',
    subject: 'Kattare: Payment Received'
  }
];

const emails = messages.map((msg, i) => merge(cloneDeep(messageMetas[i]), {
  text: msg,
  html: markdown(msg)
}));

module.exports = emails;
