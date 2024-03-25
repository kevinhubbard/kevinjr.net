window.addEventListener('DOMContentLoaded', () => {
	getIngredients();
	async function getIngredients() {
		const response = await fetch('/meals/api');
		const ingredients = await response.json();

		for (let ingredient in ingredients) {
			const div = document.getElementById('ingredients');
			const img = document.createElement('img');
			const btn = document.createElement('button');
			img.src = ingredients[ingredient].imgLocation;
			img.width = 100;
			img.height = 100;
			btn.append(img);
			div.append(btn);
		}
	}
});