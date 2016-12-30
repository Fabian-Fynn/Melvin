const brain = require('./database.js');

class Melvin {
  constructor(options) {
    this.socket = options.socket;
    const that = this;
    const brainSettings = brain.getMemories(null, function(memories) {
      if (!memories.username) {
        //askQuestion('username');
      }
    });
    const topics = brain.getTopics(function(topics) {
      that.topics = topics;
    });
  }

  receiveQuestion(msg) {
    msg = msg.toLowerCase();
    let response = null;

    if (msg.includes('!endlearn')) {
      this.changeTopic(null);
      response = "Ok let's talk about something else.";
    } else if (this.topic === "!learn") {
      response = this.learn(msg);
      return;
    } else if (msg.includes('!learn')) {
      this.changeTopic('!learn');
      this.reply("Ok, let's learn something!");
      response = "What do want me to learn?";
    }
    if (response !== null) {
      this.reply(response);
    } else {
      this.reply("I'm sorry, I don't understand");
    }
  }

  askQuestion(topic) {
    this.topic = topic;
    this.socket.emit('response', '');
  }

  reply(msg) {
    this.socket.emit('response', msg);
  }

  learn(msg) {
    if (!this.subTopic) {
      this.subTopic = msg;
      this.reply(`Ok, I am ready to learn about ${this.subTopic}`);
    } else {
      const that = this;
      brain.learn({topic: this.subTopic, msg: msg}, (result) => {
        if (typeof result !== 'string') {
          this.reply(`I\`ve added ${msg} to ${this.subTopic}`);
        } else {
          this.reply(result);
        }
      });
    }
    return null;
  }

  changeTopic(topic) {
    this.topic = topic;
    this.subTopic = "";
  }
};

module.exports = Melvin;
