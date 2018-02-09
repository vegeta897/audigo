import React from 'react';
import PropTypes from 'prop-types';
import { Player } from 'containers';
import { PageTemplate } from 'components';
import { Link } from 'react-router-dom';

const PlayPage = ({match/*, location, history*/, ...props}) => {
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
            }
    */
    return (
        <PageTemplate {...props}>
            <Player id={match.params.id} />
            <div>
                <Link to={`/clips`}>view more clips</Link>
            </div>
            <div>
                <Link to={`/`}>record your own</Link>
            </div>
        </PageTemplate>
    );
};

PlayPage.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.object.isRequired
    })
};

export default PlayPage;
