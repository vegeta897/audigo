import React from 'react';
import PropTypes from 'prop-types';
import { parse } from 'query-string';
import { ClipList } from 'containers';
import { PageTemplate } from 'components';
import { Link } from 'react-router-dom';

const ClipsPage = ({ match, location, ...props }) => {
    const query = parse(location.search);
    const limit = parseInt(query.limit) || 20;
    const view = location.pathname.split('/')[1];
    return (
        <PageTemplate {...props}>
            <ClipList {...{ view, limit, id: match.params.id }} />
            <div><Link to={`/`}>record your own</Link></div>
            {match.params.id && <div><Link to={`/clips`}>view more clips</Link></div>}
        </PageTemplate>
    );
};

ClipsPage.propTypes = {
    location: PropTypes.object.isRequired
};

export default ClipsPage;
