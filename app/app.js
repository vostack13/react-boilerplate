import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import './assets/generic.css';
import Home from './Home'

const App = () => <Switch>
	<Route path='/' component={Home} exact />
</Switch>

ReactDOM.render(
	<BrowserRouter>
		<App />
	</BrowserRouter>,

	document.getElementById('root')
)