

const sequelize = require('./db');

(async () => {
  try {
    await sequelize.sync({ force: true }); // Drops the existing table and recreates it
    console.log('Migration completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error occurred during migration:', error);
    process.exit(1);
  }
})();