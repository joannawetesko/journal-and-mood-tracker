import React from 'react';
import { ButtonIcon } from 'react-rainbow-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

import { BUTTON_LOGOUT_TOOLTIP } from '../helpers/Constants'
import { logout } from "../api/apiClient";

import { Link } from "react-router-dom";

export default class CloseButton extends React.Component {

    render() {
        return <Link to="/auth"><ButtonIcon 
            variant="border-filled" 
            icon={<FontAwesomeIcon icon={faTimesCircle} />} 
            type="button"
            title={BUTTON_LOGOUT_TOOLTIP}
            onClick={(event) => logout()} /></Link>
    }
}