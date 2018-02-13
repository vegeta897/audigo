import React from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import { Audio } from 'components';

const Player = ({ detail, loading, failed, ...props }) => {
    return (
        <div {...props}>
            {!detail && loading && <p>Loading...</p>}
            {failed && <p>Failed to load clip, sorry!</p>}
            {detail &&
                <div>
                    <Helmet titleTemplate='%s - Audigo'>
                        <title>{detail.title}</title>
                        <meta property='og:title' content={detail.title} />
                    </Helmet>
                    <h2>{detail.title}</h2>
                    {loading || <Audio src={detail.url} autoPlay />}
                </div>
            }
        </div>
    );
};

Player.propTypes = {
    detail: PropTypes.object,
    loading: PropTypes.bool,
    failed: PropTypes.bool
};

export default Player;
