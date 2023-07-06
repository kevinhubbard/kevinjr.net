window.addEventListener("DOMContentLoaded", (event) => {
async function logJSONData() {
    const res = await fetch("http://kevinjr.net/botw/data");
    const ingreds = await res.json();

  for(var i = 0; i<ingreds.length; i++){
  	let thing = document.createElement('p');
  	thing.innerText = ingreds[i].ingredientName;
  	document.getElementById('farts').appendChild(thing);
  }
}

logJSONData();

document.getElementById('delbut').addEventListener("click", function(){
    let n = document.getElementById("itd").value;
    fetch('http://localhost:3000/botw', {
        method: 'delete',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({
            name: n
        })
    }).then(res => {
        if (res.ok) return res.json();
                    document.getElementById('itd').value = '';
        window.location.reload();
    }).then(data => {

    })
});

});