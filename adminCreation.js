const UserSchema = require('./dist/schemas/user.schema').UserSchema;
require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI).then(async () => {
  const user = {
    name: process.env.ADMIN_USERNAME,
    password: process.env.ADMIN_PASSWORD,
    role: 'admin',
  };

  new Promise((res, rej) => {
    UserSchema.create(user, function (e) {
      if (e) {
        console.log(e);
        rej(e);
      }

      res(user);
    });
  }).then(() => process.exit(1));
});
