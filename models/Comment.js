module.exports = (sequelize, DataTypes) => {
  const Comments = sequelize.define("Comment", {
    comment: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    profile_picture: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return Comments;
};
