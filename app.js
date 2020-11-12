'use strict';
require('dotenv').config();
var swaggerTools = require('swagger-tools');
var app = require('express')();
const http=require('http')
var jsyaml=require('js-yaml')
var fs=require('fs')
var cors = require('cors');
module.exports = app; // for testing
app.use(cors())
const spec=fs.readFileSync('./api/swagger/swagger.yaml','utf8')
const swaggerDoc=jsyaml.safeLoad(spec);
var serverPort = 8000 //process.env.PORT;
// swaggerRouter configuration
var options = {
  controllers: './api/controllers',
  useStubs: process.env.NODE_ENV === 'development' ? true : false // Conditionally turn on stubs (mock mode)
};

swaggerTools.initializeMiddleware(swaggerDoc,function (middleware) {
  // Interpret Swagger resources and attach metadata to request - must be first in swagger-tools middleware chain
  app.use(middleware.swaggerMetadata());

  // Validate Swagger requests
  app.use(middleware.swaggerValidator());

  // Route validated requests to appropriate controller
  app.use(middleware.swaggerRouter(options));

  // Serve the Swagger documents and Swagger UI
  app.use(middleware.swaggerUi());

  // Start the server
  http.createServer(app).listen(serverPort, function () {
    console.log('Your server is listening on port %d (http://localhost:%d)', serverPort, serverPort);
    console.log(`swagger-ui available on http://localhost:${serverPort}/docs/`);
  });
})
// 'use strict';

// var SwaggerConnect = require('swagger-connect');
// var app = require('connect')();
// module.exports = app; // for testing

// var config = {
//   appRoot: __dirname // required config
// };

// SwaggerConnect.create(config, function(err, swaggerConnect) {
//   if (err) { throw err; }

//   // install middleware
//   swaggerConnect.register(app);

//   var port = process.env.PORT || 10010;
//   app.listen(port);

//   if (swaggerConnect.runner.swagger.paths['/hello']) {
//     console.log('try this:\ncurl http://127.0.0.1:' + port + '/hello?name=Scott');
//   }
// });
