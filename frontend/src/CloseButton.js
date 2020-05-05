import React from 'react';
import { ButtonIcon } from 'react-rainbow-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

import { BUTTON_LOGOUT_TOOLTIP } from './Constants'


export default class CloseButton extends React.Component {

    render() {
        return <ButtonIcon 
            variant="border-filled" 
            icon={<FontAwesomeIcon icon={faTimesCircle} />} 
            type="button"
            title={BUTTON_LOGOUT_TOOLTIP} />
    }
}