import React from 'react';
import { shallow } from 'enzyme';
import AudioInput from '.';

const wrap = (props = {}) => shallow(<AudioInput id='recorder' getInput={() => {}} {...props} />);

it('renders props when passed in', () => {
    const wrapper = wrap({ id: 'foo' });
    expect(wrapper.find({ id: 'foo' })).toHaveLength(1);
});
