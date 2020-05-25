import React from 'react';
import { Chip, Avatar } from 'react-rainbow-components';
import { AVATAR_STYLE, AVATAR_SOURCE, CHIP_CONTAINER } from '../helpers/Constants';
 
import CloseButton from './CloseButton'

export default class CardHeader extends React.Component {

    render() {
        return <div>
        <CloseButton />
        <Chip
          style={CHIP_CONTAINER}
          className="rainbow-m-around_medium"
          label={<span><Avatar
                style={AVATAR_STYLE}
                className="rainbow-m-right_x-small"
                src={AVATAR_SOURCE}
                assistiveText={this.props.username}
                title={this.props.username}
                size="medium" />
                {this.props.username}</span>
            } />
        </div>
    };

}