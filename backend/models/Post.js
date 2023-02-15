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
    },
    moodPic: {
        type: String
    },
    day: {
        type: Date
    },
    rating: {
        type: Number
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Post', postSchema);