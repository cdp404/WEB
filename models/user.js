const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const User = sequelize.define("User", {
    // 속성(Columns - Fields)
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING(255), // varchar
      allowNull: false,
      unique: false
    },
    phone: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: false
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: false
      }
  }, {
    sequelize: sequelize,
    timestamps: true,
    modelName: "User",
    tableName: 'users',
    paranoid: true, // deleteAt
    charset: 'utf8',
    collation: 'utf8_general_ci'
  });

  User.associate = (db) => {
    db.User.hasMany(db.Car,
      {
        foreignKey: 'ownerId',
        sourceKey: 'id',as:'carList'
      }
    );
    db.User.hasMany(db.AuctionBidding,{
      foreignKey:'UserId', sourceKey:'id', as: 'userBidding'
    });
    db.User.belongsToMany(db.Auction,{
      through:db.AuctionBidding
    })
  };
  return User;
}