var data = require('../data.json');
var models = require('../models');

exports.view = function(req, res){
	// console.log(data);
	res.render('post-found', data);
};


/**
 * change the image URL to the URL just set up
 */
exports.changeImg = function(req,res){
    if (req.files.userPhoto === undefined)
    {
        res.redirect('/logined-found');
    }
    else
    {
      var currentName = req.cookies.currentAccount;
      // get rid of the /public (cased by the setting of the staic path in app.js)
      var imgPath = req.files.userPhoto.path.substring(7);;
      var updateObj = {"imageURL": imgPath};

      models.FoundGallery
      .find({"author": currentName})
      .sort('-date')
      .exec(afterQuery);

      function afterQuery(err, items) {
      var itemID = items[0]._id;

      models.FoundGallery // display the updated data in the database
          .update({"_id": itemID}, updateObj, function (err,items) {
            // go to see the posted found items
            res.redirect('/logined-found');

        });
      }
    }

}


exports.addFoundItem = function(req, res) {
  var form_data = req.body;
  console.log(form_data);

  // models.CurrentAccount // get the current account from the database
  //   .find({"id": 1},{"name": 1, "_id": 0}, function (err, docs) {
  //     var currentAccountArr = docs.map(function(d){ return d.toObject() });
  //     var currentName = currentAccountArr[0].name;

  var currentName = req.cookies.currentAccount;

      var newFoundItem = new models.FoundGallery({
        "author": currentName,
        "title": form_data['title'],
        "date": form_data['date'],
        "time": form_data['time'],
        "location": form_data['location'],
        "description": form_data['description'],
        "verification": form_data['verification'],
        "imageURL": form_data['imageURL']
      });

      newFoundItem.save(afterSaving);

      function afterSaving(err) {
        if(err) {console.log(err); res.send(500); }
        res.send("OK");
      }

}
