const mongooseType = require('mongoose').Types;
const {
    Users,
    Thought
} = require('../models');

module.exports = {
    getUsers(req, res) {
        Users.find()
            .then((users) => res.json(users))
            .catch((err) => res.json(err));
    },

    getOneUser(req, res) {
        Users.findOne({ _id: req.params.userId })
            .select('-__v')
            .then(async (user) =>
                !user 
                    ? res.status(404).json({ message: 'No user with that ID' }) 
                    : res.status(200).json(user))
            .catch((err) => res.status(500).json(err));
    },

    createUser(req, res) {
        Users.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err));
    },

    updateUser(req, res) {
        Users.findOneAndUpdate(
            { _id: req.params.userId }, 
            { $set: req.body }, 
            { runValidators: true, new: true }
            )
            .then((user) => 
                !user 
                    ? res.status(404).json({ message: "No user with id!" }) 
                    : res.json(user)
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
                }
            )
    },

    deleteUser(req, res) {
        Users.findOneAndRemove({ _id: req.params.userId })
            .then((user) => 
                !user 
                    ? res.status(404).json({ message: 'No user with this ID' }) 
                    : Thought.deleteMany({ _id: { $in: user.thoughts }})
            )
            .then(() => res.json({ message: 'User and their thoughts are deleted.' })
            )
            .catch((err) => res.status(500).json(err));
    },

    addFriend(req, res) {
        Users.findOneAndUpdate(
            { _id: req.params.userId }, 
            { $addToSet: req.params.friendId }, 
            { new: true }
            )
            .then((user) => 
                !user 
                    ? res.status(404).json({ message: "No user with this id!" }) 
                    : res.json(user)
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            })
    },

    removeFriend(req, res) {
        Users.findOneAndUpdate(
            { _id: req.params.userId }, 
            { $pull: { friends: { friendId: req.params.friendId }}}, 
            { runValidators: true, new: true}
            )
            .then((user) =>
                !user 
                    ? res.status(404).json({ message: "No user with this id."}) 
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err)
            );
    },

    createReaction(req, res) {
        
    }
};