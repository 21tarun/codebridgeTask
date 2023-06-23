

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
 'bxzry5wd6ngybnkzd0p5',
 'u9o7keclwe2oavxv',
 '1QkinItoPfSJjkLAXnHK',
  {
    host: 'bxzry5wd6ngybnkzd0p5-mysql.services.clever-cloud.com',
    dialect: 'mysql'
  }
);


sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch((error) => {
    console.error('Unable to connect to the database: ', error);
});


module.exports = sequelize;