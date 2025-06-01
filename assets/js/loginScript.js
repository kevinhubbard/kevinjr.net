window.addEventListener("DOMContentLoaded", function(event) {
	let login = document.getElementById('logLink');
	let form = document.getElementById('loginModel');

	document.getElementById('closeLogin').addEventListener('click', function(e) {
		document.getElementById('loginModel').style.display = 'none';
	})
	
	login.addEventListener('click', function(e) {
		document.getElementById('loginModel').style.display = 'inline-block';
	});
});