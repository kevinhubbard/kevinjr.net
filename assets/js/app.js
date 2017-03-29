$(document).ready(function() {

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


$(document).on('click', '.btn', function() {

	event.preventDefault();
	console.log($nameInput.val());
	console.log($emailInput.val());
	console.log($msgInput.val());

	data.ref("users/" + $nameInput.val()).set({
		name: $nameInput.val(),
		email: $emailInput.val(),
		msg: $msgInput.val()
	});


	$nameInput.val('');
	$emailInput.val('');
	$msgInput.val('');
});



});

