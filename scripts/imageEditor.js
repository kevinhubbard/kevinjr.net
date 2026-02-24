const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const originalsDir = '../../Photos';
const fullDir = '../assets/images/photos/full';
const files = await fs.readdir(originalsDir);

try {
	for (const file of files) {
		const inputPath = path.join(originalsDir, file);
		const outputPath = path.join(fullDir, file);

		const info = await sharp(inputPath)
			.rotate()
			.resize({
				width: 2000,
				height: 2000,
				fit: 'inside',
				withoutEnlargement: true
			})
			.jpeg({quality:82})
			.toFile(outputPath);
		fs.readFile('../assets/images/photos/photos.json', 'utf8', function(err, data) {
			if (err) throw err;
			let jsonArray = JSON.parse(data);
			jsonArray.push({
				"id": file,
				"thumb": `/photos/thumbs/${file}`,
				"full": `/photos/full/${file}`,
				"width": info.width,
				"height": info.height,
				"date": new Date().toISOString()
			});

			fs.writeFile('../assets/images/photos/photos.json', JSON.stringify(jsonArray));
		})
	}
} catch (err) {
	console.error("Error updating file.", err);
}