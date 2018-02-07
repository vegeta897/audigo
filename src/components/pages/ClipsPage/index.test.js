import React from 'react';
import { shallow } from 'enzyme';
import ClipsPage from '.';

const wrap = (props = {}) => shallow(<ClipsPage location={{ }} {...props} />);

it('renders props when passed in', () => {
    const wrapper = wrap({ id: 'foo' });
    expect(wrapper.find({ id: 'foo' })).toHaveLength(1);
});

it('renders limit when passed in', () => {
    const wrapper = wrap({ location: { search: '?limit=1' } });
    expect(wrapper.find({ limit: 1 })).toHaveLength(1);
});

it('renders default limit when not passed in', () => {
    const wrapper = wrap();
    expect(wrapper.find({ limit: 20 })).toHaveLength(1);
});
