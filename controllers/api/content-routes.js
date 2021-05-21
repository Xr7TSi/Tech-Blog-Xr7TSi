const router = require("express").Router();
const { Content } = require("../../models");

//this is the api/content endpoint



// get blog post by id and render selectedContent.handlebars
router.get("/:id", async (req, res) => {
  try {
    const selectedContent = await Content.findOne({
      where: { id: req.params.id },
    });
    if (!selectedContent) {
      res
        .status(404)
        .json({ message: "No blog content exists under the requested id." });
      return;
    }
    const content = selectedContent.get({ plain: true });
    res.render('selectedContent', content);
  } catch (err) {
    res.status(500).json(err);
  }
});


// post a new blog
/* post in postman should look like this...
    {
      "user_name": "jrein",
      "title": "Best Blog Post"
      "content": "Here is some terrific blog content."
    }
  */

router.post("/", async (req, res) => {
  try {
    const newContent = await Content.create({
      user_name: req.session.username,
      title: req.body.title,
      content: req.body.content,
    });
    res.status(200).json(newContent);
  } catch (err) {
    res.status(400).json(err);
    
  }
});


// update a blog post
/* put should look like this...
     {
      "user_name": "jrein",
      "title": "Revised Best Blog Post",
      "content": "Here is some improved blog content."
    }
  */
router.put("/:id", async (req, res) => {
  try {
    const updateContent = await Content.update(req.body, {
      where: {
        content_id: req.params.id,
      },
    });
    if (!updateContent[0]) {
      res.status(404).json({ message: "Blog post not updated." });
      return;
    }
    res.status(200).json(updateContent);
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete a blog post
router.delete("/:id", async (req, res) => {
  try {
    const contentDelete = await Content.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!contentDelete) {
      res.status(404).json({ message: "Blog post not deleted" });
      return;
    }
    res.status(200).json(contentDelete);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create a comment
router.post('/comment', async (req, res) => {
  
  try {
    console.log(req.session)
    const newComment = await Comment.create({
      user_name: req.session.username,
      content: req.body.content,
    });
    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
    
  }
});

module.exports = router;
