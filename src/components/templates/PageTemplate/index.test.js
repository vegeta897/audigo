import React from 'react';
import { mount, shallow } from 'enzyme';
import PageTemplate from '.';

const wrap = (props = {}) => (
    shallow(<PageTemplate {...props}>test</PageTemplate>)
);

it('mounts', () => {
    mount(<PageTemplate header="header" footer="footer">test</PageTemplate>);
});

it('renders children when passed in', () => {
    const wrapper = wrap();
    expect(wrapper.contains('test')).toBe(true);
});
