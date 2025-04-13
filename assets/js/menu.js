window.addEventListener('DOMContentLoaded', function() {
	var openNav = document.getElementById('openNav');
	var sideNav = document.getElementById('sideNav');

	openNav.addEventListener('mouseover', (e) => {
		e.preventDefault();
		if (window.screen.width < 600) {
			sideNav.style.width = '35%';
		} else {
			sideNav.style.width = '15%';
		}
		
	});

	sideNav.addEventListener('mouseleave', (e) => {
		e.preventDefault();
		sideNav.style.width = '0';
		openNav.style.display = 'inline-block';
	});
});