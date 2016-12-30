const mongoose = require('mongoose');
mongoose.connect('localhost:27017/melvin');
const Schema = mongoose.Schema;
const memoriesSchema = new Schema({
  username: String,
  usergender: String
},{collection: 'memoriesData'});

const MemoriesData = mongoose.model('MemoriesData', memoriesSchema);
const topicSchema = new Schema({
  topic: String,
  questions: [{
    question: String,
    answers: Array
  }]
},{collection: 'topicData'});

const TopicData = mongoose.model('TopicData', topicSchema);
module.exports = {
  learn: function(event, callback) {
    if (event.topic === "topics") {
      this.learnNewTopic(event, callback);
    } else {
      let topic = TopicData.find({topic: event.topic}).then(function(doc) {
        callback(doc);
      });
    }
  },
  learnNewTopic: function(event, callback) {
    this.getTopic(event.msg, function(topic) {
      if (topic === null) {
        topic = {
          topic: event.msg,
          questions: []
        };

        var data = new TopicData(topic);
        data.save();
        return callback(data);
      } else {
        callback("Topic already exists");
      }
    });
  },
  getMemories: (filter, callback) => {
    MemoriesData.find()
      .then(function(doc) {
        callback(doc);
      });
  },
  getTopics: (callback) => {
    TopicData.find()
      .then(function(doc) {
        callback(doc);
      });
  },
  getTopic: (topicName, callback) => {
    TopicData.findOne({'topic': topicName}).then(function(doc) {
      callback(doc);
    });
  }
}
