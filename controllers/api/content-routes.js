const router = require("express").Router();
const { Content } = require("../../models");

//this is the api/content endpoint

// gets all blog posts
router.get("/", async (req, res) => {
  const allContent = await Content.findAll().catch((err) => {
    res.json(err);
  });
  res.render("allPosts", allContent);
  res.json(allContent);
});

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
    res.status(200).json(selectedContent);
    const content = selectedContent.get({ plain: true });
    res.render("selectedContent", content);
  } catch (err) {
    res.status(500).json(err);
  }
});


// post a new blog
/* post should look like this...
    {
      "user_name": "jrein",
      "title": "Best Blog Post"
      "content": "Here is some terrific blog content."
    }
  */
router.post("/", async (req, res) => {
  try {
    const newContent = await Content.create(req.body);
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

module.exports = router;
