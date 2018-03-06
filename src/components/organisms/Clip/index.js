import React, { Component } from 'react';
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

const PlayBar = styled.div`
  background: ${palette('go', 5)};
  height: 100px;
  width: 100%;
`;

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

class Clip extends Component { // Yeah, I'm using a component below a container, wanna fight about it?
    constructor(props) {
        super(props);
        this.state = { time: Date.now() }
    }
    getRef = el => {
        if(!el) return;
        const { left, top, width, height } = el.getBoundingClientRect();
        this.playBar = {
            offset: {
                x: left, y: top
            },
            width,
            height
        }
        //this.playBarOffset = { x: y: }
    };
    playBarClick = e => {
        // May need to reference this.offset.x in the future, when PlayBar contains some offset child elements
        const { playBar: { width }, props: { player, seek, detail: { id } } } = this;
        seek(id, player[id].duration * Math.max(0, Math.min(1, e.nativeEvent.offsetX / width)));
    };

    componentDidMount() {
        // this.interval = setInterval(() => this.setState({ time: Date.now() }), 250);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        const { detail = {}, player, solo, loading, failed, playPause } = this.props;
        const { id, title, description, recordDate, uploadDate, duration } = detail;
        const { position, duration: realDuration } = player;
        const clipDur = realDuration || duration;
        const playing = !player.paused && player.playing && player.id === id;
        const positionNow = position + (playing ? Date.now() - player.timestamp : 0);
        return (
            <div>
                <PlayBar innerRef={this.getRef} onClick={this.playBarClick}>
                    <div style={{height: '100px', background: 'red', width: 100*positionNow/clipDur+'%'}}></div>
                    {/*<ProgressBar {...{ percent: positionNow / clipDur, paused: !playing, timeLeft: clipDur - positionNow }} />*/}
                </PlayBar>
                {solo && <Helmet titleTemplate='%s - Audigo'>
                    <title>{title}</title>
                    <meta property='og:title' content={title} />
                </Helmet>}
                <FlexRow>
                    <ClipTitle>{title}</ClipTitle>
                    <ClipTime right>{timestamp(uploadDate)}</ClipTime>
                </FlexRow>
                <FlexRow>
                    <PlayButton icon={playing ? 'pause' : 'play'} disabled={loading}
                                go circle outline onClick={playPause} />
                    <div style={{ width: '100%' }}>
                        {description && <ClipDescription>{description}</ClipDescription>}
                        <ClipTime spaced>{clipDur ? msToHMS(positionNow) + ' / ' + msToHMS(clipDur) : 'loading...'}</ClipTime>
                    </div>
                </FlexRow>
            </div>
        )
    }
}

export default Clip;
