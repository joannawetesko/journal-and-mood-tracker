import React from 'react';

import MoodPicker from './MoodPicker';
import Journal from './Journal';
import CardHeader from './CardHeader';

import { Redirect } from "react-router-dom";
import { THEME } from '../helpers/Constants';

import { 
    Application,
    Calendar,
    Card,
  } from 'react-rainbow-components';

export default class Main extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
        };
      }

    isUserAuthenticated() {
        return localStorage.getItem('username') !== null 
            && localStorage.getItem('jwt_access_token') !== null
    }

    render() {
        if (this.isUserAuthenticated()) {
            return <Application theme={THEME}>
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
            return <Redirect to="/auth" />
        }
    }
}