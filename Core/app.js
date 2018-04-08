/*****************************node libs**********************/
let express = require('express');
let path = require('path');
let favicon = require('serve-favicon');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let debug = require('debug')('nodeplay:server');
let http = require('http');
/***************************************************************/

/*******************global variables ************************/
let config = require('./config.json');
let app = express();
let controllr = require('./core_config/controller');
let model = require('./core_config/model');
/************************************************************/

/*************************view engine setup*******************/
app.set('views',path.join(__dirname,'../application/views'));
app.set('view engine',config.view_engine);
/**************************************************************/

/***********************app setup********************************/
app.use(favicon(path.join(__dirname,'./serve-favicon/serve-favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname,'../application/assets')));

/***************************************************************/
/*********************************************controller and model handler*********/

/************************************************************************************/
/*********************error handler **************************/

//404 handler
app.use((req,res,next)=>{
   let err = new Error('Not Found');
   err.status = 404;
   next(err);
});

//other error handler

app.use((err,req,res,next)=>{
   res.locals.message = err.message;
   res.locals.error = req.app.get('env') === "development" ? err :{};

   //render the error page
    res.status(err.status || 500);
    res.render('error');
});

/***********************************port and env setup *********************************************************/
/**
 * Get port from environment and store in Express.
 */

let port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */

let server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
    let port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    let bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    let addr = server.address();
    let bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    debug('Listening on ' + bind);
}
