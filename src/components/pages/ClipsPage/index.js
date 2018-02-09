import React from 'react';
import PropTypes from 'prop-types';
import { parse } from 'query-string';
import { ClipList } from 'containers';
import { PageTemplate } from 'components';
import { Link } from 'react-router-dom';

const ClipsPage = ({ location, ...props }) => {
    const query = parse(location.search);
    const limit = parseInt(query.limit) || 20;
    return (
        <PageTemplate {...props}>
            <ClipList limit={limit} />
            <div>
                <Link to={`/`}>record your own</Link>
            </div>
        </PageTemplate>
    );
};

ClipsPage.propTypes = {
    location: PropTypes.object.isRequired
};

export default ClipsPage;
