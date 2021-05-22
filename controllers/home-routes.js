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

// login
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

// post blog
router.get('/post', (req, res) => {
  res.render('createContent');
});

// post comment
router.get('/comment', (req, res) => {
  res.render('createComment');
});











module.exports = router;