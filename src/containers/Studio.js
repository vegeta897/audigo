import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { hasFailed, isDone } from 'redux-saga-thunk';
import { fromStudio } from 'store/selectors';
import { recorderStartRequest, recorderStopRequest, recorderGetInput, studioClear, resourceUploadRequest } from 'store/actions';

import { Studio } from 'components';

class StudioContainer extends Component {
    static propTypes = {
        info: PropTypes.object,
        clip: PropTypes.object,
        startFailed: PropTypes.bool,
        stopFailed: PropTypes.bool,
        getInput: PropTypes.func.isRequired,
        startRecording: PropTypes.func.isRequired,
        stopRecording: PropTypes.func.isRequired,
        upload: PropTypes.func.isRequired,
        clear: PropTypes.func.isRequired
    };
    render() {
        let { ...props } = this.props;
        return <Studio {...props} />
    }
}

const mapStateToProps = state => ({
    info: fromStudio.getInfo(state, 'main'),
    clip: fromStudio.getClip(state, 'main'),
    startFailed: hasFailed(state, 'mainRecorderStart'),
    stopFailed: hasFailed(state, 'mainRecorderStop')
});

const mapDispatchToProps = (dispatch) => ({
    startRecording: () => dispatch(recorderStartRequest('main')),
    stopRecording: () => dispatch(recorderStopRequest('main')),
    getInput: input => dispatch(recorderGetInput('main', input)),
    upload: data => dispatch(resourceUploadRequest('clips', data)),
    clear: () => dispatch(studioClear('main'))
});

export default connect(mapStateToProps, mapDispatchToProps)(StudioContainer);
