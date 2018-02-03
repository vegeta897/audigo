import React from 'react';
import PropTypes from 'prop-types';

// This isn't technically an organism until it uses a molecule

const Player = ({ detail, loading, failed, ...props }) => {
    return (
        <div {...props}>
            {!detail.id && loading && <p>Loading</p>}
            {failed && <p>Failed to load clip, sorry!</p>}
            <p>Here's your darn clip: {detail.id}</p>
        </div>
    )
};

Player.propTypes = {
    detail: PropTypes.object.isRequired,
    loading: PropTypes.bool,
    failed: PropTypes.bool
};

export default Player;
