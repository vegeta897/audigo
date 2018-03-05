import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { palette } from 'styled-theme';
import { ifProp } from 'styled-tools';
import format from 'date-fns/format';
import isSameDay from 'date-fns/isSameDay';
import isSameYear from 'date-fns/isSameYear';
import formatDistance from 'date-fns/formatDistance';
import { msToHMS } from 'my-util';
import { Tooltip, Icon, Link, IconButton, ProgressBar } from 'components';

const timestamp = date => {
    let f = 'h:mm a';
    if(!isSameDay(date, new Date())) f += ' - D MMM';
    if(!isSameYear(date, new Date())) f+= ' YYYY';
    return format(date, f);
};
const distDate = date => formatDistance(date, new Date(), { addSuffix: true }).replace(/(about )/, '');

// TODO: Use display: grid?

const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  ${ifProp('justify', css`justify-content: space-between;`)}
`;

const ListItem = styled.li`
  z-index: 0; // Creates stacking context
  position: relative;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: 100%;
  cursor: ${ifProp('selected', 'default', 'pointer')};
  padding: ${ifProp('selected', '0.9rem 0.8rem 1.2rem', '0.5rem 0.8rem')};
  border-bottom: 1px solid ${palette('grayscale', 9)};
  &:hover, &:focus, &:active {
    ${ifProp('selected', '', css`background: ${palette('grayscale', 11)};`)};
    transition: background 100ms ease-out;
  }
  transition: background 200ms ease-in;
  & ${FlexRow}:first-child {
    ${ifProp('selected', css`
      margin-bottom: 0.6rem;
    `)
  }
`;

// https://github.com/diegohaz/arc/issues/131#issuecomment-283296269
const PlayButton = styled(props => <IconButton {...props} />)`
  margin-right: 1rem;
`;

const ClipTitle = styled.div`
  position: relative;
  top: -0.1rem;
  font-size: 1.5rem;
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

const ClipListItem = ({ clip, hovered, selected, progress = {}, playPause, playing, ...props }) => {
    const { id, title, description, uploadDate, duration } = clip;
    const { position, duration: realDuration } = progress;
    const clipDur = realDuration || duration;
    const header = <FlexRow style={{ marginBottom: selected ? '0.8rem' : 0 }}>
        <ClipTitle><Link to={`/play/${id}`} palette='grayscale'>{title}</Link></ClipTitle>
        <ClipTime right><Link to={`/play/${id}`} palette='grayscale' light>
            {selected ? timestamp(uploadDate) : distDate(uploadDate)}
        </Link></ClipTime>
        </FlexRow>;
    return (
        <ListItem selected={selected} {...props}>
            <ProgressBar {...{ percent: position / clipDur, inactive: !selected, instant: !playing, hovered }} />
            {selected && header}
            <FlexRow>
                <PlayButton icon={playing ? 'pause' : 'play'} go circle outline onClick={playPause} />
                <div style={{ width: '100%' }}>
                    {!selected && header}
                    {selected && description && <ClipDescription>{description}</ClipDescription>}
                    <ClipTime spaced>{(playing || position > 0) && msToHMS(position) + ' / '}{msToHMS(clipDur)}</ClipTime>
                </div>
            </FlexRow>
        </ListItem>
    );
};

ClipListItem.propTypes = {
    clip: PropTypes.shape({
        id: PropTypes.string.isRequired
    }).isRequired,
    hovered: PropTypes.bool,
    selected: PropTypes.bool,
    progress: PropTypes.object
};

export default ClipListItem;
