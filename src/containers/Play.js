// Playing clips
import React from 'react';
import { connect } from 'react-redux';
import { Segment, Button } from 'semantic-ui-react';
import { viewActions } from '../actions';
import { bindActionCreators } from 'redux';
import { CopyToClipboard } from 'react-copy-to-clipboard';

class Play extends React.Component {
    componentWillMount() {
        this.props.getAudio(this.props.match.params.id);
    }
    render() {
        const { play } = this.props;
        return (<Segment id='player'>
            <audio src={ play.audio.url } controls controlsList='nodownload' autoPlay
                   style={{ display: 'block', width: '100%', marginBottom: '1em' }} />
            <CopyToClipboard text={ location.href }>
                <Button icon='copy' size='huge'/>
            </CopyToClipboard>
            <Button as='a' icon='download' size='huge'
                    download={ play.audio.file_name } href={ play.audio.url }/>
        </Segment>);
    }
}

function mapStateToProps(state, props) {
    return {
        play: state.play
    }
}

export default connect(mapStateToProps, dispatch => bindActionCreators({...viewActions}, dispatch))(Play);