import React from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { palette } from 'styled-theme';
import { ifProp } from 'styled-tools';
import format from 'date-fns/format';
import isSameDay from 'date-fns/isSameDay';
import isSameYear from 'date-fns/isSameYear';
import { IconButton, ProgressBar } from 'components';
import { msToHMS } from 'my-util';

const timestamp = date => {
    let f = 'h:mm a';
    if(!isSameDay(date, new Date())) f += ' - D MMM';
    if(!isSameYear(date, new Date())) f+= ' YYYY';
    return format(date, f);
};

const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  ${ifProp('justify', css`justify-content: space-between;`)}
`;

const PlayButton = styled(props => <IconButton {...props} />)`
  margin-right: 1rem;
`;

const ClipTitle = styled.div`
  font-size: 1.5rem;
  margin-bottom: 0.2rem;
  flex-grow: 1;
`;

const ClipDescription = styled.div`
  color: ${palette('grayscale', 4)};
  margin-bottom: 0.2rem;
  position: relative;
  top: -2px;
`;

const ClipTime = styled.div`
  color: ${palette('grayscale', 6)};
  font-size: 0.95rem;
  flex-shrink: 1;
  ${ifProp('spaced', css`letter-spacing: 0.05rem;`)}
  ${ifProp('right', css`text-align: right;`)}
`;

const Player = ({ detail = {}, loading, failed, player, playPause, ...props }) => {
    const { id, title, description, recordDate, uploadDate, duration } = detail;
    const { position, duration: realDuration } = player[id] || {};
    const clipDur = realDuration || duration;
    const playing = player.playStatus === 'PLAYING';
    return (
        <div {...props}>
            {!id && loading && <p>Loading...</p>}
            {failed && <p>Failed to load clip, sorry!</p>}
            {id &&
                <div style={{position: 'relative', zIndex: 0, background: 'gray'}}>
                    <Helmet titleTemplate='%s - Audigo'>
                        <title>{title}</title>
                        <meta property='og:title' content={title} />
                    </Helmet>
                    {clipDur - position > 0 && <ProgressBar {...{ percent: position / clipDur, paused: !playing, timeLeft: clipDur - position }} />}
                    <FlexRow>
                        <ClipTitle>{title}</ClipTitle>
                        <ClipTime right>{timestamp(uploadDate)}</ClipTime>
                    </FlexRow>
                    <FlexRow>
                        <PlayButton icon={playing ? 'pause' : 'play'} disabled={loading}
                                    go circle outline onClick={playPause} />
                        <div style={{ width: '100%' }}>
                            {description && <ClipDescription>{description}</ClipDescription>}
                            <ClipTime spaced>{clipDur ? msToHMS(position) + ' / ' + msToHMS(clipDur) : 'loading...'}</ClipTime>
                        </div>
                    </FlexRow>
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
