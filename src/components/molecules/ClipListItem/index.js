import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { palette } from 'styled-theme';
import { ifProp } from 'styled-tools';
import formatRelative from 'date-fns/formatRelative';
import formatDistance from 'date-fns/formatDistance';
import { Tooltip, Icon, Link, IconButton } from 'components';

const relDate = date => formatRelative(date, new Date()).toLowerCase();
const distDate = date => formatDistance(date, new Date(), { addSuffix: true }).replace('about ', '');

const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  ${ifProp('justify', css`justify-content: space-between;`)}
`;

const ListItem = styled.li`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: 100%;
  cursor: pointer;
  padding: ${ifProp('selected', '0.9rem 0.8rem 1.2rem', '0.5rem 0.8rem')};
  &:hover, &:focus, &:active {
    background: ${palette('grayscale', 10)};
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
  color: ${palette('grayscale', 0)};
  position: relative;
  top: -0.1rem;
  font-size: 1.5rem;
`;

const ClipDescription = styled.div`
  color: ${palette('grayscale', 4)};
`;

const ClipTime = styled.div`
  color: ${palette('grayscale', 5)};
  font-size: 0.95rem;
`;

const ClipListItem = ({ clip, hovered, selected, ...props }) => {
    const { id, title, description, recordDate, uploadDate } = clip;
    const clipTime = <ClipTime><Link to={`/play/${id}`} palette='grayscale' light>
        {selected ? relDate(uploadDate) : distDate(uploadDate)}
    </Link></ClipTime>;
    return (
        <ListItem selected={selected} {...props}>
            {selected && <FlexRow justify>
                <ClipTitle>{title}</ClipTitle>
                {clipTime}
            </FlexRow>}
            <FlexRow>
                <PlayButton icon='play' go circle outline />
                <div>
                    {!selected && <ClipTitle>{title}</ClipTitle>}
                    {selected && description && <ClipDescription>{description}</ClipDescription>}
                    {!selected && clipTime}
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
    selected: PropTypes.bool
};

export default ClipListItem;
