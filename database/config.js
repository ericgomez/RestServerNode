const mongoose = require('mongoose');

const mongoDB = `mongodb://${process.env.USER_DB}:${process.env.PASSWORD_DB}@${process.env.HOST_DB}:${process.env.PORT_DB}/cafeDB?authSource=admin`;

const dbConnection = async () => {
  try {
    await mongoose.connect(mongoDB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });

    console.log('Database inline');
  } catch (error) {
    console.log(error);
    throw new Error('Error while connecting to Mongo');
  }
};

module.exports = {
  dbConnection,
};
