
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', {title: '主页'});
};

exports.reg = function(req, res) {
  res.render('register', {title: '注册'});
}

exports.doReg = function(req, res) {
  res.render('index', {title : '主页'});
}