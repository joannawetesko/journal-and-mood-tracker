import React from 'react';
import '../index.css';
import { Textarea } from 'react-rainbow-components';

import { JOURNAL_PLACEHOLDER, NO_ENTRY } from '../helpers/Constants';
import { compareDates, formatDate } from '../helpers/Helpers'
import { getJournal, sendJournal } from '../api/apiClient';


export default class Journal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            content: ''
        };
        this.handleJournalChange = this.handleJournalChange.bind(this);
    }

    async componentDidMount() {
        await this.loadData();
    }

    async componentDidUpdate(prevProps, prevState) {
        !compareDates(prevProps.date,this.props.date) && await this.loadData();
    }

    async loadData() {
        const journalContent = await getJournal(formatDate(this.props.date));
        return this.setState({ content : journalContent });
    }

    handleJournalChange(value) {
        sendJournal(formatDate(this.props.date), value);
        return this.setState({ content : value });
    }

    render() {
        return <Textarea 
            className="margin-20" 
            rows={14} 
            placeholder={!(compareDates(this.props.date, new Date())) ? NO_ENTRY : JOURNAL_PLACEHOLDER}
            value={this.state.content}
            onChange={(event) => {this.handleJournalChange(event.target.value);}} 
            readOnly={!(compareDates(this.props.date, new Date()))}
        />
    }
}