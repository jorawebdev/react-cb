var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// create a schema
module.exports = new Schema({
  gitlabId: String,
  name: String,
  author: String,
  authorEmail: String,
  description: String,
  keywords: [String],
  versions:[{
    version:String,
    date: Date,
    dependent: [],
    dependencies:{},
    changelog:[{}]
  }]
});
// create a model using it
//mongoose.model('Module', dependenciesSchema);
