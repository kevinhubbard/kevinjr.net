$(document).ready(function() {

/*$('#card').flip('toggle');*/







var $nameInput = $('#nameInput');
var $emailInput = $('#emailInput');
var $msgInput = $('#msgInput');

  var config = {
    apiKey: "AIzaSyDICfc-6WmELtRbTB5DSg9j67PAXvWQNkA",
    authDomain: "portfolio-558a1.firebaseapp.com",
    databaseURL: "https://portfolio-558a1.firebaseio.com",
    storageBucket: "portfolio-558a1.appspot.com",
    messagingSenderId: "28937066118"
  };
  firebase.initializeApp(config);

var data = firebase.database();


$(document).on('click', '.btn', function () {
	var user = {
		name: $nameInput.val(),
		email: $emailInput.val(),
		msg: $msgInput.val()
	}
	
	var json = JSON.stringify(user);

	data.ref('users/' + user.name).set(user);

	clearUser();
});

function clearUser() {
	$nameInput.val('');
	$emailInput.val('');
	$msgInput.val('');
}


});

