const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
mongoose.connect('mongodb://heroku_3pj31sf1:73t6prtueeq1a9c40ljtit5s31@ds127883.mlab.com:27883/heroku_3pj31sf1', {useNewUrlParser: true});
const port = process.env.PORT || 8080;

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log('connected to db nigga!'));





app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));


app.get('/', (req, res) => {
	res.sendFile('index');
});

app.post('/', (req,res) => {
	const Form = mongoose.model('Form', {name: String, email: String, age: Number});
	var data = req.body;

	//console.log(`Name: ${data.name} \nEmail: ${data.email} \nAge: ${data.age}`);
	const entry = new Form({name: data.name, email: data.email, age: data.age});
	entry.save().then(() => console.log('logged to db my niBBa!'));

	res.redirect('/');
});

app.listen(port, () => console.log(`App listening on port: [${port}]`));