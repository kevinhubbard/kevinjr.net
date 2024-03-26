window.addEventListener('DOMContentLoaded', () => {
	const ing = document.getElementById('ingredients');
	const addToMealBtn = document.getElementById('addToMeal');
	const createMealBtn = document.getElementById('createMeal');

	let iList = [];
	let mealList = [];

	getIngredients();
	async function getIngredients() {
		const response = await fetch('/meals/api');
		const ingredients = await response.json();

		for (let ingredient in ingredients) {
			const div = document.getElementById('ingredients');
			const img = document.createElement('img');
			const btn = document.createElement('button');
			btn.id = ingredients[ingredient].ingredientName;
			img.src = ingredients[ingredient].imgLocation;
			img.width = 100;
			img.height = 100;
			btn.append(img);
			div.append(btn);
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