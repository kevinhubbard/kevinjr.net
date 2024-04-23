window.addEventListener('DOMContentLoaded', () => {
	//const ing = document.getElementById('ingredients');
	const addToMealBtn = document.getElementById('addToMeal');
	const createMealBtn = document.getElementById('createMeal');
	const editIngred = document.getElementById('editIngred');
	const cancelUpdate = document.getElementById('cancelUpdate');
	const updateIngred = document.getElementById('updateIngred');
	updateIngred.hidden = true;
	editIngred.disabled = true;
	cancelUpdate.hidden = true;

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

	function dvPercentage(iSize, dvTotal) {
		let a = parseInt(iSize);
		let b = parseInt(dvTotal);

		if (a === 0 && b === 0) {
			return 0;
		}
		console.log(a/b);
		return ((a/b) * 100).toFixed(1);
	}

	function buildButton(name, location) {
		const img = document.createElement('img');
		const btn = document.createElement('button');
		btn.id = name;
		img.src = location;
		img.width = 75;
		img.height = 75;
		btn.append(img);
		btn.addEventListener('click', (e) => {
			document.getElementById('editIngred').disabled = false;
			let obj = iList.find(o => o.ingredientName === btn.id);
			//SET Ingredient Info
			document.getElementById('nameInfo').innerText = obj.ingredientName;
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
					fruitFoodGroup.append(buildButton(ingredients[ingredient].ingredientName, ingredients[ingredient].imgLocation));
					break;
				case 'vegetable':
					vegetableFoodGroup.append(buildButton(ingredients[ingredient].ingredientName, ingredients[ingredient].imgLocation));
					break;
				case 'grain':
					grainFoodGroup.append(buildButton(ingredients[ingredient].ingredientName, ingredients[ingredient].imgLocation));
					break;
				case 'protein':
					proteinFoodGroup.append(buildButton(ingredients[ingredient].ingredientName, ingredients[ingredient].imgLocation));
					break;
				case 'dairy':
					dairyFoodGroup.append(buildButton(ingredients[ingredient].ingredientName, ingredients[ingredient].imgLocation));
					break;
				default:
					console.log('not a food group');
			}
		}
		for (let i = 0; i < ingredients.length; i++) {
			iList.push(ingredients[i]);
			//console.log(iList.length);
		}
	}

	addToMealBtn.addEventListener('click', function(e) {
		e.preventDefault();
		let add = document.getElementById('nameInfo').innerText;
		let obj = iList.find(o => o.ingredientName === add);
		mealList.push(obj);
		let pic = document.createElement("img");
		let btn = document.createElement("button");
		btn.className = 'mealIngredient';
		pic.src = obj.imgLocation;
		pic.width = 75;
		pic.height = 75;
		btn.append(pic);

		btn.addEventListener('click', function(e) {
			e.preventDefault();
			console.log('keep working bro.');
		});

		document.getElementById('mealIngredients').append(btn);

	});

	editIngred.addEventListener('click', function(e) {
		e.preventDefault();
		document.getElementById('addCalorie').style.pointerEvents = 'none';
		editIngred.hidden = true;
		addToMealBtn.hidden = true;
		updateIngred.hidden = false;
		cancelUpdate.hidden = false;


		const info = document.getElementsByClassName('info');
		for(i=0; i<info.length; i++) {
			console.log(info[i]);
			info[i].hidden = true;
			const tb = document.createElement('input');
			tb.className = "testCase";
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
	});

	updateIngred.addEventListener('click', function(e) {
		e.preventDefault();
	});

	createMealBtn.addEventListener('click', function(e) {
		e.preventDefault();
		console.log(mealList.length);
	});
});