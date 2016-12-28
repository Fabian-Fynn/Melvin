class Melvin {
  constructor(options) {
    this.socket = options.socket;
  }

  getInstance(options) {
    return new Melvin(options);
  }

  receiveQuestion(msg) {
    if (!this.name) {
      this.name = msg;
    }
      this.socket.emit('response', 'Hi there, I`m ' + this.name);
  }
};

module.exports = Melvin;
