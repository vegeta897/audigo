import React from 'react';
import PropTypes from 'prop-types';
import { parse } from 'query-string';
import { ClipList } from 'containers';

const ClipsPage = ({ location, ...props }) => {
    const query = parse(location.search);
    const limit = parseInt(query.limit) || 20;
    return (
        <ClipList limit={limit} {...props} />
    );
};

ClipsPage.propTypes = {
    location: PropTypes.object.isRequired
};

export default ClipsPage;
