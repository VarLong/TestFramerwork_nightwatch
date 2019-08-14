module.exports = {
  tags: ['google'],

  'Demo test Google' : function (client) {
    console.log("google! s")
    client
      .url('http://google.no')
      .pause(1000);

    client.expect.element('body').to.be.present;

    client.expect.element('body').to.have.attribute('class').which.contains('vasq');
    client.expect.element('body').to.have.attribute('class').which.matches(/vasq$/);
    client.expect.element('body').to.have.attribute('class').before(1000);
    console.log("google!")

    client.end();
  }
};
