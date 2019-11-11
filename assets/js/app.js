$(document).ready(function() {

	var $foot = $('#foot');
	var year = new Date().getFullYear();
	$foot.append(year);


	//Flip animation for images
	$(".card").flip({
	  axis: 'x',
	  trigger: 'hover'
	});
});

