const path = require('path');
const express = require("express");
const session = require('express-session');
const exphbs = require('express-handlebars');
const hbs = exphbs.create({});
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const routes = require("./controllers");
const sequelize = require("./config/connection");

const app = express();
const PORT = process.env.PORT || 3001;

// Set up sessions with cookies
const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'public')));
app.use(routes);

sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
});