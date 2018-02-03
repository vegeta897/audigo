// https://github.com/diegohaz/arc/wiki/Testing-components
import React from 'react';
import { shallow } from 'enzyme';
import PlayPage from '.';

it('renders', () => {
    shallow(<PlayPage/>);
});
