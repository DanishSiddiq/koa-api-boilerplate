const http = require('http');

const { handleExit }                        = require('./helpers/fatal');
const { logInfoDetails, logErrDetails }     = require('./helpers/logger');
const configServer                          = require('./config').server;

const app = require('./app');
(async function() {
    try {

        handleExit();

        const APP_PORT  =  configServer.port;
        app.server      = http.createServer(app.callback()).listen(APP_PORT, () => {
            logInfoDetails({message: `Koa boilerplate app listening on port:${APP_PORT}`});
        });

    } catch (err) {
        
        logErrDetails({ message: 'Koa boilerplate server setup failed', error: err });
        process.exit(1);
    }
})();

module.exports = app;