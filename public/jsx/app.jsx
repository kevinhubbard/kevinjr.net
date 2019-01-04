var contentNode = document.getElementById('app');

class Navbar extends React.Component{
	render(){
		return(<div><h1 id='navigation'>Navbar component</h1><br/></div>);
	}
} 

class Bio extends React.Component{
	render(){
		return(<div id='bio'><h1>Biography component</h1></div>);
	}
}

class Social extends React.Component {
	render(){
		return( <div id='social'>
					<h3>Connect With Me</h3>
					<ul>
						<li className='link'><a href='https://www.linkedin.com/in/kevin-hubbard-jr'><img src='images/linkedIn.png'/></a></li>
						<li className='link'><a href="https://github.com/kevinhubbard"><img src='images/gitHub.png'/></a></li>
						<li className='link'><a href='https://stackoverflow.com'><img src='images/stackOverflow.png'/></a></li>
					</ul>
				</div>);
	}
}

class Toolbox extends React.Component {
	render(){
		return(<div id='tools'><h2>Tool box</h2></div>);
	}
}

class Mainbody extends React.Component {
	render(){
		return( <div id='bod' className='container'>
					<div className='row'>
						<Bio className='col-md'>
							<p>bio bs will go here</p>
						</Bio>
						<Social className='col-md'/>
					</div>
					<div className='row'><Toolbox className='col-md' /></div>
					<Form/>
				</div>)
	}
}

class Form extends React.Component {
	render(){
		return( <form action='/' method='POST'>
					<fieldset>
						<legend>Enter whatever wienerwobbler:</legend>
							<label htmlFor='name'>Name:</label>
							<input name='name' id='name' type='text'/><br/>

							<label htmlFor='email'>Email:</label>
							<input name='email' id='email' type='email'/><br/>

							<label htmlFor='age'>Age:</label>
							<input name='age' id='age' type='number' min='18' max='99'/><br/>

							<label htmlFor='submit'> Submit:</label>
							<input id='submit' type='submit' value='Suck it Dick head' />
					</fieldset>
				</form>)
	}
}


class Footer extends React.Component {
	render(){
		return(<footer>&copy;Kevin Jr {new Date().getFullYear()}</footer>)
	}
}

class App extends React.Component {
	render(){
		return(<div>
				<Navbar/>
				<Mainbody/>
				<Footer/>
			   </div>);
	}
}
ReactDOM.render(<App/>, contentNode);