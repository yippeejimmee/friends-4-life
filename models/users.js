const {
    Schema,
    model
} = require('mongoose');

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trimmed: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, 'Please enter email'],
    },
    thoughts: [{
        type: Schema.Types.ObjectId,
        ref: 'Thought',
    }, ],
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
    }]
}, {
    toJSON: {
        virtuals: true,
        getters: true,
    },
    id: false,
});

userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

const user = model('User', userSchema);

module.exports = user;