const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME, MONGODB_URI } =
  process.env;
const dbUrl =
  MONGODB_URI ??
  `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`;
module.exports = {
  url: dbUrl,
};
