import React from 'react';
import { renderRoutes } from 'react-router-config';
import { Grid, Header, Icon } from 'semantic-ui-react';

const App = (props) => (
    <div>
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
                {renderRoutes(props.route.routes)}
            </Grid.Column>
        </Grid>
    </div>
);

export default App;