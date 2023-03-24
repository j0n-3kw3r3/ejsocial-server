const express = require("express");
const router = express.Router();
const Messages = require("../Models/Messages");

// create message

router.post("/", async (req, res) => {
  const message = await new Messages(req.body);
  try {
    newMessage = await message.save();
    res.status(200).json(newMessage);
  } catch (err) {
    console.log(err);
  }
});

// get message
router.get("/:conversationId", async (req, res) => {
  const message = await Messages.find({
    conversationId: req.params.conversationId,
  });
  try {
    res.status(200).json(message);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
