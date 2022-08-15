const { Users, Thought } = require('../models');

module.exports = {
    getThoughts(req, res) {
        Thought.find()
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.json(err));
    },

    getOneThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .select('-_v')
            .then(async (thought) =>
                !thought
                ? res.status(404).json({
                    message: 'No thought with this ID'
                })
                : res.status(200).json(thought))
            .catch((err) => res.status(500).json(err));
    },

    createThought(req, res) {
        Thought.create(req.body)
            .then((thought) => {
                return Users.findOneAndUpdate(
                    { _id: req.body.userId },
                    { $addToSet: { thoughts: thought._id } },
                    { new: true }
                )
                .then((user) => {
                    !user 
                    ? res.status(404).json({
                        message: 'No user with this ID'
                    })
                    : res.json(user);
                })
                .catch((err) => res.status(500).json(err));
            })
            .catch((err) => res.status(500).json(err));
    },

    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { new: true }
            )
            .then((thought) => 
                !thought
                    ? res.status(404).json({ message: 'No thought with this id.'})
                    : res.json(thought)
            )
            .catch((err) => {
                console.log(err)
                res.status(500).json(err);
                }
            );
    },

    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
            .then((thought) => 
                !thought
                    ? res.status(404).json({ message: 'No thought with this id.'})
                    : Users.findOneAndUpdate(
                        { thoughts: req.params.thoughtId },
                        { $pull: { thoguhts: req.params.thoughtId}},
                        { new: true }
                    )   
            )
            .catch((err) => {
                console.log(err)
                res.status(500).json(err);
                }   
            );
    },

    createReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body} },
            { new: true }
            )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with this id.'})
                    : res.json(thought)
            )
            .catch((err) => {
                console.log(err)
                res.status(500).json(err);
            })     
    },

    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId }, 
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { new: true } 
            )
            .then((thought) =>
            !thought
                ? res.status(404).json({ message: 'No thought with this id.'})
                : res.json(thought)
            )
            .catch((err) => {
                console.log(err)
                res.status(500).json(err);
            })  
    }
};
        