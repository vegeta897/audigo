import React from 'react';
import PropTypes from 'prop-types';
import { Player } from 'containers';
import ClipsPage from '../ClipsPage';

const PlayPage = ({match/*, location, history, staticContext*/, ...props}) => {
    /*  Params: {
            match: {
                path: '/play/:id',
                url: '/play/1',
                isExact: true,
                params: { id: '1' }
            },
            location: { pathname: '/play/1', search: '', hash: '' },
            history: {
                location: { pathname: '/play/1', search: '', hash: '' },
                createHref, push, replace, go, goBack, goForward, listen, block
            },
            staticContext: {}
    */
    return (
        <Player id={match.params.id} {...props} />
    );
};

ClipsPage.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.object.isRequired
    })
};

export default PlayPage;
