import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { palette } from 'styled-theme';
import formatRelative from 'date-fns/formatRelative';
import formatDistance from 'date-fns/formatDistance';
import { Tooltip, Icon, Link/*, IconButton*/ } from 'components'; // For some reason IconButton is undefined this way
import IconButton from 'components/molecules/IconButton';

const relDate = date => formatRelative(date, new Date());
const distDate = date => formatDistance(date, new Date(), { addSuffix: true }).replace('about ', '');

const ListItem = styled.li`
  display: flex;
  align-items: center;
  flex-direction: row;
  box-sizing: border-box;
  width: 100%;
  cursor: pointer;
  padding: 0.5rem 0.8rem;
  &:hover, &:focus, &:active {
    background: ${palette('grayscale', 10)};
    transition: background 100ms ease-out;
  }
  transition: background 200ms ease-in;
`;

const PlayButton = styled(IconButton)`
  margin-right: 1rem;
`;

const ClipTitle = styled.div`
  color: ${palette('grayscale', 0)};
  margin-bottom: 0.2rem;
  font-size: 1.5rem;
  // &:hover, &:focus &:active {
  //   text-decoration: underline ${palette('grayscale', 7)};
  // }
`;

const ClipTime = styled.div`
  color: ${palette('grayscale', 5)};
`;

const ClipListItem = ({ id, title, description, recordDate, uploadDate, hovered, ...props }) => {
    return (
            <ListItem {...props}>
                <PlayButton icon='play' go circle outline />
                <div>
                    <ClipTitle>{title}</ClipTitle>
                    <ClipTime><Link to={`/play/${id}`} palette='grayscale' light>{distDate(uploadDate)}</Link></ClipTime>
                </div>
            </ListItem>
    );
};

ClipListItem.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    recordDate: PropTypes.string,
    uploadDate: PropTypes.string,
    hovered: PropTypes.bool
};

export default ClipListItem;
