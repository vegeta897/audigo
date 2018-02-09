import React from 'react';
import { Studio }from 'containers';
import { PageTemplate } from 'components';
import { Link } from 'react-router-dom';

const HomePage = ({ ...props }) => {
    return (
        <PageTemplate {...props}>
            <Studio />
            <div>
                <Link to={`/clips`}>view clips</Link>
            </div>
        </PageTemplate>
    );
};

export default HomePage;
