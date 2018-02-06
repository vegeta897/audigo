import React from 'react';
import { shallow } from 'enzyme';
import { Link } from 'react-router-dom';
import ClipListItem from '.';

const wrap = (props = {}) => shallow(<ClipListItem id={1} title='Test Title 1' {...props} />);

it('renders props when passed in', () => {
    const wrapper = wrap({ foo: 'foo' });
    expect(wrapper.find({ foo: 'foo' })).toHaveLength(1);
});

it('renders title', () => {
    const wrapper = wrap({ title: 'Title' });
    expect(wrapper.contains('Title')).toBe(true);
});

it('contains link', () => {
    const wrapper = wrap();
    expect(wrapper.find(Link)).toHaveLength(1);
});

it('renders link to play route', () => {
    const wrapper = wrap({ id: 1 });
    expect(wrapper.find({ to: '/play/1' })).toHaveLength(1);
});
