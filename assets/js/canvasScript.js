window.addEventListener("DOMContentLoaded", function(event) {
	
});





























































// 	const dpi = window.devicePixelRatio || 1;
// let can = document.getElementById('frontCanvas');
// let ctx = can.getContext('2d');


// let ca1 = document.getElementById('backCanvas');
// let ct1 = ca1.getContext('2d');


// // Get CSS display size
// let style_height = +getComputedStyle(can).getPropertyValue("height").slice(0, -2);
// let style_width = +getComputedStyle(can).getPropertyValue("width").slice(0, -2);

// // Set canvas resolution
// can.width = style_width * dpi;
// can.height = style_height * dpi;
// ctx.scale(dpi, dpi);
// ct1.scale(dpi, dpi);

// // Optional: for crisp 1px lines
// ctx.translate(0.5, 0.5);

// let w = style_width;
// let h = style_height;

// let offset = 0; 



// const displayWidth = ca1.clientWidth;
// const displayHeight = ca1.clientHeight;

// // Set actual canvas pixel size to match
// ca1.width = displayWidth;
// ca1.height = displayHeight;




// function draw() {
// 	ctx.clearRect(-0.5, -0.5, w, h); // Clear previous frame
// 	ctx.strokeStyle = "#FF69B4";
// 	// Draw horizontal lines
// 	for (let i = 0; i < h + 24; i += 24) {
// 		let y = (i + offset) % (h + 24);
// 		ctx.beginPath();
// 		ctx.moveTo(0, y);
// 		ctx.lineTo(w, y);
// 		ctx.stroke();
// 	}

// 	// Draw vertical lines (static)
// 	for (let x = 0; x < w; x += 24) {
// 		ctx.beginPath();
// 		ctx.moveTo(x, 0);
// 		ctx.lineTo(x, h);
// 		ctx.stroke();
// 	}

// 	offset -= .25; // Speed of movement
// 	if (offset < 0) offset += 24;

// ctx.font = '128px Courier New';
// ctx.textAlign = 'center';     // horizontally center
// ctx.textBaseline = 'bottom';  // position based on bottom of text
// ctx.fillStyle = 'white';      // fallback in case gradient fails

// // Create vertical gradient (from top to bottom of text area)
// let textY = h - 40; // 40px from bottom
// let gradient = ctx.createLinearGradient(0, textY - 40, 0, textY);
// gradient.addColorStop(0, 'cyan');   // top color of text
// gradient.addColorStop(1, 'purple'); // bottom color of text

// ctx.fillStyle = gradient;

// // Draw centered text at bottom
// //ctx.fillText("Kevin Jr", w / 2, textY + 50);
// requestAnimationFrame(draw);


	
// }

// draw();
