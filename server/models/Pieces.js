module.exports = (sequelize, DataTypes) => {
  const Poem = sequelize.define("Poems", {
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
    profile_picture: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  Poem.associate = (models) => {
    Poem.hasMany(models.Comment, {
      onDelete: "cascade",
    });
  };

  return Poem;
};
