const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = Schema({
    caption: {
        type: String
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    comments: [
        {
            message: {
                type: String,
                required: true
            },
            author: {
                type: Schema.Types.ObjectId,
                ref: "User"
            },
            date: {
                type: Date,
                default: Date.now
            }
        }
    ],
    
}, {
    timestamps: true
});

module.exports = mongoose.model('Post', postSchema);