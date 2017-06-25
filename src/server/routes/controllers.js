'use strict';

const exec = require('child_process').exec;
const NodeCache = require('node-cache');
const fs = require('fs');
const fetch = require('node-fetch');
const logger = require('winston-color');
const tickerCache = new NodeCache({stdTTL: 120, checkperiod: 600});

/**
 * /index page
 */
exports.index = (req, res) => {
    res.set('Content-Type', 'text/html');

    fs.readFile(__dirname + '/../../client/views/index.html', (err, page) => {
        if (err) {
            logger.debug('err: ' + err);
            res.send('<html><head/><body><h1>404</h1></body></html>');
            return;
        }

        res.send(page);
    });
};

/**
 * /api/v1/ticker
 * @return {object} siacoin price object
 */
exports.ticker = (req, res) => {
    logger.debug('Attempting to grab ticker data from cache');
    tickerCache.get('ticker', (err, value) => {
        if (err) {
            logger.error('Encountered error fetching ticker cache', err);
        }

        if (!value) {
            fetch('https://api.coinmarketcap.com/v1/ticker/siacoin')
                .then(resp => resp.json())
                .then(json => {
                    logger.debug('Fetched ticker data from XHR', JSON.stringify(json[0]));
                    json[0].last_update = new Date();
                    tickerCache.set('ticker', json[0], 120, () => {
                        logger.debug('Ticker data was cached:', JSON.stringify(json[0]));
                        res.send(json[0]);
                    });
                });
        } else {
            logger.debug('Fetched ticker data from cache. Last update', new Date(value.last_update));
            res.send(value);
        }
    });
};
