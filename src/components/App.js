import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { injectGlobal, ThemeProvider } from 'styled-components';
import Helmet from 'react-helmet';

import { HomePage, PlayPage, ClipsPage } from 'components';

// https://github.com/diegohaz/arc/wiki/Styling
import theme from './themes/default';

injectGlobal`
  body {
    margin: 0;
  }
`;

const App = () => {
    return (
        <div>
            <Helmet titleTemplate='%s - Audigo'>
                <title>Atomic React</title>
                <meta name='description' content='record + upload + share'/>
                <meta name='viewport' content='width=device-width, initial-scale=1.0'/>
                <meta property='og:site_name' content='Audigo'/>
                <meta property='og:title' content='Audigo'/>
                <meta property='og:description' content='record + upload + share' data-react-helmet='true'/>
                <meta property='og:image' content='https://arc.js.org/thumbnail.png'/>
                <meta property='og:image:type' content='image/png'/>
                <meta property='og:image:width' content='1200'/>
                <meta property='og:image:height' content='630'/>
                <link rel='icon' href='https://arc.js.org/icon.png'/>
            </Helmet>
            <ThemeProvider theme={theme}>
                <Switch>
                    <Route path='/' component={HomePage} exact/>
                    <Route path='/clips' component={ClipsPage} exact/>
                    <Route path='/play/:id' component={PlayPage} exact/>
                </Switch>
            </ThemeProvider>
        </div>
    );
};

export default App;
