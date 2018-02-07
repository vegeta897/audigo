import React from 'react';
import { Studio }from 'containers';
import { PageTemplate } from 'components';

const HomePage = ({ ...props }) => {
    return (
        <PageTemplate {...props}>
            <Studio />
        </PageTemplate>
    );
};

export default HomePage;
