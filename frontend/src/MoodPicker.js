import React from 'react';
import './index.css';
import { 
  VisualPicker, 
  VisualPickerOption, 
  VisualPickerOptionFooter, 
} from 'react-rainbow-components';
import Emoji from "react-emoji-render";

export default class MoodPicker extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            value: null
        };
        this.handleOnChange = this.handleOnChange.bind(this);
        this.updateValue = this.updateValue.bind(this);
    }

    handleOnChange(value) {
      return this.setState({ value });
    }

    compareDates(date1, date2) {
      return date1.getFullYear() === date2.getFullYear() 
          && date1.getMonth() === date2.getMonth()
          && date1.getDay() === date2.getDay()
   }

    updateValue() {
      return !(this.compareDates(this.props.date, new Date())) ? this.props.value : this.state.value;
    }

    render() {
        return (
            <VisualPicker
                value={this.updateValue()}
                onChange={this.handleOnChange}
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
