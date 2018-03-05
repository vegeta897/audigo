import React from 'react';
import PropTypes from 'prop-types';
import { parse } from 'query-string';
import { Clips } from 'containers';
import { PageTemplate } from 'components';
import { Link } from 'react-router-dom';
import audio from 'services/audio';

function pl(e) {
    console.log('click');
    audio.play();
}

const ClipsPage = ({ match, location, ...props }) => {
    const query = parse(location.search);
    const limit = parseInt(query.limit) || 20;
    const view = location.pathname.split('/')[1];
    const footer = [
        match.params.id && <div key='2'><Link to={`/clips`}>🔊 view more clips</Link></div>,
        <div key='1'><Link to={`/`}>🎤 record a clip</Link></div>
    ];
    return (
        <PageTemplate {...props} footer={footer}>
            <Clips {...{ view, limit, id: match.params.id }} />
            <button onClick={pl}>playyy sm2</button>
            <div id='soundmanager-debug'></div>
        </PageTemplate>
    );
};

ClipsPage.propTypes = {
    location: PropTypes.object.isRequired
};

export default ClipsPage;
