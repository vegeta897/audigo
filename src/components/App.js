import React from 'react';
import Studio from '../containers/Studio';
import { Grid, Header, Icon } from 'semantic-ui-react';

const App = () => (
    <div>
        <style>{`
          body > div,
          body > div > div {
            height: 100%;
          }
        `}</style>
        <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
                <Header as='h1' icon>
                    <Icon name='microphone' color='orange' />
                    Audigo
                </Header>
                <Studio/>
            </Grid.Column>
        </Grid>
    </div>
);

export default App;