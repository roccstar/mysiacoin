/**
 * Module dependencies
 */

'use strict';

const express = require('express');
const Controllers = require('./controllers');
const Router = express.Router();

// set routes
Router.route('/').get(Controllers.index);
Router.route('/index').get(Controllers.index);
Router.route('/api/v1/generate').get(Controllers.generate);
Router.route('/api/v1/ticker').get(Controllers.ticker);

exports.Router = Router;
