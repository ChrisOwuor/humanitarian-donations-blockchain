module.exports = {
  DB_URI: process.env.DB_URI || "mongodb://localhost:27017/redcross_db",
  JWT_SECRET: process.env.JWT_SECRET || "red_cross_sec",
};
