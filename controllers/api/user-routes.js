const router = require('express').Router();
const { User } = require('../../models');


//this is the api/users endpoint

// create new user
// post should look lie this:
/*
 /* post should look like this...
   {
    "username": "jrein",
    "email": "jrein@yahoo.com",
    "password": "password12345"
  }
  */
router.post('/', async (req, res) => {
  try {
    const newUser = await User.create({
      user_name: req.body.user_name,
      email: req.body.email,
      password: req.body.password
    });

    req.session.save(() => {
      req.session.loggedIn = true;
      res.status(200).json(newUser);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// login
router.post('/login', async (req, res) => {
  try {
    const dbUserData = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!dbUserData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }

    const validPassword = await dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }

    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.email = req.body.email;
      req.session.user_name =  dbUserData.user_name;

      res
        .status(200)
        .json({ user: dbUserData, message: 'You are now logged in!' });
        
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// logout
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});



module.exports = router;