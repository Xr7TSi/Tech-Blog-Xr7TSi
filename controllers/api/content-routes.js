const router = require('express').Router();
const { Content } = require('../../models');

//this is the api/content endpoint


// gets all blog posts
router.get("/", async (req, res) => {
    const allContent = await Content.findAll().catch((err) => {
      res.json(err);
    });
    res.json(allContent);
  });

// get blog post by id
router.get("/:id", async (req, res) => {
    try {
      const selectedContent = await Content.findOne({
        where: { id: req.params.id },
        include: {
          model: Content,
          attributes: [
            "id",
            "user_name",
            "content",
            "created_at",
            "updated_at",
          ],
        },
      });
      if (!selectedContent) {
        res.status(404).json({ message: "No blog content exists under the requested id." });
        return;
      }
      res.status(200).json(selectedContent);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  

// post a new blog
  /* post should look like this...
    {
      "user_name": "jrein",
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



module.exports = router;