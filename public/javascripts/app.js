$(document).ready(function() {

var $nameInput = $('#nameInput');
var $emailInput = $('#emailInput');
var $msgInput = $('#msgInput');



function clearUser() {
	$nameInput.val('');
	$emailInput.val('');
	$msgInput.val('');
}

//Flip animation for images
$(".card").flip({
  axis: 'x',
  trigger: 'hover'
});
console.log('app.js loaded');


});

