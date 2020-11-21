const mongoose = require('mongoose');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {});

const mongoConnect = 'mongodb://localhost/catshack' //'mongodb+srv://cpeters123:uu51LxvHpBDgHorW@cluster0.wstcx.mongodb.net/catshackdatabase?retryWrites=true&w=majority';
mongoose.connect(
  process.env.MONGODB_URI || mongoConnect,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }
);

module.exports = db;