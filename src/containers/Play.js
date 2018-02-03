// Playing clips
import React from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { Segment, Button, Header } from 'semantic-ui-react';
import { viewActions, uploadStatus } from '../actions';
import { bindActionCreators } from 'redux';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { get } from '../api';

class Play extends React.Component {
    static fetchData(id) {
        return get(id);
    }
    componentWillMount() {
        if(process.env.BROWSER) return;
        console.log('component will mount!');
        this.props.getAudio(this.props.match.params.id);
        this.props.uploadStatus('none');
    }
    render() {
        const { play } = this.props;
        return (<Segment id='player'>
            <Helmet>
                <title>{ `${play.audio.title} - Audigo` }</title>
                <meta property='og:description' content={ play.audio.title }/>
                /* TODO: Implement server-side rendering for these tags to work */
                /* https://redux.js.org/docs/recipes/ServerRendering.html */
            </Helmet>
            <Header as='h2'>{ play.audio.title }</Header>
            <audio src={ play.audio.url } controls controlsList='nodownload' autoPlay
                   style={{ display: 'block', width: '100%', marginBottom: '1em' }}/>
            <CopyToClipboard text={ process.env.BROWSER ? location.href : '' }>
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

export default connect(mapStateToProps, dispatch => bindActionCreators({...viewActions, uploadStatus}, dispatch))(Play);