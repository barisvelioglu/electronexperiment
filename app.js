const setupEvents = require('./installers/setupEvents')

if (setupEvents.handleSquirrelEvent()) {
    // squirrel event handled and app will exit in 1000ms, so don't do anything else
    return;
}

if(require('electron-squirrel-startup')) 
	return;

const electron = require('electron')
// Module to control application life.
const electronApp = electron.app
// Module to create native browser window.
const browserWindow = electron.BrowserWindow

var mainWindow;

function createWindow () {

	// Create the browser window.
	mainWindow = new browserWindow({width: 1440, height: 900, titleBarStyle: 'hidden-inset'});
	mainWindow.setMenu(null);

	var express = require('express');
	var path = require('path');
	var favicon = require('serve-favicon');
	var logger = require('morgan');
	var cookieParser = require('cookie-parser');
	var bodyParser = require('body-parser');

	var index = require('./routes/index');
	var users = require('./routes/users');

	var app = express();

	// view engine setup
	app.set('views', path.join(__dirname, 'views'));
	app.set('view engine', 'jade');

	// uncomment after placing your favicon in /public
	//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
	app.use(logger('dev'));
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(cookieParser());
	app.use(express.static(path.join(__dirname, 'public')));

	app.use('/', index);
	app.use('/users', users);

	// catch 404 and forward to error handler
	app.use(function(req, res, next) {
	  var err = new Error('Not Found');
	  err.status = 404;
	  next(err);
	});

	// error handler
	app.use(function(err, req, res, next) {
	  // set locals, only providing error in development
	  res.locals.message = err.message;
	  res.locals.error = req.app.get('env') === 'development' ? err : {};

	  // render the error page
	  res.status(err.status || 500);
	  res.render('error');
	});

	// Emitted when the window is closed.
	mainWindow.on('closed', function () {
	  mainWindow = null
	});

	app.listen(3000, function(){
		console.log("App is running on 3000");
	});

var levelup = require('level')

// 1) Create our database, supply location and options.
//    This will create or open the underlying LevelDB store.
var db = levelup('./mydb')

// 2) put a key & value
db.put('name', 'LevelUP', function (err) {
  if (err) return console.log('Ooops!', err) // some kind of I/O error

  // 3) fetch by key
  db.get('name', function (err, value) {
    if (err) return console.log('Ooops!', err) // likely the key was not found

    // ta da!
    console.log('name=' + value)
  })
})

	mainWindow.loadURL('http://localhost:3000');
}

electronApp.on('ready', createWindow)

// Quit when all windows are closed.
electronApp.on('window-all-closed', function () {

  if (process.platform !== 'darwin') {
    electronApp.quit()
  }
})

electronApp.on('activate', function () {
	
  if (mainWindow === null) {
    createWindow()
  }
})
