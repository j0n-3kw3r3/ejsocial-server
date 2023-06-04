const express = require("express");
const router = express.Router();
const Post = require("../Models/PostModel");
const User = require("../Models/UserModel");

// create a post
router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    return res.status(200).json(savedPost);
  } catch (error) {
    return res.status(500).json(error);
  }
});

// update a post
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.updateOne({ $set: req.body });
      return res.status(200).json("Your post has been updated");
    } else {
      return res.status(403).json("You can only update your Post");
    }
  } catch (error) {
    return res.status(500).json(error);
  }
});

// get a post
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    return res.status(200).json(post);
  } catch (error) {
    return res.status(500).json(error);
  }
});

// get post timeline
router.get("/timeline/:userid", async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userid);
    const userPosts = await Post.find({ userId: currentUser._id });
    const friendPosts = await Promise.all(
      currentUser.followings.map((friendId) => {
        return Post.find({ userId: friendId });
      })
    );

    return res.status(200).json(userPosts.concat(...friendPosts));
  } catch (error) {
    return res.status(500).json(error);
  }
});

// get user's all post
router.get("/profile/all", async (req, res) => {
  const userId = req.query.userId;
  const username = req.query.username;
  try {
    const user = userId
      ? await User.findById(userId)
      : await User.findOne({ username: username });
    const posts = await Post.find({ userId: user._id });
    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json(error);
  }
});

//like post
router.put("/:id/like", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      return res.status(200).json({
        msg: "Post has been liked",
      });
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      return res.status(200).json({
        msg: "Post has been disliked",
      });
    }
  } catch (error) {
    return res.status(500).json(error);
  }
});

// delete a post
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.deleteOne({ $set: req.body });
      return res.status(200).json("Your post has been deleted");
    } else {
      return res.status(403).json("You can only delete your Post");
    }
  } catch (error) {
    return res.status(500).json(error);
  }
});

module.exports = router;
