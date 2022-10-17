const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    
    sequelize.define('Activity', {
         name: {
              type: DataTypes.STRING,
              allowNull: false,
              validate: {
                   isAlpha: true
              }
         },
         difficulty: {
              type: DataTypes.ENUM('1','2','3','4','5'),
              allowNull: false,
         },
         duration: {
              type: DataTypes.TIME,
              allowNull: true,
         },
         season: {
              type: DataTypes.ENUM('summer','autumm','winter','spring'),
         },
         difficultyrate: {
               type: DataTypes.VIRTUAL,
               get() {
               return (Number(this.difficulty) + 1) ;
               },
               set() {
               throw new Error('Do not try to set the `fullName` value!');
               }
        }
    },
    {
         timestamps: false,
    })
}