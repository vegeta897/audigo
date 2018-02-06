import React from 'react';
import { shallow } from 'enzyme';
import PlayPage from '.';

const wrap = (props = {}) => shallow(<PlayPage match={{ params: {} }} {...props} />);

it('renders children when passed in', () => {
    const wrapper = wrap({ children: 'test' });
    expect(wrapper.contains('test')).toBe(true);
});

it('renders props when passed in', () => {
    const wrapper = wrap({ foo: 'foo' });
    expect(wrapper.find({ foo: 'foo' })).toHaveLength(1);
});

it('renders id when passed in', () => {
    const wrapper = wrap({ match: { params: { id: 1 }} });
    expect(wrapper.find({ id: 1 })).toHaveLength(1);
});
