module.exports = (sequelize, DataTypes) => {
  const Favorites = sequelize.define("Favorites", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    piece: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Favorites;
};
