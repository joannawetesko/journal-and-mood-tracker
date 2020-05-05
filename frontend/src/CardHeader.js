import React from 'react';
import { Chip, Avatar } from 'react-rainbow-components';

import CloseButton from './CloseButton'

const AvatarStyles = {
    width: '30px',
    height: '30px',
    marginTop: '-2px',
  };
  
const ChipContainer = {
    paddingLeft: 0,
};

export default class CardHeader extends React.Component {

    render() {
        return <div>
        <CloseButton />
        <Chip
          style={ChipContainer}
          className="rainbow-m-around_medium"
          label={<span><Avatar
                style={AvatarStyles}
                className="rainbow-m-right_x-small"
                src="./avatar.png"
                assistiveText={this.props.username}
                title={this.props.username}
                size="medium" />
                {this.props.username}</span>
            } />
        </div>
    };

}