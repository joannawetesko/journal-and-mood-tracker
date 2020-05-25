import React from 'react';

import Main from './Main';
import Authorization from './Authorization';

import {
    BrowserRouter,
    Switch,
    Route
  } from "react-router-dom";

export default class App extends React.Component {

    render() {
        return <BrowserRouter>
            <Switch>
                <Route path="/" component={Main} exact />
                <Route path="/auth" component={Authorization} />
            </Switch>
        </BrowserRouter>
    } 
}