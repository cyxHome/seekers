
var models = require('../models');

var itemToDisplay;
var noMatchLastSearch;

exports.view = function(req, res){
	

  	if (noMatchLastSearch === 0)
		res.render('search-post', { 'search-items': itemToDisplay });
	else
		res.render('search-post', { 'no-result': { "name" : "no match item post, try another keyword or check it in the Lost/Found Gallery" } });

	  


	

};

exports.searchForFoundItems = function(req, res) {
	var submitForm = req.body;
	var itemToSearch = submitForm["item"];

	models.FoundGallery
	 	// create a case-insensitive substring matching search 
		.find({ "title": new RegExp(itemToSearch, 'i')})
		.sort('date')
		.exec(renderItems);

	function renderItems(err, items) {
		if (!items.length)
			noMatchLastSearch = 1;
		else 
			noMatchLastSearch = 0;
		// console.log(projects); 
		itemToDisplay = items;
		res.render('search-post', { 'search-items': items });
	}
}


exports.searchForLostItems = function(req, res) {
	var submitForm = req.body;
	var itemToSearch = submitForm["item"];

	var searchStr = '/' + itemToSearch + '/';
	models.LostGallery

	 	// create a case-insensitive substring matching search 
		.find({ "title": new RegExp(itemToSearch, 'i')})
		.sort('date')
		.exec(renderItems);

	function renderItems(err, items) {
		if (!items.length)
			noMatchLastSearch = 1;
		else 
			noMatchLastSearch = 0;
		// console.log(projects); 
		itemToDisplay = items;
		res.render('search-post', { 'search-items': items });
	}
}