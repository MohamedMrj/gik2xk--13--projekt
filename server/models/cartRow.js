module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'cartRow',
    {
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {underscored: true},
  );
};