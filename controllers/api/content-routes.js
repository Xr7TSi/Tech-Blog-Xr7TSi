const router = require('express').Router();
const { Content } = require('../../models');


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