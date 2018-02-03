import React from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';

const Player = ({ detail, loading, failed, ...props }) => {
    return (
        <div {...props}>
            {!detail && loading && <p>Loading...</p>/* This should never render on the browser */}
            {failed && <p>Failed to load clip, sorry!</p>}
            {detail &&
                <div>
                    <Helmet>
                        <title>{detail.title}</title>
                        <meta property='og:description' content={detail.title} data-react-helmet='true' />
                    </Helmet>
                    <h2>{detail.title}</h2>
                    <audio src={detail.url} controls controlsList='nodownload' autoPlay />
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
