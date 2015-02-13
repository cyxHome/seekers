
/**
 * Module dependencies.
 */

 

var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars')

var index = require('./routes/index');
var lost = require('./routes/lost');
var found = require('./routes/found');
var about = require('./routes/about');
var postfound = require('./routes/post-found');
var postlost = require('./routes/post-lost');
var loginedindex = require('./routes/logined-index');
var loginedabout = require('./routes/logined-about');
var loginedlost = require('./routes/logined-lost');
var loginedfound = require('./routes/logined-found');
var accountmypost = require('./routes/account-mypost');
var accountprofile = require('./routes/account-profile');
var accountprofileedit = require('./routes/account-profile-edit');
var accountmessage = require('./routes/account-message');



// var test = require('./routes/test');
// var offcanvas = require('./routes/offcanvas');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('Intro HCI secret key'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// Add routes here
app.get('/', index.view);
app.get('/lost', lost.view);
app.get('/found', found.view);
app.get('/about', about.view);
app.get('/post-found', postfound.view)
app.get('/post-lost', postlost.view)
app.get('/logined-index', loginedindex.view)
app.get('/logined-about', loginedabout.view)
app.get('/logined-lost', loginedlost.view)
app.get('/logined-found', loginedfound.view)
app.get('/account-mypost', accountmypost.view)
app.get('/account-message', accountmessage.view)
app.get('/account-profile', accountprofile.view)
app.get('/account-profile-edit', accountprofileedit.view)
// app.get('/test', test.view);
// app.get('/offcanvas', offcanvas.view);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
