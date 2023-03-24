const express = require("express");
const Conversations = require("../Models/Conversations");
const router = express.Router();

//create conversations
router.post("/", async (req, res) => {
  const newConversations = new Conversations({
    members: [req.body.senderId, req.body.recieverId],
  });

  try {
    const savedConversations = await newConversations.save();
    res.status(200).json(savedConversations);
  } catch (error) {
    console.log(error);
  }
});

// get conversations
router.get("/:userId", async (req, res) => {
  const conversations = await Conversations.find({
    members: req.params.userId,
  });
  try {
    res.status(200).json(conversations);
  } catch (error) {
    console.log(error);
  }
});

// get cov inludes two userid
router.get("/find/:firstUserId/:secondUserId", async (req, res) => {
  try {
    const conversations = await Conversations.findOne({
      members: { $all: [req.params.firstUserId, req.params.secondUserId] },
    });
     res.status(200).json(conversations);
  } catch (error) {
    res.status(200).json(error);
  }
});

module.exports = router;
