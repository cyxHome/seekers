
var Mongoose = require('mongoose');



/**
 * Lost Gallery Schema and Model
 */
var LostGallerySchema = new Mongoose.Schema({
	// fields are defined here
	"author": String,
	"title": String,
	"date": Date,       // for sorting with date
	"time": String,     // for display without GMT
	"location": String,
	"description": String,
	"imageURL": String
});

exports.LostGallery = Mongoose.model('LostGallery', LostGallerySchema);


/** 
 * Found Gallery Schema and Model
 */
var FoundGallerySchema = new Mongoose.Schema({
	"author": String,
	"title": String,
	"date": Date,    // for sorting with date
	"time": String,  // for display without GMT
	"location": String,
	"description": String,
	"verification": String,
	"imageURL": String
});

exports.FoundGallery = Mongoose.model('FoundGallery', FoundGallerySchema);


/** 
 * Account and Profile Schema and Model
 */
var AccountProfileSchema = new Mongoose.Schema({
	"name": String,
	"password": String,
	"email": String,
	"phone": String,
	"otherInfo": String,
	"profilePicture": String,
	"postNumber": Number
});

exports.AccountProfile = Mongoose.model('AccountProfile', AccountProfileSchema);
