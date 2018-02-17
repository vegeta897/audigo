import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { palette } from 'styled-theme';
import { ClipListItem } from 'components';

const OrderedList = styled.ol`
  list-style: none;
  margin: 0;
  padding: 0;
  border: 1px solid ${palette('grayscale', 9)};
  border-bottom: none;
`;

const ClipList = ({ list, loading, failed, ui, playClip, player, ...props }) => {
    const clipList = list.map(clip => (
        <ClipListItem key={clip.id} clip={clip}
                      progress={player[clip.id] && player[clip.id].progress}
                      onClick={() => ui.select = clip.id} selected={clip.id === ui.select}
                      onMouseEnter={() => ui.hover = clip.id} hovered={clip.id === ui.hover}
                      playClip={() => playClip(clip.id)} />
    ));
    return (
        <div {...props}>
            <h2>Clips!</h2>
            {!list.length && loading && <p>Loading</p>}
            {failed && <p>Failed to load clip list, sorry!</p>}
            <OrderedList onMouseLeave={() => ui.hover = null}>{clipList}</OrderedList>
        </div>
    )
};

ClipList.propTypes = {
    list: PropTypes.array.isRequired,
    loading: PropTypes.bool,
    failed: PropTypes.bool,
    ui: PropTypes.object.isRequired
};

export default ClipList;
