import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ClipListItem = ({ id, title, ...props }) => {
    return (
        <li {...props}>
            <Link to={`/play/${id}`} title={`Play "${title}"`}>{title}</Link>
        </li>
    );
};

ClipListItem.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired
};

export default ClipListItem;
