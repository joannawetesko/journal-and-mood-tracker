import React from 'react';
import '../index.css';
import { 
  VisualPicker, 
  VisualPickerOption, 
  VisualPickerOptionFooter, 
} from 'react-rainbow-components';
import Emoji from "react-emoji-render";

import { compareDates, formatDate, getKeyByValue } from '../helpers/Helpers';
import { MOOD } from '../helpers/Constants';
import { getMood, sendMood } from '../api/apiClient';


export default class MoodPicker extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: null
        };
        this.handleMoodChange = this.handleMoodChange.bind(this);
    }

    componentDidMount() {
      this.loadData()
    }

    componentDidUpdate(prevProps, prevState) {
      !compareDates(prevProps.date,this.props.date) && this.loadData();
    }

    loadData() {
      let moodKey = getMood(formatDate(this.props.date));
      return (moodKey in MOOD) ? this.setState({ value : MOOD[moodKey] }) : this.setState({ value : null });
    }

    handleMoodChange(value) {
      sendMood(formatDate(this.props.date), getKeyByValue(MOOD, value));
      return this.setState({ value: value });
    }

    render() {
        return (
            <VisualPicker
                value={this.state.value}
                onChange={this.handleMoodChange}
                id="mood-visual-picker"
                className="mood-picker">
                
                <VisualPickerOption
                    name="mood-awful" 
                    className="mood-picker" 
                    footer={<VisualPickerOptionFooter label="Awful" />}>
                  
                  <Emoji text=":tired_face:" className="emoji-size" />

                </VisualPickerOption>

                <VisualPickerOption 
                    name="mood-bad" 
                    className="mood-picker"
                    footer={<VisualPickerOptionFooter label="Bad" />}>

                  <Emoji text=":disappointed:" className="emoji-size" />
                
                </VisualPickerOption>
                
                <VisualPickerOption 
                    name="mood-neutral"
                    className="mood-picker"
                    footer={<VisualPickerOptionFooter label="Neutral" />}>

                  <Emoji text=":confused:" className="emoji-size" />
                
                </VisualPickerOption>
                
                <VisualPickerOption
                    name="mood-good"
                    className="mood-picker"
                    footer={<VisualPickerOptionFooter label="Good" />}>

                  <Emoji text=":smile:" className="emoji-size" />
                
                </VisualPickerOption>
                
                <VisualPickerOption
                    name="mood-awesome"
                    className="mood-picker" 
                    footer={<VisualPickerOptionFooter label="Awesome" />}>

                    <Emoji text=":heart_eyes:" className="emoji-size" />

                </VisualPickerOption>
            </VisualPicker>
        );
    }
}