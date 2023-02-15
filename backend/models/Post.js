const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = Schema({
    note: {
        type: String
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    high: {
        type: String
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Post', postSchema);