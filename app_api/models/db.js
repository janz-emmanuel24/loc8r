const mongoose = require('mongoose');

let dbURL = 'mongodb://localhost/Loc8r'; //local connection
if (process.env.NODE_ENV === 'production') {
    dbURL = `${process.env.MONGODB_URL}`; //online connection
}
mongoose.connect(dbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

mongoose.connection.on('connected', () => {
    console.log(`Mongoose connected to ${dbURL}`);
});
mongoose.connection.on('error', err => {
    console.log('Mongoose connection error:!!', err);
});
mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected!');
});
const gracefulShutdown = (msg, callback) => {
    mongoose.connection.close(() => {
        console.log(`Mongoose disconnected through ${msg}`);
    });
    callback();
};
//  For nodemon restarts
process.once('SIGUSR2', () => {
    gracefulShutdown('nodemon restart', () => {
        process.kill(process.pid, 'SIGUSR2');
    });
});
// For app termination
process.on('SIGINT', () => {
    gracefulShutdown('app termination', () => {
        process.exit(0);
    });
});
// For Heroku app termination
process.on('SIGTERM', () => {
    gracefulShutdown('Heroku app shutdown', () => {
        process.exit(0);
    });
});

/* BRINGING IN THE SCHEMAS AND MODELS */
require('./locations');
require('./users');