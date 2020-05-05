import React from 'react';

import MoodPicker from './MoodPicker';
import Journal from './Journal';
import CardHeader from './CardHeader';

import { 
    Application,
    Calendar,
    Card,
  } from 'react-rainbow-components';


const theme = {
  rainbow: {
      palette: {
          brand: '#80deea',
          mainBackground: '#303030',
      },
  },
};

// MOCKED DATA FROM SERVER
let data = [
    {
        'date': new Date(2020, 4, 3),
        'journal_content': 'This is 3.05 entry',
        'mood_value': 'mood-good'
    },
    {
        'date': new Date(2020, 4, 4),
        'journal_content': 'This is 4.05 entry',
        'mood_value': 'mood-awful'
    }
];

export default class App extends React.Component {

    //TODO: authorization

    constructor(props) {
        super(props);
        //TODO: get data from server as initial data
        this.state = {
            date: new Date(),
            journal_content: null,
            mood_value: ""
        };
      }

    onCalendarChange(value) {
        this.setState({date: value, journal_content: '', mood_value: ''});

        //TODO: replace with data from server
        let app = this;
        data.some(function(entry) {
            if (app.compareDates(value, entry.date)) {
                app.setState({
                    'journal_content': entry.journal_content,
                    'mood_value': entry.mood_value
                });
            };
            return '';
        });
    }

    compareDates(date1, date2) {
        return date1.getFullYear() === date2.getFullYear() 
            && date1.getMonth() === date2.getMonth()
            && date1.getDay() === date2.getDay()
    }

    render() {
      return <Application theme={theme}>
        <Card className="margin-20" title={<CardHeader username="asia" />}>
          <div className="grid">
            <div><Calendar 
                    className="margin-20"
                    value={ this.state.date }
                    onChange={value => {
                        this.setState({ date: value });
                        this.onCalendarChange(value);
                    }}
                    minDate={new Date(2019, 0, 1)}
                    maxDate={new Date()} />
            </div>
            <div>
              <Journal content={this.state.journal_content} date={this.state.date} />
              <MoodPicker value={this.state.mood_value} date={this.state.date} />
            </div>
          </div>
        </Card>
        </Application>
    } 
}