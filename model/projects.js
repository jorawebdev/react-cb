var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// create a schema
var projectSchema = new Schema({
  id: String,
  version: String,
  date: Date
});
// create a model using it
mongoose.model('Project', projectSchema);
