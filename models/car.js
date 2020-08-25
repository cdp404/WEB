const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Cars = sequelize.define("Cars", {
    // 속성(Columns - Fields)
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique:false
    },
    modelName: {
      type: DataTypes.STRING(255), // varchar
      allowNull: false,
      unique: false
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: false
    },
    manufacturer: {
      type: DataTypes.STRING(30),
      allowNull: false,
      unique: false
    }
    
  }, {
    sequelize: sequelize,
    timestamps: true,
    modelName: "Car",
    tableName: 'cars',
    paranoid: true, // deleteAt
    charset: 'utf8',
    collation: 'utf8_general_ci'
  });

  Cars.associate = (db)=>{
    db.Car.belongsTo(db.User,{foreignKey: "ownerId",sourceKey:'id',as:"owner"})
    db.Car.hasOne(db.Auction,{
      foreignKey:'carId',sourceKey:'id',as:'inAuction'
    })
};
return Cars;
}