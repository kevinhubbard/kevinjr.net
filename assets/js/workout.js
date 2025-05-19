window.addEventListener('DOMContentLoaded', (event) => {
	document.getElementById('addWrkt').disabled = true;
	document.getElementById('workoutList').display = 'none';
	const abs = ['upper abs', 'lower abs', 'obliques'];
	const arms = ['biceps', 'triceps', 'forearms'];
	const back = ['trapezius', 'rhomboids', 'latissiums'];
	const chest = ['pecs'];
	const legs = ['calf', 'quadriceps', 'glutes'];
	const shldrs = ['front deltoid', 'rear deltoid'];

	const uab = {
		name: 'upper abs',
		workouts: ['bicycle crunches', 'leg raises', 'reverse crunch', 'mtn climber']
	};

	const lab = {
		name: 'lower abs',
		workouts: ['scissor kick', 'russian twist', 'plank']
	};
	const obliq = {
		name: 'obliques',
		workouts: ['oblique raise', 'cross mtn climber', 'medicine ball throw']
	};
	const bicep = {
		name: 'biceps',
		workouts: ['concentration curl', 'preacher curl', 'barbell curl', 'dumbbell curl', 'chin up']
	};
	const tricep = {
		name: 'triceps',
		workouts: ['dip', 'cable pushdown', 'lying extension', 'overhead extension', 'kickback', 'closed grip pushup']
	};
	const forearm = {
		name: 'forearms',
		workouts: ['wrist curl', 'farmers walk', 'plate pinch', 'reverse curl']
	};
	const trap = {
		name: 'trapezius',
		workouts: ['face pulls', 'shrugs', 'upright row']
	};
	const rhomb = {
		name: 'rhomboids',
		workouts: ['seated cable row', 'rear delt fly']
	};
	const latis = {
		name: 'latissiums',
		workouts: ['cable pull down', 'pull ups', 'dumbbell pullover', 'deadlift']
	};
	const pec = {
		name: 'pecs',
		workouts: ['bench press', 'chest fly', 'pushup', 'dumbbell pullover']
	};
	const calf = {
		name: 'calf',
		workouts: ['single leg raise', 'toes farmer walk', 'jump rope', 'jump squat']
	};
	const quad = {
		name: 'quadriceps',
		workouts: ['front squat', 'leg press', 'leg extension', 'lunge', 'bulgarian split squat', 'kettlebell swing']
	};
	const glute = {
		name: 'glutes',
		workouts: ['hip thrust', 'glute kickback',]
	};
	const fdelt = {
		name: 'front deltoid',
		workouts: ['arnold press', 'dumbell raise']
	};
	const rdelt = {
		name: 'rear deltoid',
		workouts: ['delt fly', 'single arm row', 'bentover row']
	};

	const muscles = [uab, lab, obliq, bicep, tricep, forearm, trap, rhomb, latis, pec, calf, quad, glute, fdelt, rdelt];

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
			document.getElementById('workout').replaceChildren();
			for (var i = 0; i < abs.length; i++) {
				const newOpt = document.createElement('option');
				const textNode = document.createTextNode(abs[i]);
				newOpt.appendChild(textNode);
				document.getElementById('muscle').appendChild(newOpt);
			}
			break;
		case 2:
			document.getElementById('muscle').replaceChildren();
			document.getElementById('workout').replaceChildren();
			for (var i = 0; i < arms.length; i++) {
				const newOpt = document.createElement('option');
				const textNode = document.createTextNode(arms[i]);
				newOpt.appendChild(textNode);
				document.getElementById('muscle').appendChild(newOpt);
			}
			break;
		case 3:
			document.getElementById('muscle').replaceChildren();
			document.getElementById('workout').replaceChildren();
			for (var i = 0; i < back.length; i++) {
				const newOpt = document.createElement('option');
				const textNode = document.createTextNode(back[i]);
				newOpt.appendChild(textNode);
				document.getElementById('muscle').appendChild(newOpt);
			}
			break;
		case 4:
			document.getElementById('muscle').replaceChildren();
			document.getElementById('workout').replaceChildren();
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
			document.getElementById('workout').replaceChildren();
			for (var i = 0; i < legs.length; i++) {
				const newOpt = document.createElement('option');
				const textNode = document.createTextNode(legs[i]);
				newOpt.appendChild(textNode);
				document.getElementById('muscle').appendChild(newOpt);
			}
			break;
		case 6:
			document.getElementById('muscle').replaceChildren();
			document.getElementById('workout').replaceChildren();
			for (var i = 0; i < shldrs.length; i++) {
				const newOpt = document.createElement('option');
				const textNode = document.createTextNode(shldrs[i]);
				newOpt.appendChild(textNode);
				document.getElementById('muscle').appendChild(newOpt);
			}
			break;
		default: 
			document.getElementById('muscle').replaceChildren();
			console.log('nothing');
		}
	});




	document.getElementById('muscle').addEventListener('click', function(e) {
		console.log('the value is: ' + e.target.value);

		for (let i = 0; i < muscles.length; i++) {
			//console.log(muscles[i].name);

			if (muscles[i].name == e.target.value) {
				console.log(muscles[i].workouts);
				document.getElementById('workout').replaceChildren();
				for (let j = 0; j < muscles[i].workouts.length; j++) {
					const newOpt = document.createElement('option');
					newOpt.className = 'wrop';
					newOpt.addEventListener('click', function (e) {
						document.getElementById('addWrkt').disabled = false;
						console.log(e.target);
					});
					const textNode = document.createTextNode(muscles[i].workouts[j]);
					newOpt.appendChild(textNode);
					document.getElementById('workout').appendChild(newOpt);
				}
			}
		}
		
	});

	document.getElementById('addWrkt').addEventListener('click', function(e) {
		document.getElementById('workoutList').display = 'inline-block';
		console.log(document.getElementById('workout').value);
		document.getElementById('addWrkt').disabled = true;
		let eleRow = document.createElement('tr');
		let eleExerciseData = document.createElement('td');
		let eleMuscleData = document.createElement('td');
		eleExerciseData.innerText = document.getElementById('workout').value;
		eleMuscleData.innerText = document.getElementById('muscle').value;
		eleRow.appendChild(eleExerciseData);
		eleRow.appendChild(eleMuscleData);
		document.getElementById('workoutList').appendChild(eleRow);
	});

	document.getElementById('createRoutine').addEventListener('click', function (e) {
		e.preventDefault();
		document.getElementById('myModal').style.display = "block";
	});

	document.getElementsByClassName('close')[0].addEventListener('click', function (e) {
		e.preventDefault()
		document.getElementById('myModal').style.display = "none";
	});


/*	window.addEventListener('click', function (e) {
		e.preventDefault()
		if (e.target !== document.getElementById('myModal') || document.getElementById('myModal').style.display == 'block') {
			document.getElementById('myModal').style.display = 'none';
		}
		console.log("window was clicked.");
	});*/
});