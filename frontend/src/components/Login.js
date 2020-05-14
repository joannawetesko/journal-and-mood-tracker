import React from 'react';

import { Application, Card, Input, Button } from 'react-rainbow-components';
import { Link } from "react-router-dom";
import { login } from "../api/apiClient";

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

    loginButtonClick() {
        return login(this.state.username, this.state.password);
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
                    onClick={(event) => this.loginButtonClick(event)}
                    variant="neutral"
                    className="rainbow-m-around_medium"
                /></Link>
            </Card>
        </Application>
    }
}