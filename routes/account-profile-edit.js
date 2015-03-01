
var models = require('../models');

/*
 * It will render the data in the old post to the editing page
 * This function is called everytime when the edit-profile page is loaded
 */
exports.view = function(req, res) {

	var currentName = req.cookies.currentAccount;

			models.AccountProfile // get the profile information asociated with the name
				.find({"name": currentName})
				.exec( function (err, oldProfile) { 
					console.log(oldProfile);
					res.render('account-profile-edit', { 'old-profile': oldProfile });
				});
}

/**
 * change the image URL to the URL just set up
 */
exports.changeImg = function(req,res){

	if (req.files.userPhoto === undefined)
    {
    	res.redirect('/account-profile');
    }
    else
    {
	    var currentName = req.cookies.currentAccount;
	    // get rid of the /public (cased by the setting of the staic path in app.js)
	    var imgPath = req.files.userPhoto.path.substring(7);;
	    var updateObj = {"profilePicture": imgPath};
	    console.log("change here !!!!!!!");


	    models.AccountProfile // display the updated data in the database
	        .update({"name": currentName}, updateObj, function () {
				// go to check the new account information
	          	res.redirect('/account-profile');
	      });
	}
}


/**
 * Update the account profile
 */
exports.editProfile = function(req, res) {
	var form_data = req.body;
	newProfileInfo = form_data['json'];

	// Build up update object programmatically to not include 'title'/'location' when not provided:
	var updateObj = {"otherInfo": newProfileInfo["otherInfo"]};
	if (newProfileInfo["email"]) {
	    updateObj["email"] = newProfileInfo["email"];
	}
	if (newProfileInfo["phone"]) {
	    updateObj["phone"] = newProfileInfo["phone"];
	}
	if (newProfileInfo["profilePicture"]) {
	    updateObj["profilePicture"] = newProfileInfo["profilePicture"];
	}

	var currentName = req.cookies.currentAccount;

			models.AccountProfile // update the profile in the database
				.update({"name": currentName}, updateObj, function () {

			models.AccountProfile // display the updated data in the database
				.find({"name": currentName})
				.exec(displayChangedProfile);
			});			

	function displayChangedProfile (err, profile) {
		console.log("new profile: "+ profile); 
		res.send("profile OK");
	}
};


/** 
 * the post number of the user add one
 */
exports.postPlusOne = function(req, res) {

	var currentName = req.cookies.currentAccount;

		models.AccountProfile // get the postNumber from the database
			.find({"name": currentName}, function (err, docs) { 
			var currentProfileArr = docs.map(function(d){ return d.toObject() });
			var oldpostNumber = currentProfileArr[0].postNumber;
			models.AccountProfile // update the profile in the database
				.update({"name": currentName}, { "postNumber": oldpostNumber+1}, function () {
					models.AccountProfile // display the updated data in the database
					.find({"name": currentName})
					.exec(displayChangedProfile);
				});
			});	

	function displayChangedProfile (err, profile) {
		console.log("new profile: "+ profile); 
		res.send("profile OK");
	}
}


/** 
 * the post number of the user add one
 */
exports.postMinusOne = function(req, res) {

	var currentName = req.cookies.currentAccount;

			models.AccountProfile // get the postNumber from the database
				.find({"name": currentName}, function (err, docs) { 
				var currentProfileArr = docs.map(function(d){ return d.toObject() });
				var oldpostNumber = currentProfileArr[0].postNumber;
				models.AccountProfile // update the profile in the database
					.update({"name": currentName}, { "postNumber": oldpostNumber-1}, function () {
						models.AccountProfile // display the updated data in the database
						.find({"name": currentName})
						.exec(displayChangedProfile);
					});
				});	

	function displayChangedProfile (err, profile) {
		console.log("new profile: "+ profile); 
		res.send("profile OK");
	}
}