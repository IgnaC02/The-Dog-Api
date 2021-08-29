const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("temperament", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};

// ID --> probar si con el id que se genera solo, ya funciona o hay que pasarle un nuevo ID
// Nombre
