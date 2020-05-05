import React from 'react';
import './index.css';
import { Textarea } from 'react-rainbow-components';
import { JOURNAL_PLACEHOLDER, NO_ENTRY } from './Constants';

export default class Journal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            content: ''
        };
    }

    compareDates(date1, date2) {
        return date1.getFullYear() === date2.getFullYear() 
            && date1.getMonth() === date2.getMonth()
            && date1.getDay() === date2.getDay()
    }

    updateServer() {
        //TODO: send data to server
    }

    render() {
        return <Textarea 
            className="margin-20" 
            rows={14} 
            placeholder={!(this.compareDates(this.props.date, new Date())) ? NO_ENTRY : JOURNAL_PLACEHOLDER}
            value={!(this.compareDates(this.props.date, new Date())) ? this.props.content : this.state.content}
            onChange={(event) => {
                this.setState({ content : event.target.value });
                this.updateServer();
                }
            } 
        />
    }
}