const sequelize = require("../config/connection");
const { User } = require("../models");
const { Content } = require("../models");
const { Comment } = require("../models");

const userData = require("./userData.json");
const contentData = require("./content.json");
const commentData = require("./comment.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  await Content.bulkCreate(contentData);

  await Comment.bulkCreate(commentData);

  process.exit(0);
};

seedDatabase();
