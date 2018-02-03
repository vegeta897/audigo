// https://github.com/diegohaz/arc/wiki/Atomic-Design
import React from 'react';
import { Helmet } from 'react-helmet';

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
                <title>{ `${match.params.id} - Audigo` }</title>
                <meta property='og:description' content={match.params.id} data-react-helmet='true' />
            </Helmet>
            <p>
                You're playing {match.params.id}!
            </p>
        </div>
    );
};

export default PlayPage;
