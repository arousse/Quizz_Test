const express = require('express'),
  mongoose = require('mongoose'),
  cors = require('cors'),
  bodyParser = require('body-parser'),
  session = require('express-session');

const MongoDbSession = require('connect-mongodb-session')(session),
  logger = require('./utils/logger'),
  config = require('./config.json'),
  corsOption = require('./utils/cors'),
  authLib = require('./utils/auth-lib');

const questionRoute = require('./routes/question.server'),
  authRoute = require('./routes/auth.server'),
  statistic = require('./routes/statistic.server');

const dbUri = `mongodb://${config.mongodb.host}:${config.mongodb.port}/${config.mongodb.name}`;

const server = express();

// create a new mongoDB session
const DbSession = new MongoDbSession({
  uri: dbUri,
  collection: config.session.name,
});

mongoose
  .connect(dbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res, err) => {
    if (err) return logger.error(`Can not start database ${err}`);
    return logger.info('Waiting for connecting to MongoDB');
  })
  .then(() => {
    logger.info(`Database is up and run on port ${config.mongodb.port}`);
  });

const newSession = session({
  resave: false,
  saveUninitialized: false,
  secret: authLib.getSecret(),
  store: DbSession,
  name: config.session.name,
});

server.options('*', cors(corsOption));
server.use(cors(corsOption));
server.use(express.json());
server.use(newSession);
server.use(bodyParser.urlencoded({ extended: true }));

server.use('/api/auth', authRoute);
server.use('/api/question', questionRoute);
server.use('/api/statistic', statistic);

server.listen(config.api.port, (err) =>
  err
    ? logger.error(err)
    : logger.info(`REST API is started on port ${config.api.port}`)
);

// eslint-disable-next-line no-unused-vars
server.use((err, req, res, _next) => {
  logger.error(JSON.stringify(err));
  return res.status(err.status || 500).json({
    data: {
      status: err.status || 500,
      message: err.message || 'Server Error',
    },
  });
});
