import React, { Component } from 'react';
import logo from './logo.svg';
import Drawer from './Drawer';

import './App.css';

class App extends Component {
	state = {
		isDrawerOpen: false,
	}

	closeDrawer = () => {
		this.setState({
			isDrawerOpen: false,
		});
	}
	openDrawer = () => {
		this.setState({
			isDrawerOpen: true,
		});
	}
	render() {
		return (
			<div className="App">
				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<h1 className="App-title">Welcome to React</h1>
				</header>
				<p className="App-intro">
					To get started, edit <code>src/App.js</code> and save to reload.
				</p>
				<button onClick={this.openDrawer}>Show Modal</button>
				<Drawer
					isDrawerOpen={this.state.isDrawerOpen}
				>
					<p>This text is portaled into Off Canvas!</p>
					<button onClick={this.closeDrawer}>Close Modal</button>
				</Drawer>
			</div>
		);
	}
}

export default App;
