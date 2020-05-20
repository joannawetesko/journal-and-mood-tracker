import React from 'react';

import { withRouter } from 'react-router-dom';
import { Application, Card, Input, Button } from 'react-rainbow-components';
import { login } from "../api/apiClient";

const inputStyles = {
    width: 300,
};

const loginButtonStyle = {
    marginLeft: "100px",
}

const logo = {
    fontSize: "80px",
    fontWeight: "400",
    paddingBottom: "60px",
}

const theme = {
    rainbow: {
        palette: {
            brand: '#80deea',
            mainBackground: '#303030',
        },
    },
};

class Login extends React.Component {

    constructor(props){
        super(props);
        this.state={
            username:'',
            password:''
        }
    }

    async loginButtonClick() {
        const data = await login(this.state.username, this.state.password);
        localStorage.setItem('jwt_access_token', data.access);
        localStorage.setItem('jwt_refresh_token', data.refresh);
        localStorage.setItem('username', this.state.username);
        this.props.history.push('/');
    }

    render() {
        return <Application theme={theme}>
            <Card className="singular-column margin-20 login-register">
                <div>
                <h2 style={logo}>Journaly</h2>
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
                <Button 
                    label="Log in"
                    onClick={(event) => this.loginButtonClick(event)}
                    variant="neutral"
                    className="rainbow-m-around_medium button"
                    style={loginButtonStyle}
                    
                />
                </div>
            </Card>
        </Application>
    }
}

export default withRouter(Login)