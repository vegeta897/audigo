import React from 'react';
import { parse } from 'query-string';
import { ClipList } from 'containers';

const ClipsPage = ({ location }) => {
    const query = parse(location.search);
    const limit = query.limit || 20;
    return (
        <div>
            <ClipList limit={limit} />
        </div>
    );
};

export default ClipsPage;
