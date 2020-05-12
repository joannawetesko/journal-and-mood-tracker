import React from 'react';
import './index.css';
import { Textarea } from 'react-rainbow-components';
import { JOURNAL_PLACEHOLDER, NO_ENTRY } from './Constants';
import axios from 'axios';

export default class Journal extends React.Component {

    authorization = {
        headers: {
           Authorization: "Bearer " + localStorage.getItem("jwt_access_token")
        }
     }

    constructor(props) {
        super(props);
        this.state = {
            content: ''
        };
    }

    componentDidMount() {
        this.getContentFromServer();
    }

    componentDidUpdate(prevProps, prevState) {
        if (!this.compareDates(prevProps.date,this.props.date)) {
            this.getContentFromServer();
        }
    }

    // move to the class handling communication with server
    getContentFromServer() {
        let date = this.getDateForServer(this.props.date);
        axios.get('http://localhost:8000/api/journal/?date=' + date, {headers: {
            Authorization: "Bearer " + localStorage.getItem("jwt_access_token")
         }}).then(response => {
            if (response.data[0] !== undefined) {
                this.setState({ content : response.data[0].body });
            }
            else {
                this.setState({ content : '' });
            }
        }, error => {
            if (error.response.status === 401) {
                //refresh token and repeat request
                axios.post('http://localhost:8000/api/token/refresh/', {
                    'refresh': localStorage.getItem('jwt_refresh_token')
                }).then(response => {
                    localStorage.setItem('jwt_access_token', response.data.access)
                    localStorage.setItem('jwt_refresh_token', response.data.refresh)

                    let date = this.getDateForServer(this.props.date);
                    axios.get('http://localhost:8000/api/journal/?date=' + date, {headers: {
                        Authorization: "Bearer " + localStorage.getItem("jwt_access_token")
                     }}).then(response => {
                        if (response.data[0] !== undefined) {
                            this.setState({ content : response.data[0].body });
                        }
                        else {
                            this.setState({ content : '' });
                        }
                    });
                });
            }
        });
    }

    // move to date related utils
    compareDates(date1, date2) {
        return date1.getFullYear() === date2.getFullYear() 
            && date1.getMonth() === date2.getMonth()
            && date1.getDate() === date2.getDate();
    }

    // move to date related utils
    getDateForServer(date) {
        return [
            date.getFullYear(), 
            ("0" + (date.getMonth() + 1)).slice(-2), 
            ("0" + date.getDate()).slice(-2)
        ].join("-");
    }

    // move to the class handling communication with server
    updateServer(value) {
        let date = this.getDateForServer(this.props.date);
        axios.get('http://localhost:8000/api/journal/?date=' + date, this.authorization).then(response => {
            let data = response.data;
            if (Array.isArray(data) && data.length === 0) {
                // send post
                axios.post('http://localhost:8000/api/journal/',
                    {'body': value}, this.authorization).then(response => {});
            }
            else {
                // send put
                axios.put('http://localhost:8000/api/journal/' + data[0].pk + '/',
                    {'body': value},
                    this.authorization).then(response => {});
            }
        });
    }

    render() {
        return <Textarea 
            className="margin-20" 
            rows={14} 
            placeholder={!(this.compareDates(this.props.date, new Date())) ? NO_ENTRY : JOURNAL_PLACEHOLDER}
            value={this.state.content}
            onChange={(event) => {
                this.setState({ content : event.target.value });
                this.updateServer(event.target.value);
                }
            } 
        />
    }
}