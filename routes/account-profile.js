
var models = require('../models');

/*
 * Find the profile information that match the current user's name from the database,
 * Call back function send the data of this specific user to the client
 * This function will be called everytime when the profile page is load
 */
exports.view = function(req, res){

	var currentName = req.cookies.currentAccount;

	models.AccountProfile // get the profile information from the database 
		.find({"name": currentName})
		.exec(renderProfile);

	function renderProfile(err, profile) {
		console.log("view profile: "+profile); 
		res.render('account-profile', { 'profile': profile });
	}
};