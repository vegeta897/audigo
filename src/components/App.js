import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Studio from '../containers/Studio';
import Play from '../containers/Play';
import { Grid, Header, Icon } from 'semantic-ui-react';

const App = () => (
    <Router basename={process.env.BASENAME}><div>
        <style>{`
          body > div,
          body > div > div {
            height: 100%;
          }
        `}</style>
        <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 480, margin: '0 12px' }}>
                <Header as='h1' icon>
                    <Icon name='microphone' color='orange' />
                    Audigo
                </Header>
                <Route exact path='/' component={Studio}/>
                <Route path={'/play/:id'} component={Play}/>
            </Grid.Column>
        </Grid>
    </div></Router>
);

export default App;