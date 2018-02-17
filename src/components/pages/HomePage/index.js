import React from 'react';
import { Studio }from 'containers';
import { PageTemplate } from 'components';
import { Link } from 'react-router-dom';

const HomePage = ({ history, ...props }) => {
    const footer = <div><Link to={`/clips`}>🔊 view clips</Link></div>;
    return (
        <PageTemplate {...props} footer={footer}>
            <Studio history={history} />
        </PageTemplate>
    );
};

export default HomePage;
