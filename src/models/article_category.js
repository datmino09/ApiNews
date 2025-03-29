const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('article_category', {
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'category',
        key: 'id'
      }
    },
    article_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'articles',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'article_category',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "category_id" },
          { name: "article_id" },
        ]
      },
      {
        name: "article_id",
        using: "BTREE",
        fields: [
          { name: "article_id" },
        ]
      },
    ]
  });
};
