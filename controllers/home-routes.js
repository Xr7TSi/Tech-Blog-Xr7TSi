const router = require("express").Router();
const { Content } = require("../models");

//this is the / endpoint


// gets all blog posts and render allContent.handlebars
router.get("/", async (req, res) => {
  try {
    const allContent = await Content.findAll();
    if (!allContent) {
      res
        .status(404)
        .json({ message: "No blog content exists." });
      return;
    }
    const allContentMapped = allContent.map((content) => content.get({ plain: true }));
    res.render('homepage', { allContentMapped });
    
   
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
});



module.exports = router;