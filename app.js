
/**
 * Module dependencies.
 */

var express = require('express')
  , partials = require('express-partials')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path');

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
app.get('/reg', routes.reg);
app.post('/reg', routes.doReg);
app.get('/logout', routes.logout);
app.get('/login', routes.login);
app.post('/login', routes.doLogin);
app.get('/content', routes.showContent);
app.get('/content/:select', routes.showContent); // used to filter the priority
app.post('/content', routes.addContent);
app.get('/deleteitem/:id', routes.deleteTodoItem);

http.createServer(app).listen(80, function () {
  console.log("Express server listening on port " + app.get('port'));
});