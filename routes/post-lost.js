var data = require('../data.json');

exports.view = function(req, res){
	// console.log(data);
	res.render('post-lost', data);
};

var models = require('../models');

/**
 * change the image URL to the URL just set up
 */
exports.changeImg = function(req,res){


    if (req.files.userPhoto === undefined)
    {
        res.redirect('/logined-lost');
    }
    else
    {
        var currentName = req.cookies.currentAccount;
        // get rid of the /public (cased by the setting of the staic path in app.js)
        var imgPath = req.files.userPhoto.path.substring(7);;
        var updateObj = {"imageURL": imgPath};

        models.LostGallery
        .find({"author": currentName})
        .sort('-date')
        .exec(afterQuery);

        function afterQuery(err, items) {
        var itemID = items[0]._id;

        models.LostGallery // display the updated data in the database
            .update({"_id": itemID}, updateObj, function () {
                // go to check 
                res.redirect('/logined-lost');
          });
        }
    }

}


exports.addLostItem = function(req, res) {
  var form_data = req.body;
  console.log(form_data);

  var currentName = req.cookies.currentAccount;

      var newLostItem = new models.LostGallery({
      "author": currentName,
    	"title": form_data['title'],
    	"date": form_data['date'],
      "time": form_data['time'],
    	"location": form_data['location'],
    	"description": form_data['description'],
    	"imageURL": form_data['imageURL']
      });

      // console.log("newLostItem: "+newLostItem);
      newLostItem.save(afterSaving);

      function afterSaving(err) {
        if(err) {console.log(err); res.send(500); }
        res.send("OK");
      }
    // });
}