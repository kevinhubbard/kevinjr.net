$(document).ready(function() {

var $nameInput = $('#nameInput');
var $emailInput = $('#emailInput');
var $msgInput = $('#msgInput');
var $foot = $('#foot');
var year = new Date().getFullYear();

$foot.append(year);


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


});

