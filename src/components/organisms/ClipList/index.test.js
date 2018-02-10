import React from 'react';
import { shallow } from 'enzyme';
import ClipList from '.';
import { ClipListItem } from 'components';

const list = [
    { id: 1, title: 'title 1' },
    { id: 2, title: 'title 2' },
    { id: 3, title: 'title 3' }
];

const wrap = (props = {}) => shallow(<ClipList list={list} {...props} />);

it('renders props when passed in', () => {
    const wrapper = wrap({ id: 'foo' });
    expect(wrapper.find({ id: 'foo' })).toHaveLength(1);
});

it('renders loading when passed in', () => {
    const wrapper = wrap({ loading: true, list: [] });
    expect(wrapper.contains('Loading')).toBe(true);
});

it('renders failed when passed in', () => {
    const wrapper = wrap({ failed: true, list: [] });
    expect(wrapper.find('p').text()).toEqual(expect.stringContaining('Fail'));
});

it('renders list', () => {
    const wrapper = wrap();
    expect(wrapper.find('ul')).toHaveLength(1);
});

it('renders clip list items', () => {
    const wrapper = wrap();
    expect(wrapper.find('ClipListItem')).toHaveLength(list.length);
});
