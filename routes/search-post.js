
var models = require('../models');
var foundItemToDisplay;
var lostItemToDisplay;
var itemToDisplay;
var noMatchLastSearch;

exports.searchForAllItems = function(req, res) {
	var submitForm = req.body;
	var itemToSearch = submitForm["item"];

	var searchStr = '/' + itemToSearch + '/';
	models.LostGallery
	 	// create a case-insensitive substring matching search 
		.find({ "title": new RegExp(itemToSearch, 'i')})
		.sort('date')
		.exec(renderSearchItemsFromLost);


	function renderSearchItemsFromLost(err, lostItems) {

		function renderSearchItemsFromLostAndFound(err, foundItems) {
			if (!lostItems.length && !foundItems.length)
			{
				noMatchLastSearch = 1;
				console.log("no match item post, try another keyword or check it in the Lost/Found Gallery");
				res.render('search-post', { 'no-result': { "name" : "no match item post, try another keyword or check it in the Lost/Found Gallery" } });
			}	
			else
			{
				noMatchLastSearch = 0;
				foundItemToDisplay = foundItems;
				lostItemToDisplay = lostItems;
				console.log("have post");
				res.render('search-post', { 'search-items-founds': foundItems , 'search-items-lost': lostItems ,  });
			}
		}

		models.FoundGallery // get the post from the database 
			.find({ "title": new RegExp(itemToSearch, 'i')})
			.sort('date')
			.exec(renderSearchItemsFromLostAndFound);
	}


}





/**
 * Render different version of page (the back button in the two version of pages is tracked by different listener)
 *  based on the page version
 */
exports.view = function(req, res){
	console.log(req.cookies.pageVersion);
	if (req.cookies.pageVersion === "1")
	{
		if (noMatchLastSearch === 0)
			res.render('search-post', { 'search-items': itemToDisplay });
		else
			res.render('search-post', { 'no-result': { "name" : "no match item post, try another keyword or check it in the Lost/Found Gallery" } });
	}
	else if (req.cookies.pageVersion === "2")
	{
		if (noMatchLastSearch === 0)
			res.render('search-post-alternative', {'search-items-founds': foundItemToDisplay , 'search-items-lost': lostItemToDisplay});
		else
			res.render('search-post-alternative', { 'no-result': { "name" : "no match item post, try another keyword or check it in the Lost/Found Gallery" } });
	}
	else
	{
		console.log("Page Version is not set properly when visiting the search post page");
	}
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