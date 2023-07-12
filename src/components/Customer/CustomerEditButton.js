import React from 'react';
import PropTypes from 'prop-types';

export default function CustomerEditButton ({buttonCaption, handleOnClick}) {
    return (
        <button className="btn btn-warning m-4" onClick={handleOnClick}>
            {buttonCaption}
          </button>
    )
}

CustomerEditButton.propTypes = {
    buttonCaption: PropTypes.string.isRequired,
    handleOnClick: PropTypes.func.isRequired
}