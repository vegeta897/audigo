import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Clip = ({ id, title }) => {
    return (
        <li>
            <Link to={`/play/${id}`} title={`Play "${title}"`}>
                {title}
            </Link>
        </li>
    );
};

const ClipList = ({ list, loading, failed, ...props }) => {
    return (
        <div {...props}>
            <h1>Clips!</h1>
            {!list.length && loading && <p>Loading</p>}
            {failed && <p>Failed to load clip list, sorry!</p>}
            <ul>
                {list.map(clip => <Clip key={clip.id} {...clip} />)}
            </ul>
        </div>
    )
};

ClipList.propTypes = {
    list: PropTypes.array.isRequired,
    loading: PropTypes.bool,
    failed: PropTypes.bool
};

export default ClipList;
