
/**
 * Module dependencies.
 */

var express = require('express')
  , partials = require('express-partials')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path')
  , login = require('./routes/login.js')
  , reg = require('./routes/reg.js')
  , content = require('./routes/content.js')
  , logout = require('./routes/logout.js')

var MemStore = express.session.MemoryStore;

var app = express();

app.configure(function () {
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(partials());
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session({
    secret: 'secret_key', store: MemStore({
      reapInterval: 60000 * 10
    })
  }));
  app.use(function (req, res, next) {
    res.locals.user = req.session.user;
    res.locals.priority = req.session.priority;
    next();
  });
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function () {
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/reg', reg.reg);
app.post('/reg', reg.doReg);
app.get('/logout', logout.logout);
app.get('/login', login.login);
app.post('/login', login.doLogin);
app.get('/content', content.showContent);
app.get('/content/:select', content.showContent); // used to filter the priority

// fixed the defect that we cannot add new item druring filter items
app.post('/content*', content.addContent);
app.get('/deleteitem/:id', content.deleteTodoItem);

http.createServer(app).listen(80, function () {
  console.log("Express server listening on port " + app.get('port'));
});