import React from 'react';

import { withRouter } from 'react-router-dom';
import { Application, Card, Input, Button, ButtonGroup, Notification } from 'react-rainbow-components';
import { login, register } from "../api/apiClient";

import { 
    INPUT_STYLE, 
    BUTTON_STYLE, 
    LOGO, 
    LABEL_USERNAME, 
    LABEL_PASSWORD, 
    LABEL_LOG_IN,
    LABEL_REGISTER,
    TOAST_LOGIN_FAIL,
    TOAST_REGISTRATION_FAIL,
    TOAST_REGISTRATION_SUCCESSFUL,
    TOAST_TITLE_LOGIN_FAIL,
    TOAST_TITLE_REGISTRATION_FAIL,
    TOAST_TITLE_REGISTRATION_SUCCESSFUL,
    THEME
} from '../helpers/Constants';

class Login extends React.Component {

    constructor(props){
        super(props);
        this.state={
            username:'',
            password:'',
            register_success: false,
            register_fail: false,
            login_fail: false
        }
    }

    setInitialState() {
        this.setState({
            register_fail : false,
            register_success: false,
            login_fail: false
        });
    }

    async registerButtonClick() {
        this.setInitialState();
        try {
            await register(this.state.username, this.state.password);
            this.setState({ register_success : true });
        }
        catch {
            this.setState({ register_fail : true });
        }
    }

    async loginButtonClick() {
        this.setInitialState();
        try {
            const data = await login(this.state.username, this.state.password);
            localStorage.setItem('jwt_access_token', data.access);
            localStorage.setItem('jwt_refresh_token', data.refresh);
            localStorage.setItem('username', this.state.username);
            this.props.history.push('/');
        }
        catch {
            this.setState({ login_fail : true });
        }
    }

    render() {
        return <Application theme={THEME}>
                <Card className="singular-column margin-20 login-register">
                <div>
                <h2 style={LOGO}>Journaly</h2>
                { this.state.register_success &&
                    <Notification
                        title={TOAST_TITLE_REGISTRATION_SUCCESSFUL}
                        description={TOAST_REGISTRATION_SUCCESSFUL}
                        icon="success"
                        hideCloseButton={true}
                    />
                }
                { this.state.register_fail &&
                    <Notification
                        title={TOAST_TITLE_REGISTRATION_FAIL}
                        description={TOAST_REGISTRATION_FAIL}
                        icon="error"
                        hideCloseButton={true}
                    />
                } 
                { this.state.login_fail &&
                    <Notification
                        title={TOAST_TITLE_LOGIN_FAIL}
                        description={TOAST_LOGIN_FAIL}
                        icon="error"
                        hideCloseButton={true}
                    />
                } 
                <Input
                    label={LABEL_USERNAME}
                    type="text"
                    className="rainbow-p-around_medium"
                    style={INPUT_STYLE}
                    value={this.state.username}
                    onChange={(event) => {
                        this.setState({ username : event.target.value }); }}
                />

                <Input
                    label={LABEL_PASSWORD}
                    type="password"
                    className="rainbow-p-around_medium"
                    style={INPUT_STYLE}
                    value={this.state.password}
                    onChange={(event) => {
                        this.setState({ password : event.target.value }); }}
                />
                <ButtonGroup className="margin-20">
                    <Button 
                        label={LABEL_REGISTER}
                        onClick={(event) => this.registerButtonClick(event)}
                        variant="neutral"
                        className="button"
                        style={BUTTON_STYLE} 
                    />
                    <Button 
                        label={LABEL_LOG_IN}
                        onClick={(event) => this.loginButtonClick(event)}
                        variant="neutral"
                        className="button"
                    />
                </ButtonGroup>
                </div>
            </Card>
        </Application>
    }
}

export default withRouter(Login)