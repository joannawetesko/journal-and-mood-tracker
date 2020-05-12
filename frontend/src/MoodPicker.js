import React from 'react';
import './index.css';
import { 
  VisualPicker, 
  VisualPickerOption, 
  VisualPickerOptionFooter, 
} from 'react-rainbow-components';
import Emoji from "react-emoji-render";
import axios from 'axios';

export default class MoodPicker extends React.Component {
    
  MOOD = {
      '-2': 'mood-awful',
      '-1': 'mood-bad',
      '0': 'mood-neutral',
      '1': 'mood-good',
      '2': 'mood-awesome'
  };

    constructor(props) {
        super(props);
        this.state = {
            value: null
        };
        this.handleOnChange = this.handleOnChange.bind(this);
    }

  getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
  }

  authorization = {
    
 }

    componentDidMount() {
      this.getDataFromServer()
    }

    componentDidUpdate(prevProps, prevState) {
      if (!this.compareDates(prevProps.date,this.props.date)) {
          this.getDataFromServer();
      }
    }

    // move to date related utils
    getDateForServer(date) {
      return [
          date.getFullYear(), 
          ("0" + (date.getMonth() + 1)).slice(-2), 
          ("0" + date.getDate()).slice(-2)
      ].join("-");
  }

    getDataFromServer() {
      let date = this.getDateForServer(this.props.date);
      axios.get('http://localhost:8000/api/mood/?date=' + date, 
      {headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt_access_token")
     }}).then(response => {
          if (response.data[0] !== undefined) {
              if (response.data[0].mood in this.MOOD) {
                  this.setState({ value : this.MOOD[response.data[0].mood] });
              }
          }
          else {
              this.setState({ value : null });
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
                axios.get('http://localhost:8000/api/mood/?date=' + date, 
                {headers: {
                  Authorization: "Bearer " + localStorage.getItem("jwt_access_token")
               }}).then(response => {
                    if (response.data[0] !== undefined) {
                        if (response.data[0].mood in this.MOOD) {
                            this.setState({ value : this.MOOD[response.data[0].mood] });
                        }
                    }
                    else {
                        this.setState({ value : null });
                    }
                });
            });
          }
      });
  }

    handleOnChange(value) {
      let date = this.getDateForServer(this.props.date);
        axios.get('http://localhost:8000/api/mood/?date=' + date, this.authorization).then(response => {
            let data = response.data;
            if (Array.isArray(data) && data.length === 0) {
                // send post
                axios.post('http://localhost:8000/api/mood/',
                    {'mood': this.getKeyByValue(this.MOOD, value)},
                    this.authorization).then(response => {});
            }
            else {
                // send put
                axios.put('http://localhost:8000/api/mood/' + data[0].pk + '/',
                    {'mood': this.getKeyByValue(this.MOOD, value)},
                    this.authorization).then(response => {});
            }
        });
      return this.setState({ value });
    }

    compareDates(date1, date2) {
      return date1.getFullYear() === date2.getFullYear() 
          && date1.getMonth() === date2.getMonth()
          && date1.getDay() === date2.getDay()
   }

    render() {
        return (
            <VisualPicker
                value={this.state.value}
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
