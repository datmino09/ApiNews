var DataTypes = require("sequelize").DataTypes;
var _admin = require("./admin");
var _article_category = require("./article_category");
var _articles = require("./articles");
var _category = require("./category");
var _comment = require("./comment");
var _user = require("./user");

function initModels(sequelize) {
  var admin = _admin(sequelize, DataTypes);
  var article_category = _article_category(sequelize, DataTypes);
  var articles = _articles(sequelize, DataTypes);
  var category = _category(sequelize, DataTypes);
  var comment = _comment(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);

  articles.belongsToMany(category, { as: 'category_id_categories', through: article_category, foreignKey: "article_id", otherKey: "category_id" });
  category.belongsToMany(articles, { as: 'article_id_articles', through: article_category, foreignKey: "category_id", otherKey: "article_id" });
  article_category.belongsTo(articles, { as: "article", foreignKey: "article_id"});
  articles.hasMany(article_category, { as: "article_categories", foreignKey: "article_id"});
  comment.belongsTo(articles, { as: "article", foreignKey: "article_id"});
  articles.hasMany(comment, { as: "comments", foreignKey: "article_id"});
  article_category.belongsTo(category, { as: "category", foreignKey: "category_id"});
  category.hasMany(article_category, { as: "article_categories", foreignKey: "category_id"});
  comment.belongsTo(user, { as: "user", foreignKey: "user_id"});
  user.hasMany(comment, { as: "comments", foreignKey: "user_id"});

  return {
    admin,
    article_category,
    articles,
    category,
    comment,
    user,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
