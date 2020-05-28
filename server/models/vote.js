const mongoose = require('mongoose');
const voteSchema = new mongoose.Schema({
	name: String,
	content: String,
	agree: Number,
	disagree: Number,
	abstention: Number,
});
module.exports = mongoose.model('Vote', voteSchema);
