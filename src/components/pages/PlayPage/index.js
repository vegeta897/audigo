import React from 'react';
import { Player } from 'containers';

const PlayPage = ({match/*, location, history, staticContext*/}) => {
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
        <Player id={match.params.id} />
    );
};

export default PlayPage;
