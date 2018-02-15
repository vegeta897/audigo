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
`;

const HRule = styled.hr`
  background: ${palette('grayscale', 9)};
  height: 1px;
  margin: -1px 0 0 0;
  border: none;
`;

const ClipList = ({ list, loading, failed, hover, ...props }) => {
    return (
        <div {...props}>
            <h2>Clips!</h2>
            {!list.length && loading && <p>Loading</p>}
            {failed && <p>Failed to load clip list, sorry!</p>}
            <OrderedList>
                {list.map(clip => ([
                    <ClipListItem key={clip.id} { ...clip} onMouseEnter={() => hover.do(clip.id)}
                                  onMouseLeave={() => hover.do()} hovered={clip.id === hover.id} />,
                    <HRule key={clip.id + 'hr'} />
                ]))}
            </OrderedList>
        </div>
    )
};

ClipList.propTypes = {
    list: PropTypes.array.isRequired,
    loading: PropTypes.bool,
    failed: PropTypes.bool,
    hover: PropTypes.object.isRequired
};

export default ClipList;
