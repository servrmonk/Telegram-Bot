const mongoose = require("mongoose");

const url = process.env.MONGO_URI;
const dbname = process.env.DB_NAME;

const connectWithMongoose = async () => {
  try {
    const connectionInstance = await mongoose.connect(`${url}/${dbname}`);
    console.log(
      "\n Mongodb connected !! DB HOST: ",
      connectionInstance.connection.host
    );
  } catch (err) {
    console.log("Error in connection with db ", err);
    process.exit(1);
  }
};
module.exports = connectWithMongoose;
