
/*
 * GET home page.
 */


exports.index = function(req, res){
  res.render('index');
};

exports.basic = function(req, res){
  res.render('read');
};

exports.intermediate = function(req, res){
  res.render('read-new');
};

exports.advanced = function(req, res){
  res.render('read-new-edit');
};

exports.validation = function(req, res){
  res.render('full');
};