import React from 'react';
import { Helmet } from 'react-helmet';
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
        <div>
            <Helmet>
                <title>{match.params.id}</title>
                <meta property='og:description' content={match.params.id} data-react-helmet='true' />
            </Helmet>
            <Player id={match.params.id} />
        </div>
    );
};

export default PlayPage;
