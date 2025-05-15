window.addEventListener('DOMContentLoaded', (event) => {
	
	const abs = ['upper', 'lower', 'obliques'];
	const arms = ['biceps', 'triceps', 'forearms'];
	const back = ['trapezius', 'rhomboids', 'latissiums'];
	const chest = ['pecs'];
	const legs = ['calf', 'quadriceps', 'glutes'];
	const shldrs = ['front deltoid', 'rear deltoid'];

	function hideAppSelection() {
		document.getElementById('appSelection').style.display = "none";
	}

	document.getElementById('progress').addEventListener('click', function() {
		hideAppSelection();
		document.getElementById('progressView').style.display = 'inline-block';
	});

	document.getElementById('load').addEventListener('click', function() {
		hideAppSelection();
		document.getElementById('loadView').style.display = 'inline-block';
	});

	document.getElementById('create').addEventListener('click', function() {
		hideAppSelection();
		document.getElementById('createView').style.display = 'inline-block';
	});

	document.getElementById('muscleGroup').addEventListener('click', function(event) {
		let selection = parseInt(event.target.value);
		console.log(selection);
		switch (selection) {
		case 1:
			document.getElementById('muscle').replaceChildren();
			for (var i = 0; i < abs.length; i++) {
				const newOpt = document.createElement('option');
				const textNode = document.createTextNode(abs[i]);
				newOpt.appendChild(textNode);
				document.getElementById('muscle').size = abs.length;
				document.getElementById('muscle').appendChild(newOpt);
			}
			break;
		case 2:
			document.getElementById('muscle').replaceChildren();
			for (var i = 0; i < arms.length; i++) {
				const newOpt = document.createElement('option');
				const textNode = document.createTextNode(arms[i]);
				newOpt.appendChild(textNode);
				document.getElementById('muscle').size = arms.length;
				document.getElementById('muscle').appendChild(newOpt);
			}
			break;
		case 3:
			document.getElementById('muscle').replaceChildren();
			for (var i = 0; i < back.length; i++) {
				const newOpt = document.createElement('option');
				const textNode = document.createTextNode(back[i]);
				newOpt.appendChild(textNode);
				document.getElementById('muscle').size = back.length;
				document.getElementById('muscle').appendChild(newOpt);
			}
			break;
		case 4:
			document.getElementById('muscle').replaceChildren();
			for (var i = 0; i < chest.length; i++) {
				const newOpt = document.createElement('option');
				const textNode = document.createTextNode(chest[i]);
				newOpt.appendChild(textNode);
				document.getElementById('muscle').size = chest.length;
				document.getElementById('muscle').appendChild(newOpt);
			}
			break;
		case 5:
			document.getElementById('muscle').replaceChildren();
			for (var i = 0; i < legs.length; i++) {
				const newOpt = document.createElement('option');
				const textNode = document.createTextNode(legs[i]);
				newOpt.appendChild(textNode);
				document.getElementById('muscle').size = legs.length;
				document.getElementById('muscle').appendChild(newOpt);
			}
			break;
		case 6:
			document.getElementById('muscle').replaceChildren();
			for (var i = 0; i < shldrs.length; i++) {
				const newOpt = document.createElement('option');
				const textNode = document.createTextNode(shldrs[i]);
				newOpt.appendChild(textNode);
				document.getElementById('muscle').size = shldrs.length;
				document.getElementById('muscle').appendChild(newOpt);
			}
			break;
		default: 
			document.getElementById('muscle').replaceChildren();
			console.log('nothing bith');
		}
	});

});