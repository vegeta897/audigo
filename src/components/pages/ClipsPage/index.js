import React from 'react';
import { ClipList } from 'containers';

const ClipsPage = () => {
    return (
        <div>
            <ClipList limit={20} />
        </div>
    );
};

export default ClipsPage;
