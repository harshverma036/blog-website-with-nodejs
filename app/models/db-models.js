const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true,
    },
    date: {
        type: String
    },
    author: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Blog", Schema);