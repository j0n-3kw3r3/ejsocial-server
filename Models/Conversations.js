const mongoose = require("mongoose");

const ConversationsSchema = mongoose.Schema(
  {
    members: {
      type:Array
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Conversations", ConversationsSchema);
