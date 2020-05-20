import React from 'react';

import MoodPicker from './MoodPicker';
import Journal from './Journal';
import CardHeader from './CardHeader';
import Login from './Login';
import Register from './Register';

import { 
    Application,
    Calendar,
    Card,
  } from 'react-rainbow-components';

import {
    BrowserRouter,
    Switch,
    Route,
    Redirect
  } from "react-router-dom";


const theme = {
  rainbow: {
      palette: {
          brand: '#80deea',
          mainBackground: '#303030',
      },
  },
};

class Main extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
        };
      }

    isAuthenticated() {
        return localStorage.getItem('username') !== null
    }

    render() {
        if (this.isAuthenticated()) {
            return <Application theme={theme}>
            <Card className="margin-20" title={<CardHeader username={localStorage.getItem("username")} />}>
            <div className="grid">
                <div><Calendar 
                    className="margin-20"
                    value={ this.state.date }
                    onChange={ value => this.setState({ date: value }) }
                    minDate={ new Date(2019, 0, 1) }
                    maxDate={ new Date() } />
                </div>
                <div>
                <Journal className="margin-20" date={this.state.date} />
                </div>
            </div>
            <MoodPicker date={this.state.date} />
            </Card>
            </Application>
        }
        else {
            return <Redirect to="/login" />
        }
    }
}

export default class App extends React.Component {

    render() {
            return <BrowserRouter>
                <Switch>
                    <Route path="/" component={Main} exact />
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                </Switch>
            </BrowserRouter>
    } 
}