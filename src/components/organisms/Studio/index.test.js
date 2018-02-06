import React from 'react';
import { shallow } from 'enzyme';
import Studio from '.';

const wrap = (props = {}) => shallow(<Studio {...props} />);

it('renders props when passed in', () => {
    const wrapper = wrap({ id: 'foo' });
    expect(wrapper.find({ id: 'foo' })).toHaveLength(1);
});

it('renders start button when not started', () => {
    const wrapper = wrap({ started: false });
    expect(wrapper.find('button').contains('Start')).toBe(true);
});

it('renders stop button when started', () => {
    const wrapper = wrap({ started: true });
    expect(wrapper.find('button').contains('Stop')).toBe(true);
});
