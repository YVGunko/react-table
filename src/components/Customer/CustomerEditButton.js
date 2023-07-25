import React from 'react';
import PropTypes from 'prop-types';
import { Button } from "react-bootstrap";

export default function CustomerEditButton ({caption, onClick}) {
    return (
        <Button variant="warning" onClick={onClick}>
            {caption}
          </Button>
    )
}

CustomerEditButton.propTypes = {
    caption: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
}