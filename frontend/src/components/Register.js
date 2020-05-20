import React from 'react';

import { withRouter } from 'react-router-dom';
import { Application, Card, Input, Button } from 'react-rainbow-components';
import { register } from "../api/apiClient";


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

class Register extends React.Component {

    constructor(props){
        super(props);
        this.state={
            username:'',
            password:''
        }
    }

    async registerButtonClick() {
        const status = await register(this.state.username, this.state.password);
        status === 200 ? this.props.history.push('/login') : this.props.history.push('/register');
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
                <Button 
                    label="Register"
                    onClick={(event) => this.registerButtonClick(event)}
                    variant="neutral"
                    className="rainbow-m-around_medium"
                />
            </Card>
        </Application>
    }
}

export default withRouter(Register)