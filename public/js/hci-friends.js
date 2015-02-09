'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();


});


// user profile Javascript start here
    // var panels = $('.user-infos');
    // var panelsButton = $('.dropdown-user');
    // panels.hide();

    // //Click dropdown
    // panelsButton.click(function() {
    //     //get data-for attribute
    //     var dataFor = $(this).attr('data-for');
    //     var idFor = $(dataFor);

    //     //current button
    //     var currentButton = $(this);
    //     idFor.slideToggle(400, function() {
    //         //Completed slidetoggle
    //         if(idFor.is(':visible'))
    //         {
    //             currentButton.html('<i class="glyphicon glyphicon-chevron-up text-muted"></i>');
    //         }
    //         else
    //         {
    //             currentButton.html('<i class="glyphicon glyphicon-chevron-down text-muted"></i>');
    //         }
    // })
// user profile Javascript end here

 // Menu Toggle Script 

$("#menu-toggle").click(function(e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
});

$(".menu-close").click(function(e) {
    $("#wrapper").removeClass("toggled");
});

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	console.log("Javascript connected!");
}

function nameClick(e) {
    e.preventDefault();

    var friendName = $(this).text();
    var newName = anagrammedName(friendName);
    $(this).text(newName);
}

function anagrammedName(name) {
	// Thanks, Internet Anagram Server!
	
	if (name == "Doug Engelbart") {
		return "Notable Grudge";
	} 
	else if (name == "Ivan Sutherland") {
		return "Vandal Heist Run";
	}
	else if (name == "JCR Licklider") {
		return "Crick Rid Jell";
	}
	else if (name == "Vannevar Bush") {
		return "Ravens Van Hub";
	}
	else if (name == "Alan C. Kay") {
		return "Canal Yak";
	}
	else if (name == "Allen Newell") {
		return "Ellen All New";
	}
	else if (name == "Lucy Suchman") {
		return "Lunacy Chums";
	}
	else if (name == "Grace Hopper") {
		return "Gear Chopper";
	}
	else {
		console.log(name + " not known for anagramming.");
		return name;
	}
}

function postNeedLogin() {
    alert("Please login before you post");
}