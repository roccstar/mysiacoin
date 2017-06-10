/**
 * Module dependencies.
 */

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const compress = require('compression');
const favicon = require('static-favicon');
const logger = require('winston-color');
const methodOverride = require('method-override');
const errorHandler = require('errorhandler');
const config = require('./config');
const routes = require('./src/server/routes');

const app = express();


//set logger level

/**
 * Express configuration.
 */
app.set('port', config.server.port);
app.set('views', path.join(__dirname, '/src/client/views'));

app.use(compress())
    .use(favicon())
    .use(bodyParser())
    .use(methodOverride())
    .use(express.static(path.join(__dirname, 'public')))
    .use(routes.Router);

if(app.get('env') === 'dev') {
    app.use(errorHandler());
}

app.listen(app.get('port'), function () {
    logger.debug('MySiacoin.com | Express server listening on port ' + app.get('port'));
});
