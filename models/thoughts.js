const {
    model,
    Schema
} = require('mongoose');
const reactionSchema = require('./reactions.js')

const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        min_length: 1,
        max_length: 280,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (date) = date.toLocaleString(),
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [reactionSchema],
}, {
    toJSON: {
        virtuasl: true,
        getters: true,
    },
    id: false,
});

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const thought = model('Thought', thoughtSchema);

module.exports = thought;