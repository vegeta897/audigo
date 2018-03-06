import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fromEntities, fromPlayer } from 'store/selectors';

class PlayerContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return false;
    }
}

const mapStateToProps = state => ({
    clip: fromEntities.getDetail(state, 'clips', fromPlayer.getId(state)),
    player: fromPlayer.getState(state)
});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(PlayerContainer);
