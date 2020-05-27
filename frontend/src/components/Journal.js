import React from 'react';
import Loader from 'react-loader-spinner';
import '../index.css';
import { Textarea } from 'react-rainbow-components';

import { JOURNAL_PLACEHOLDER, NO_ENTRY, ROWS, LOADER_STYLE } from '../helpers/Constants';
import { compareDates, formatDate } from '../helpers/Helpers'
import { getJournal, sendJournal } from '../api/apiClient';

const LoadingIndicatorJournal = props => {
    return (
      <div style={LOADER_STYLE}>
        <Loader type="ThreeDots" color="rgba(128,222,234,1)" height="50" width="50" />
      </div>
    );
  }

export default class Journal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            content: '',
            isLoading: false
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
        this.setState({ isLoading : true });
        const journalContent = await getJournal(formatDate(this.props.date));
        return this.setState({ content : journalContent, isLoading: false });
    }

    handleJournalChange(value) {
        sendJournal(formatDate(this.props.date), value);
        return this.setState({ content : value });
    }

    render() {
        const { isLoading } = this.state;
        if (isLoading) {
            return <LoadingIndicatorJournal/>;        
        }
        else {
            return <Textarea
                className="margin-20" 
                rows={ROWS} 
                placeholder={!(compareDates(this.props.date, new Date())) ? NO_ENTRY : JOURNAL_PLACEHOLDER}
                value={this.state.content}
                onChange={(event) => {this.handleJournalChange(event.target.value);}} 
                readOnly={!(compareDates(this.props.date, new Date()))}
            />
        };
    }
}