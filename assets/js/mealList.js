window.addEventListener('DOMContentLoaded', () => {
	//const ing = document.getElementById('ingredients');
	const addToMealBtn = document.getElementById('addToMeal');
	const createMealBtn = document.getElementById('createMeal');
	const editIngred = document.getElementById('editIngred');
	const cancelUpdate = document.getElementById('cancelUpdate');
	const updateIngred = document.getElementById('updateIngred');
	const deleteIngred = document.getElementById('deleteIngred');
	const removeIngred = document.getElementById('removeIngredient');
	updateIngred.hidden = true;
	editIngred.disabled = true;
	cancelUpdate.hidden = true;
	deleteIngred.hidden = true;
	addToMealBtn.disabled = true;

			const fruitFoodGroup = document.getElementById('fruitFoodGroup');
			const vegetableFoodGroup = document.getElementById('vegetableFoodGroup');
			const grainFoodGroup = document.getElementById('grainFoodGroup');
			const proteinFoodGroup = document.getElementById('proteinFoodGroup');
			const dairyFoodGroup = document.getElementById('dairyFoodGroup');

	const dailyValues = {
		calories: 2000,
		totalFat: 78,
		saturatedFat: 20,
		transFat: 0,
		cholesterol: 300,
		sodium: 2300,
		totalCarbohydrates: 275,
		fiber: 28,
		sugar: 50,
		protein: 50
	}

	let iList = [];
	let mealList = [];
	let mealTotals = {
		calories: null,
		totalFat: null,
		saturatedFat: null,
		transFat: null,
		cholesterol: null,
		sodium: null,
		totalCarbohydrates: null,
		fiber: null,
		sugar: null,
		protein: null
	}

	function dvPercentage(iSize, dvTotal) {
		let a = parseInt(iSize);
		let b = parseInt(dvTotal);

		if (a === 0 && b === 0) {
			return 0;
		}
		return ((a/b) * 100).toFixed(1);
	}

	function buildButton(id, name, location) {
		const img = document.createElement('img');
		const btn = document.createElement('button');
		btn.id = name;
		img.src = location;
		img.width = 75;
		img.height = 75;
		btn.append(img);
		btn.addEventListener('click', (e) => {
			editIngred.disabled = false;
			addToMealBtn.disabled = false;
			let obj = iList.find(o => o.ingredientName === btn.id);
			//SET Ingredient Info
			document.getElementById('nameInfo').innerText = obj.ingredientName;
			document.getElementById('nameInfo').setAttribute('data-id', id);
			document.getElementById('foodGroupInfo').innerText = obj.foodGroup;
			document.getElementById('servingSizeInfo').innerText = obj.servingSize;
			document.getElementById('caloriesInfo').innerText = obj.calories;
			document.getElementById('totalFatInfo').innerText = obj.totalFat;
			document.getElementById('saturatedFatInfo').innerText = obj.saturatedFat;
			document.getElementById('transFatInfo').innerText = obj.transFat;
			document.getElementById('cholesterolInfo').innerText = obj.cholesterol;
			document.getElementById('sodiumInfo').innerText = obj.sodium;
			document.getElementById('carbohydratesInfo').innerText = obj.totalCarbohydrates;
			document.getElementById('fiberInfo').innerText = obj.fiber;
			document.getElementById('sugarInfo').innerText = obj.sugar;
			document.getElementById('proteinInfo').innerText = obj.protein;
			//SET %Daily Values
			document.getElementById('caloriesDV').innerText = dvPercentage(obj.calories, dailyValues.calories) + "%";
			document.getElementById('totalFatDV').innerText = dvPercentage(obj.totalFat, dailyValues.totalFat) + "%";
			document.getElementById('saturatedFatDV').innerText = dvPercentage(obj.saturatedFat, dailyValues.saturatedFat) + "%";
			document.getElementById('transFatDV').innerText = dvPercentage(obj.transFat, dailyValues.transFat) + "%";
			document.getElementById('cholesterolDV').innerText = dvPercentage(obj.cholesterol, dailyValues.cholesterol) + "%";
			document.getElementById('sodiumDV').innerText = dvPercentage(obj.sodium, dailyValues.sodium) + "%";
			document.getElementById('totalCarbohydratesDV').innerText = dvPercentage(obj.totalCarbohydrates, dailyValues.totalCarbohydrates) + "%";
			document.getElementById('fiberDV').innerText = dvPercentage(obj.fiber, dailyValues.fiber) + "%";
			document.getElementById('sugarDV').innerText = dvPercentage(obj.sugar, dailyValues.sugar) + "%";
			document.getElementById('proteinDV').innerText = dvPercentage(obj.protein, dailyValues.protein) + "%";
		});
		return btn;
	}

	getIngredients();
	async function getIngredients() {
		const response = await fetch('/meals/api');
		const ingredients = await response.json();
		for (let ingredient in ingredients) {
			const fg = ingredients[ingredient].foodGroup.toLowerCase();
			switch(fg) {
				case 'fruit':
					fruitFoodGroup.append(buildButton(ingredients[ingredient].ingredientID, ingredients[ingredient].ingredientName, ingredients[ingredient].imgLocation));
					break;
				case 'vegetable':
					vegetableFoodGroup.append(buildButton(ingredients[ingredient].ingredientID, ingredients[ingredient].ingredientName, ingredients[ingredient].imgLocation));
					break;
				case 'grain':
					grainFoodGroup.append(buildButton(ingredients[ingredient].ingredientID, ingredients[ingredient].ingredientName, ingredients[ingredient].imgLocation));
					break;
				case 'protein':
					proteinFoodGroup.append(buildButton(ingredients[ingredient].ingredientID, ingredients[ingredient].ingredientName, ingredients[ingredient].imgLocation));
					break;
				case 'dairy':
					dairyFoodGroup.append(buildButton(ingredients[ingredient].ingredientID, ingredients[ingredient].ingredientName, ingredients[ingredient].imgLocation));
					break;
				default:
					console.log('not a food group');
			}
		}
		for (let i = 0; i < ingredients.length; i++) {
			iList.push(ingredients[i]);
		}
	}

	function returnListLength() {
		return mealList.length;
	}

	function found(id) {
		let found = false;
		for (i=0; i<mealList.length; i++) {
			if (mealList[i] === id) {
				found = true;
			}
		}
		return found;
	}
	function picSearch(id) {
		for (i = 0; i < iList.length; i++) {
			if(iList[i].ingredientID === id) {
				return iList[i].imgLocation;
			}
		}
	}
	function updateMeal(id) {
		let img = document.createElement('img');
		//search iList for ingredient pic
		img.src = picSearch(id);
		img.width = 75;
		img.height = 75;
		document.getElementById('mealIngredients').append(img);
	}

	//~~ ADD TO MEAL BUTTON
	addToMealBtn.addEventListener('click', function(e) {
		e.preventDefault();
		let objectID = parseInt(document.getElementById('nameInfo').dataset.id);

		if (returnListLength() === 0) {
			mealList.push(objectID);
			updateMeal(objectID);
		} else if (found(objectID) === true) {
			alert("Ingredient already in meal!");
		} else {
			mealList.push(objectID);
			updateMeal(objectID);
		}

	



	});

	//~~ EDIT MEAL BUTTON
	editIngred.addEventListener('click', function(e) {
		e.preventDefault();
		document.getElementById('addCalorie').style.pointerEvents = 'none';
		editIngred.hidden = true;
		addToMealBtn.hidden = true;
		updateIngred.hidden = false;
		cancelUpdate.hidden = false;
		deleteIngred.hidden = false;


		const info = document.getElementsByClassName('info');
		for(i=0; i<info.length; i++) {
			//console.log(info[i]);
			info[i].hidden = true;
			const tb = document.createElement('input');
			tb.className = "testCase";
			tb.id = 'updated' + info[i].id;
			if(info[i].id === 'nameInfo' || info[i].id === 'foodGroupInfo') {
				tb.size = 8;
			} else {
				tb.size = 2;
			}
			tb.value = info[i].textContent;
			tb.style.textAlign = 'center';
			info[i].after(tb);
		}


	});

	//~~ CANCEL EDIT INGREDIENT BUTTON
	cancelUpdate.addEventListener('click', function(e) {
		e.preventDefault();
		document.getElementById('addCalorie').style.pointerEvents = 'auto';
		let he = document.getElementsByClassName('info');
		let eh = document.getElementsByClassName('testCase');
		for(i=0; i<eh.length; i++) {
			eh[i].hidden = true;
		}
		for(i=0; i<he.length; i++) {
			he[i].hidden = false;
		}
		cancelUpdate.hidden = true;
		editIngred.hidden = false;
		addToMealBtn.hidden = false;
		updateIngred.hidden = true;
		deleteIngred.hidden = true;
	});

	//~~ UPDATE INGREDIENT BUTTON
	updateIngred.addEventListener('click', function(e) {
		e.preventDefault();
		let updatedInfo = document.getElementsByClassName('testCase');
		let dID = document.getElementById('nameInfo');
		
		let update = {
			id: dID.dataset.id,
			ingredientName: document.getElementById('updatednameInfo').value,
			foodGroup: document.getElementById('updatedfoodGroupInfo').value,
			servingSize: document.getElementById('updatedservingSizeInfo').value,
			calories: document.getElementById('updatedcaloriesInfo').value,
			totalFat: document.getElementById('updatedtotalFatInfo').value,
			saturatedFat: document.getElementById('updatedsaturatedFatInfo').value,
			transFat: document.getElementById('updatedtransFatInfo').value,
			cholesterol: document.getElementById('updatedcholesterolInfo').value,
			sodium: document.getElementById('updatedsodiumInfo').value,
			totalCarbohydrates: document.getElementById('updatedcarbohydratesInfo').value,
			fiber: document.getElementById('updatedfiberInfo').value,
			sugar: document.getElementById('updatedsugarInfo').value,
			protein: document.getElementById('updatedproteinInfo').value
		}

		const requestOptions = {
			method: "POST",
			headers: { "Content-Type": "application/json"},
			body: JSON.stringify(update)
		}

		fetch('/meals/iup', requestOptions)
			.then(data => {
				if (!data.ok) {
					throw Error(data.status);
				}
				return data.json();
			}).then(update => {
				console.log(update);
			});
		});

	//~~ DELETE INGREDIENT BUTTON
	deleteIngred.addEventListener('click', function(e) {
		e.preventDefault();
		const bg = document.createElement('div');
		bg.style.position = 'absolute';
		bg.style.left = '0';
		bg.style.top = '0';
		bg.style.width = '100%';
		bg.style.height = '100%';
		bg.style.backgroundColor = 'rgba(255,255,255,0.5)';
		bg.style.zindex = 5;
		const modal = document.createElement('div');
		modal.style.width = "250px";
		modal.style.height = "250px";
		modal.style.background = "red";
		modal.style.position = 'fixed';
		modal.style.left = ((window.innerWidth/2) - (250/2)) + 'px' ;
		modal.style.top = ((window.innerHeight/2) - (250/2)) + 'px';
		modal.style.zindex = '2';

		const obToDel = {
			id: document.getElementById('nameInfo').dataset.id
		}

		const bt = document.createElement('button');
		bt.textContent = "YES delete ID: " + document.getElementById('nameInfo').dataset.id;
		bt.addEventListener('click', async function(e) {
			e.preventDefault();
			console.log('yes was clicked');
		const reqOp = {
				method: "DELETE",
				headers: {"Content-Type": "application/json"},
				body: JSON.stringify(obToDel)
			}

			await fetch('/meals/delete', reqOp).then(location.reload(true));
			//bg.hidden = true;

/*			$.ajax({
				url: '/meals/delete',
				type: 'DELETE',
				body: obToDel
			});*/

		});
		const btno = document.createElement('button');
		btno.textContent = "NO";
		btno.addEventListener('click', function(e) {
			e.preventDefault();
			console.log('no was clicked');
			bg.hidden = true;
		});

		const alert = document.createElement('p');
		const node = document.createTextNode("are you sure you want to delete?");
		alert.append(node);
		modal.append(alert);
		modal.append(bt);
		modal.append(btno);
		bg.append(modal);
		document.body.appendChild(bg);
	});

	//~~ REMOVE INGREDIENT FROM MEAL BUTTON
	removeIngred.addEventListener('click', function(e) {
		e.preventDefault();
		console.log('remove was clicked\ngood work today bro!');
	});

	//~~ CREATE MEAL BUTTON
	createMealBtn.addEventListener('click', function(e) {
		e.preventDefault();
		console.log(mealList);
	});
});