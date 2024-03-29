window.addEventListener('DOMContentLoaded', () => {
	//const ing = document.getElementById('ingredients');
	const addToMealBtn = document.getElementById('addToMeal');
	const createMealBtn = document.getElementById('createMeal');

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

	getIngredients();
	async function getIngredients() {
		const response = await fetch('/meals/api');
		const ingredients = await response.json();

		for (let ingredient in ingredients) {

			const img = document.createElement('img');
			const btn = document.createElement('button');

			const fg = ingredients[ingredient].foodGroup.toLowerCase();

/*			if (fg === 'fruit') {
				console.log('fruit');
			}
						if (fg === 'vegetable') {
				console.log('vegetable');
			}
						if (fg === 'grain') {
								btn.id = ingredients[ingredient].ingredientName;
				img.src = ingredients[ingredient].imgLocation;
				img.width = 100;
				img.height = 100;
				btn.append(img);
				grainFoodGroup.append(btn);
			}
						if (fg === 'protein') {
				console.log('protein');
			}
						if (fg === 'dairy') {
				console.log('dairy');
			}
*/
			switch(fg) {
			case 'fruit':
				btn.id = ingredients[ingredient].ingredientName;
				img.src = ingredients[ingredient].imgLocation;
				img.width = 100;
				img.height = 100;
				btn.append(img);
				fruitFoodGroup.append(btn);
				break;
			case 'vegetable':
				btn.id = ingredients[ingredient].ingredientName;
				img.src = ingredients[ingredient].imgLocation;
				img.width = 100;
				img.height = 100;
				btn.append(img);
				vegetableFoodGroup.append(btn);
				break;
			case 'grain':
				btn.id = ingredients[ingredient].ingredientName;
				img.src = ingredients[ingredient].imgLocation;
				img.width = 100;
				img.height = 100;
				btn.append(img);
				grainFoodGroup.append(btn);
				break;
			case 'protein':
				btn.id = ingredients[ingredient].ingredientName;
				img.src = ingredients[ingredient].imgLocation;
				img.width = 100;
				img.height = 100;
				btn.append(img);
				proteinFoodGroup.append(btn);
				break;
			case 'dairy':
				btn.id = ingredients[ingredient].ingredientName;
				img.src = ingredients[ingredient].imgLocation;
				img.width = 100;
				img.height = 100;
				btn.append(img);
				dairyFoodGroup.append(btn);
				break;
			default:
				console.log('not a food group');
			}


			btn.addEventListener('click', (e) => {
				let obj = iList.find(o => o.ingredientName === btn.id);

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
		}

		for (let i = 0; i < ingredients.length; i++) {
			iList.push(ingredients[i]);
			console.log(iList.length);
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
		pic.width = 100;
		pic.height = 100;
		btn.append(pic);

		btn.addEventListener('click', function(e) {
			e.preventDefault();
			console.log('keep working bro.');
		});

		document.getElementById('mealIngredients').append(btn);

	});

	createMealBtn.addEventListener('click', function(e) {
		e.preventDefault();
		console.log(mealList.length);
	});
});