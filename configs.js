require("dotenv").config();

const config = {
  dev: {
    //  DB_URI: process.env.MONGODB_URI || "mongodb+srv://mean_iti:8x40gOfqZ7QddH7R@cluster1.b5xqlxg.mongodb.net/",
    // // PORT: process.env.PORT || 8001,
  
  },

  prod: {},
};

module.exports = config;
