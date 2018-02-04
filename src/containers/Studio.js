import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { hasFailed, isDone } from 'redux-saga-thunk';
import { fromStudio } from 'store/selectors';
import { recorderStartRequest, recorderStopRequest } from 'store/actions';

import { Studio } from 'components';

class StudioContainer extends Component {
    static propTypes = {
        info: PropTypes.object,
        recording: PropTypes.object,
        startFailed: PropTypes.bool,
        stopFailed: PropTypes.bool,
        started: PropTypes.bool,
        stopped: PropTypes.bool,
        startRecording: PropTypes.func.isRequired,
        stopRecording: PropTypes.func.isRequired
    };
    render() {
        return <Studio {...this.props} />
    }
}

const mapStateToProps = state => ({
    info: fromStudio.getInfo(state, 'main'),
    recording: fromStudio.getRecording(state, 'main'),
    startFailed: hasFailed(state, 'mainRecorderStart'),
    stopFailed: hasFailed(state, 'mainRecorderStop'),
    started: isDone(state, 'mainRecorderStart'),
    stopped: isDone(state, 'mainRecorderStop')
});

const mapDispatchToProps = (dispatch) => ({
    startRecording: () => dispatch(recorderStartRequest('main')),
    stopRecording: () => dispatch(recorderStopRequest('main'))
});

export default connect(mapStateToProps, mapDispatchToProps)(StudioContainer);
