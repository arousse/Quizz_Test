const whiteList = new Set(['http://localhost:8080', 'http://localhost:3000']);
const corsOption = {
  optionsSuccessStatus: 200,
  origin: (origin, callback) =>
    !origin || whiteList.has(origin)
      ? callback(null, true)
      : callback(new Error('CROS Error: you are not allowed to use the API')),
  credentials: true,
  methods: 'GET, POST, PUT, PATCH, DELETE',
  allowedHeaders: ['Content-Type', 'Authorization'],
};

module.exports = corsOption;
