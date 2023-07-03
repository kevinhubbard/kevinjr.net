window.addEventListener("DOMContentLoaded", (event) => {
async function logJSONData() {
	const URL = "http://kevinjr.net/botw/data"
  const response = await fetch(URL);
  console.log(response);
  const jsonData = await response.json();
  for(var i = 0; i<jsonData.length; i++){
  	let thing = document.createElement('p');
  	thing.innerText = jsonData[i].ingredientName;
  	document.getElementById('farts').appendChild(thing);
  }
}

logJSONData();

});