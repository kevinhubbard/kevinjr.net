var contentNode = document.getElementById('app');

class Test extends React.Component{
	render(){
		return(<h1 id='first'>1st component</h1>);
	}
} 

class Test2 extends React.Component{
	render(){
		return(<h1 id='second'>2nd component</h1>);
	}
}

class Test3 extends React.Component {
	render(){
		return(<h1 id='third'>3rd component</h1>);
	}
}

class App extends React.Component {
	render(){
		return(<div>
				<Test/>
				<Test2/>
				<Test3/>
			   </div>);
	}
}
ReactDOM.render(<App/>, contentNode);