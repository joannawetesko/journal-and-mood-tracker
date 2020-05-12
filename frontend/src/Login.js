import React from 'react';

import { Application, Card, Input, Button } from 'react-rainbow-components';
import { Link } from "react-router-dom";

import axios from 'axios';

const inputStyles = {
    width: 300,
};

const theme = {
    rainbow: {
        palette: {
            brand: '#80deea',
            mainBackground: '#303030',
        },
    },
};

export default class Login extends React.Component {

    constructor(props){
        super(props);
        this.state={
            username:'',
            password:''
        }
    }

    handleClick() {
        axios.post('http://localhost:8000/api/token/', {
            username: this.state.username,
            password: this.state.password
          }
        ).then(response => {
            localStorage.setItem('jwt_access_token', response.data.access);
            localStorage.setItem('jwt_refresh_token', response.data.refresh);
            localStorage.setItem('username', this.state.username);
        }, (error) => {
            console.log(error);
        });
    }

    render() {
        return <Application theme={theme}>
            <Card className="singular-column margin-20">
                <Input
                    label="Username"
                    type="text"
                    className="rainbow-p-around_medium"
                    style={inputStyles}
                    value={this.state.username}
                    onChange={(event) => {
                        this.setState({ username : event.target.value }); }}
                />

                <Input
                    label="Password"
                    type="password"
                    className="rainbow-p-around_medium"
                    style={inputStyles}
                    value={this.state.password}
                    onChange={(event) => {
                        this.setState({ password : event.target.value }); }}
                />
                <Link to="/"><Button 
                    label="Log in"
                    onClick={(event) => this.handleClick(event)}
                    variant="neutral"
                    className="rainbow-m-around_medium"
                /></Link>
            </Card>
        </Application>
    }
}