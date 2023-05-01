const express = require("express");
const { PostModel } = require("../model/Post.model");

const postRoute = express.Router();

// to create post
postRoute.post("/create", async (req, res) => {
  try {
    const post = new PostModel(req.body);
    await post.save();
    res.status(200).send({ msg: "post created successfully" });
  } catch (error) {
    res.status(400).send({ err: error.message });
  }
});

// // to get all posts
// postRoute.get("/", async (req, res) => {
    
//   try {
//     const posts = await PostModel.find({ userID: req.body.userID});
//     // console.log(posts);
//     res.status(200).send(posts);
//   } catch (error) {
//     res.status(400).send({ err: error.message });
//   }
// });

// to get top post
postRoute.get("/top", async (req, res) => {
  try {
    const posts = await PostModel.find({ userID: req.body.userID }).sort({
      no_if_comments: -1,
    });
    res.status(200).send(posts[0]);
  } catch (error) {
    res.status(400).send({ err: error.message });
  }
});

// to update the post
postRoute.patch("/update/:postID", async (req, res) => {
  const { postID } = req.params;
//   console.log(postID);

  try {
    await PostModel.findByIdAndUpdate({ userID: req.body.userID, _id: postID }, req.body);

    res.status(200).send({ msg: "Post Updated" });
  } catch (error) {
    res.status(400).send({ err: error.message });
  }
});

// to delete the post
postRoute.delete("/delete/:postID", async (req, res) => {
  const { postID } = req.params;
 
  try {
    await PostModel.findByIdAndDelete({ userID: req.body.userID, _id: postID });

    res.status(200).send({ msg: "Post deleted" });
  } catch (error) {
    res.status(400).send({ err: error.message });
  }
});




// to get posts by devices and all posts
postRoute.get("/", async (req, res) => {
    const {device} = req.query;
    const {device1,device2} = req.query; 
  try {

    if(device) {
        const posts = await PostModel.find({ userID: req.body.userID, device});
        res.status(200).send(posts);
    } else if (device1) {
        const posts = await PostModel.find({ userID: req.body.userID,device: [device1, device2]});
        res.status(200).send(posts); 
    } else {
        const posts = await PostModel.find({ userID: req.body.userID});
        res.status(200).send(posts); 
    }


  } catch (error) {
    res.status(400).send({ err: error.message });
  }
});




module.exports = {
  postRoute,
};
