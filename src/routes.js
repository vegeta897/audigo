import App from './components/App';
import Studio from './containers/Studio';
import Play from './containers/Play';

const routes = [
    { component: App,
        routes: [
            { path: '/',
                exact: true,
                component: Studio
            },
            { path: '/play/:id',
                component: Play
            }
        ]
    }
];

export default routes;