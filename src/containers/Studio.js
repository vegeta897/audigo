import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { hasFailed, isDone } from 'redux-saga-thunk';
import { fromStudio, fromResource } from 'store/selectors';
import { recorderStartRequest, recorderStopRequest, recorderGetInput, studioClear, resourceUploadRequest } from 'store/actions';

import { Studio } from 'components';

class StudioContainer extends Component {
    static propTypes = {
        info: PropTypes.object,
        clip: PropTypes.object,
        getInput: PropTypes.func.isRequired,
        startRecording: PropTypes.func.isRequired,
        stopRecording: PropTypes.func.isRequired,
        upload: PropTypes.func.isRequired,
        clear: PropTypes.func.isRequired,
        history: PropTypes.object.isRequired
    };
    handleSubmit = data => {
        this.props.upload({
            ...this.props.clip,
            ...data
        }, { history: this.props.history });
    };
    componentWillUnmount() {
        this.props.clear();
    }
    componentWillReceiveProps(nextProps) {
        let { info: { status }, clip } = nextProps;
        if(status === 'uploaded') this.props.history.push(`/play/${clip.id}`);
    };
    render() {
        let { upload, ...props } = this.props;
        return <Studio {...props} handleSubmit={this.handleSubmit} />
    }
}

const mapStateToProps = state => ({
    info: fromStudio.getInfo(state),
    clip: fromStudio.getClip(state)
});

const mapDispatchToProps = (dispatch) => ({
    startRecording: () => dispatch(recorderStartRequest()),
    stopRecording: () => dispatch(recorderStopRequest()),
    getInput: input => dispatch(recorderGetInput(input)),
    upload: (data, meta) => dispatch(resourceUploadRequest('clips', data, meta)),
    clear: () => dispatch(studioClear())
});

export default connect(mapStateToProps, mapDispatchToProps)(StudioContainer);
