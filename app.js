const express = require('express');
const app = express();

const port = process.env.PORT || 8080;

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
	res.sendFile('index');
});

app.listen(port, () => console.log(`App listening on port: [${port}]`));