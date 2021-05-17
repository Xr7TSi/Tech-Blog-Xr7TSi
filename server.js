const express = require("express");
const exphbs = require('express-handlebars');
const routes = require("./routes");
const sequelize = require("./config/connection");

const app = express();
const PORT = process.env.PORT || 3001;

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'public')));
app.use(require('./controllers/blog-routes'));

sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
});