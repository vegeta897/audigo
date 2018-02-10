import React from 'react';
import { shallow } from 'enzyme';
import Player from '.';

const wrap = (props = {}) => shallow(<Player {...props} />);

it('renders props when passed in', () => {
    const wrapper = wrap({ id: 'foo' });
    expect(wrapper.find({ id: 'foo' })).toHaveLength(1);
});

it('renders loading when passed in', () => {
    const wrapper = wrap({ loading: true, detail: null });
    expect(wrapper.contains('Loading...')).toBe(true);
});

it('renders failed when passed in', () => {
    const wrapper = wrap({ failed: true, detail: null });
    expect(wrapper.find('p').text()).toEqual(expect.stringContaining('Fail'));
});

it('renders title when passed in', () => {
    const wrapper = wrap({ detail: { title: 'Title' } });
    expect(wrapper.find('h2').contains('Title')).toBe(true);
});

it('renders audio when detail passed in', () => {
    const wrapper = wrap({ detail: { title: 'Title', url: 'http://' } });
    expect(wrapper.find('Audio')).toHaveLength(1);
});
