var data = require('../data.json');

exports.view = function(req, res){
	console.log(req.cookies.pageVersion);
	if (req.cookies.pageVersion === "1")
		res.render('logined-index', data);
	else if (req.cookies.pageVersion === "2")
		res.render('logined-index-alternative',data);
	else 
	{
		var layoutSelector = Math.random();
		if (layoutSelector < 0.5)
		{
			res.cookie('pageVersion', 1);
			res.render('logined-index', data);
		}
		else 
		{
			res.cookie('pageVersion', 2);
			res.render('logined-index-alternative',data);
		}
	}
};