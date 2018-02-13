import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ClipListItem = ({ id, title, description, ...props }) => {
    return (
        <li {...props}>
            <Link to={`/play/${id}`} title={description}>{title}</Link>
        </li>
    );
};

ClipListItem.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
};

export default ClipListItem;
