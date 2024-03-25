window.addEventListener('DOMContentLoaded', function() {
	var openNav = document.getElementById('openNav');
	var sideNav = document.getElementById('sideNav');

	openNav.addEventListener('mouseover', (e) => {
		e.preventDefault();
		sideNav.style.width = '15%';
	});

	sideNav.addEventListener('mouseleave', (e) => {
		e.preventDefault();
		sideNav.style.width = '0';
		openNav.style.display = 'inline-block';
	});
});